import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'node:fs';
dotenv.config();

console.log("Connecting to MongoDB cluster...");
await mongoose.connect(process.env.MONGO_URI);

const localDb = mongoose.connection.client.db('local');
const targetDb = mongoose.connection.client.db('test');
const oplog = localDb.collection('oplog.rs');
const targetCollection = targetDb.collection('bytebrawl_registrations');

// Fetch all insert operations from oplog for bytebrawl_registrations
const entries = await oplog.find({
  ns: /^test\.bytebrawl_registrations/,
  op: "i"
}).toArray();

console.log(`Found ${entries.length} insert operations in oplog.`);

const dummyRegistrationIds = new Set(["BBH26-9VS4G3", "BBH26-YRTSMU"]);
const uniqueDocs = new Map();

for (const entry of entries) {
  const doc = entry.o;
  if (!doc || !doc.registrationId) continue;
  
  // Skip synthetic dummy unit test entries
  if (dummyRegistrationIds.has(doc.registrationId)) {
    console.log(`Skipping dummy test registration: ${doc.registrationId} (${doc.teamName})`);
    continue;
  }

  // Convert _id to ObjectId if string
  if (typeof doc._id === 'string') {
    doc._id = new mongoose.Types.ObjectId(doc._id);
  }
  if (doc.createdAt) doc.createdAt = new Date(doc.createdAt);
  if (doc.updatedAt) doc.updatedAt = new Date(doc.updatedAt);
  if (Array.isArray(doc.participants)) {
    doc.participants.forEach(p => {
      if (typeof p._id === 'string') {
        p._id = new mongoose.Types.ObjectId(p._id);
      }
      if (p.createdAt) p.createdAt = new Date(p.createdAt);
      if (p.updatedAt) p.updatedAt = new Date(p.updatedAt);
    });
  }

  uniqueDocs.set(doc.registrationId, doc);
}

console.log(`Total real unique registrations to restore: ${uniqueDocs.size}`);

// Save JSON backup to disk first
const backupDir = './backups';
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}
const backupPath = `${backupDir}/bytebrawl_registrations_recovered.json`;
fs.writeFileSync(backupPath, JSON.stringify(Array.from(uniqueDocs.values()), null, 2));
console.log(`Saved offline backup of ${uniqueDocs.size} documents to ${backupPath}`);

// Restore into MongoDB test.bytebrawl_registrations
let restoredCount = 0;
let alreadyExistingCount = 0;

for (const [regId, doc] of uniqueDocs.entries()) {
  const existing = await targetCollection.findOne({ registrationId: regId });
  if (existing) {
    alreadyExistingCount++;
  } else {
    await targetCollection.insertOne(doc);
    restoredCount++;
    console.log(`Restored: [${doc.registrationId}] ${doc.teamName || doc.participants[0]?.fullName} (${doc.participants.map(p => p.fullName).join(", ")})`);
  }
}

// Clean up dummy test records if they exist
await targetCollection.deleteMany({ registrationId: { $in: Array.from(dummyRegistrationIds) } });

const totalInDb = await targetCollection.countDocuments();
console.log("\n================ RESTORATION SUMMARY ================");
console.log(`Successfully restored: ${restoredCount} registrations`);
console.log(`Already in database:   ${alreadyExistingCount}`);
console.log(`Total active in DB:    ${totalInDb}`);
console.log("=====================================================");

await mongoose.disconnect();

