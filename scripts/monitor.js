const fs = require('fs');
const path = require('path');

console.log('\n=== MONITORING SYSTEM ===\n');

const currentVersionFile = path.join(__dirname, '../versions/current-version.txt');
const versionTracker = path.join(__dirname, '../versions/version-history.json');

try {
  // Read current version
  const currentVersion = fs.readFileSync(currentVersionFile, 'utf8').trim();
  
  // Read deployment history
  const history = fs.existsSync(versionTracker) 
    ? JSON.parse(fs.readFileSync(versionTracker, 'utf8'))
    : [];
  
  console.log('Current Status:');
  console.log(`  Version: ${currentVersion}`);
  console.log(`  Timestamp: ${new Date().toISOString()}`);
  
  console.log('\nDeployment History:');
  history.slice(-5).reverse().forEach((record, idx) => {
    console.log(`  ${idx + 1}. v${record.version} - ${record.status.toUpperCase()} at ${new Date(record.timestamp).toLocaleString()}`);
    if (record.rollback_from) {
      console.log(`     (Rolled back from ${record.rollback_from})`);
    }
  });
  
  if (history.length === 0) {
    console.log('  (No deployment history yet)');
  }
  
  console.log('\n');
  
} catch (error) {
  console.error('✗ Monitor error:', error.message);
  process.exit(1);
}
