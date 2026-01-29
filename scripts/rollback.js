const fs = require('fs');
const path = require('path');

console.log('\n=== ROLLBACK PROCEDURE INITIATED ===\n');

const appFile = path.join(__dirname, '../src/app.js');
const v1File = path.join(__dirname, '../versions/app-v1.js');
const versionTracker = path.join(__dirname, '../versions/version-history.json');
const currentVersionFile = path.join(__dirname, '../versions/current-version.txt');

try {
  console.log('Step 1: Reading current version...');
  const currentVersion = fs.readFileSync(currentVersionFile, 'utf8').trim();
  console.log(`  Current: ${currentVersion}`);
  
  console.log('\nStep 2: Restoring stable version (1.0.0)...');
  const v1Content = fs.readFileSync(v1File, 'utf8');
  fs.writeFileSync(appFile, v1Content, 'utf8');
  console.log('  ✓ Version 1.0.0 restored');
  
  console.log('\nStep 3: Updating version tracker...');
  const history = fs.existsSync(versionTracker) 
    ? JSON.parse(fs.readFileSync(versionTracker, 'utf8'))
    : [];
  
  history.push({
    version: '1.0.0',
    status: 'rolled_back',
    timestamp: new Date().toISOString(),
    type: 'stable',
    rollback_from: currentVersion
  });
  
  fs.writeFileSync(versionTracker, JSON.stringify(history, null, 2), 'utf8');
  fs.writeFileSync(currentVersionFile, '1.0.0', 'utf8');
  console.log('  ✓ History recorded');
  
  console.log('\nStep 4: Verifying rollback...');
  const newVersion = fs.readFileSync(currentVersionFile, 'utf8').trim();
  const verifyContent = fs.readFileSync(appFile, 'utf8');
  const isHealthy = !verifyContent.includes('BUG:') && !verifyContent.includes('FAULTY');
  
  if (isHealthy && newVersion === '1.0.0') {
    console.log('  ✓ Rollback verified');
  } else {
    throw new Error('Rollback verification failed');
  }
  
  console.log('\n=== ROLLBACK SUCCESSFUL ===');
  console.log(`Rolled back from: ${currentVersion}`);
  console.log(`Current version: ${newVersion}`);
  console.log('Status: STABLE AND OPERATIONAL\n');
  
} catch (error) {
  console.error('\n✗ ROLLBACK FAILED:', error.message);
  process.exit(1);
}
