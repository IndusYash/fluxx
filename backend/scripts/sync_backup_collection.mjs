import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log("Connecting to MongoDB cluster...");
await mongoose.connect(process.env.MONGO_URI);

const targetDb = mongoose.connection.client.db('test');
const primaryCol = targetDb.collection('bytebrawl_registrations');
const backupCol = targetDb.collection('bytebrawl_registrations_backup');

// Ensure unique index on registrationId in backup collection
await backupCol.createIndex({ registrationId: 1 }, { unique: true });

const primaryDocs = await primaryCol.find({}).toArray();
console.log(`Found ${primaryDocs.length} documents in primary collection (bytebrawl_registrations).`);

let syncedCount = 0;
let updatedCount = 0;

for (const doc of primaryDocs) {
  const result = await backupCol.updateOne(
    { registrationId: doc.registrationId },
    { $set: doc },
    { upsert: true }
  );

  if (result.upsertedCount > 0) {
    syncedCount++;
  } else if (result.matchedCount > 0) {
    updatedCount++;
  }
}

const primaryTotal = await primaryCol.countDocuments();
const backupTotal = await backupCol.countDocuments();

console.log("\n================ BACKUP COLLECTION SYNC ================");
console.log(`Newly inserted to backup: ${syncedCount}`);
console.log(`Already existed / updated:  ${updatedCount}`);
console.log(`Total in primary:          ${primaryTotal}`);
console.log(`Total in backup:           ${backupTotal}`);
console.log("========================================================");

await mongoose.disconnect();

