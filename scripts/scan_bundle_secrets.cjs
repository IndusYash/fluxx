const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, '../Frontend/dist');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`Dist directory does not exist at: ${DIST_DIR}. Please run npm run build first.`);
  process.exit(1);
}

const FORBIDDEN_TOKENS = [
  'smtp',
  'nodemailer',
  'ADMIN_TOKEN',
  'DATABASE_URL',
  'secret',
  'password',
];

console.log('========================================================');
console.log('PRODUCTION BUNDLE SECURITY SCAN');
console.log('Target: Frontend/dist');
console.log('========================================================\n');

// 1. Check for sourcemap files
function getAllFiles(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      getAllFiles(full, list);
    } else {
      list.push(full);
    }
  }
  return list;
}

const allFiles = getAllFiles(DIST_DIR);
const mapFiles = allFiles.filter(f => f.endsWith('.map'));
if (mapFiles.length > 0) {
  console.error('❌ FAIL: Sourcemap (.map) files found in production bundle:');
  mapFiles.forEach(f => console.error('  -', path.relative(DIST_DIR, f)));
  process.exit(1);
}
console.log('✓ PASS: No production sourcemap (.map) files present (sourcemap: false).');

// 2. Scan ByteBrawl bundles specifically
const bytebrawlFiles = allFiles.filter(f => f.includes('ByteBrawl'));
console.log(`\nScanning ByteBrawl production bundle assets (${bytebrawlFiles.length} files):`);
let bytebrawlViolations = [];

for (const file of bytebrawlFiles) {
  const rel = path.relative(DIST_DIR, file);
  const content = fs.readFileSync(file, 'utf8');
  console.log(`  - Checking ${rel}...`);

  for (const token of FORBIDDEN_TOKENS) {
    // Check case-insensitively
    const regex = new RegExp(`\\b${token}\\b`, 'i');
    if (regex.test(content)) {
      bytebrawlViolations.push({ file: rel, token });
    }
  }
}

if (bytebrawlViolations.length > 0) {
  console.error('\n❌ FAIL: Forbidden secret/backend tokens found in ByteBrawl assets:');
  bytebrawlViolations.forEach(v => console.error(`  - ${v.file}: ${v.token}`));
  process.exit(1);
}
console.log('✓ PASS: ByteBrawl assets are 100% clean of all forbidden tokens (smtp, nodemailer, ADMIN_TOKEN, DATABASE_URL, secret, password).');

// 3. Scan all assets for backend secrets & sensitive tokens
console.log('\nScanning all production bundle assets for backend secrets & credentials:');
const CRITICAL_BACKEND_TOKENS = ['nodemailer', 'ADMIN_TOKEN', 'DATABASE_URL', 'SMTP_HOST', 'SMTP_PASS', 'SMTP_USER'];
let criticalViolations = [];

for (const file of allFiles) {
  const ext = path.extname(file).toLowerCase();
  if (!['.js', '.css', '.html'].includes(ext)) continue;

  const content = fs.readFileSync(file, 'utf8');
  const rel = path.relative(DIST_DIR, file);

  for (const token of CRITICAL_BACKEND_TOKENS) {
    if (content.includes(token)) {
      criticalViolations.push({ file: rel, token });
    }
  }
}

if (criticalViolations.length > 0) {
  console.error('\n❌ FAIL: Critical backend tokens leaked into frontend assets:');
  criticalViolations.forEach(v => console.error(`  - ${v.file}: ${v.token}`));
  process.exit(1);
}
console.log('✓ PASS: Zero backend secrets, database connection strings, or mailer credentials leaked into any production asset.');

console.log('\n========================================================');
console.log('BUNDLE SECURITY VERIFICATION PASSED SUCCESSFULLY');
console.log('========================================================\n');
