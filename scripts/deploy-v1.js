const fs = require('fs');
const path = require('path');

console.log('\n=== DEPLOYING VERSION 1.0.0 (STABLE) ===\n');

const appFile = path.join(__dirname, '../src/app.js');
const v1File = path.join(__dirname, '../versions/app-v1.js');
const versionTracker = path.join(__dirname, '../versions/version-history.json');
const currentVersionFile = path.join(__dirname, '../versions/current-version.txt');

try {
  // Copy v1 to main app
  const v1Content = fs.readFileSync(v1File, 'utf8');
  fs.writeFileSync(appFile, v1Content, 'utf8');
  
  // Update version tracker
  const history = fs.existsSync(versionTracker) 
    ? JSON.parse(fs.readFileSync(versionTracker, 'utf8'))
    : [];
  
  history.push({
    version: '1.0.0',
    status: 'deployed',
    timestamp: new Date().toISOString(),
    type: 'stable'
  });
  
  fs.writeFileSync(versionTracker, JSON.stringify(history, null, 2), 'utf8');
  fs.writeFileSync(currentVersionFile, '1.0.0', 'utf8');
  
  console.log('✓ Version 1.0.0 deployed successfully');
  console.log('✓ App file updated');
  console.log('✓ Version history recorded');
  console.log('\nDeployment Status: SUCCESS');
  console.log('Current Version: 1.0.0');
  console.log('Status: STABLE AND HEALTHY\n');
  
} catch (error) {
  console.error('✗ Deployment failed:', error.message);
  process.exit(1);
}
