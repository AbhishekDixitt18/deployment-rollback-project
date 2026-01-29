const fs = require('fs');
const path = require('path');

console.log('\n=== DEPLOYING VERSION 2.0.0 (FAULTY) ===\n');

const appFile = path.join(__dirname, '../src/app.js');
const v2File = path.join(__dirname, '../versions/app-v2-faulty.js');
const versionTracker = path.join(__dirname, '../versions/version-history.json');
const currentVersionFile = path.join(__dirname, '../versions/current-version.txt');

try {
  // Copy v2 (faulty) to main app
  const v2Content = fs.readFileSync(v2File, 'utf8');
  fs.writeFileSync(appFile, v2Content, 'utf8');
  
  // Update version tracker
  const history = fs.existsSync(versionTracker) 
    ? JSON.parse(fs.readFileSync(versionTracker, 'utf8'))
    : [];
  
  history.push({
    version: '2.0.0',
    status: 'deployed',
    timestamp: new Date().toISOString(),
    type: 'faulty'
  });
  
  fs.writeFileSync(versionTracker, JSON.stringify(history, null, 2), 'utf8');
  fs.writeFileSync(currentVersionFile, '2.0.0-FAULTY', 'utf8');
  
  console.log('✓ Version 2.0.0 deployed');
  console.log('✓ App file updated');
  console.log('✓ Version history recorded');
  console.log('\nDeployment Status: COMPLETE');
  console.log('Current Version: 2.0.0');
  console.log('WARNING: This version contains intentional bugs for testing!\n');
  
} catch (error) {
  console.error('✗ Deployment failed:', error.message);
  process.exit(1);
}
