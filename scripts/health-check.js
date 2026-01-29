const fs = require('fs');
const path = require('path');

console.log('\n=== HEALTH CHECK ===\n');

const appFile = path.join(__dirname, '../src/app.js');
const currentVersionFile = path.join(__dirname, '../versions/current-version.txt');

try {
  // Read current version
  const currentVersion = fs.readFileSync(currentVersionFile, 'utf8').trim();
  
  console.log(`Current Version: ${currentVersion}`);
  console.log(`Timestamp: ${new Date().toISOString()}`);
  
  // Check if app file exists
  if (!fs.existsSync(appFile)) {
    console.error('\n✗ HEALTH CHECK FAILED: App file not found');
    process.exit(1);
  }
  
  // Try to detect if version is faulty
  const appContent = fs.readFileSync(appFile, 'utf8');
  const isFaulty = appContent.includes('FAULTY') || appContent.includes('BUG:');
  
  if (isFaulty) {
    console.log('\n✗ HEALTH CHECK FAILED');
    console.log('Status: UNHEALTHY - Faulty version detected');
    console.log('Issue: This version contains known bugs');
    console.log('\nAction Required: ROLLBACK RECOMMENDED');
    process.exit(1);
  } else {
    console.log('\n✓ HEALTH CHECK PASSED');
    console.log('Status: HEALTHY');
    console.log('All systems operational\n');
    process.exit(0);
  }
  
} catch (error) {
  console.error('✗ Health check error:', error.message);
  process.exit(1);
}
