const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Read version info
const versionFile = path.join(__dirname, '../versions/current-version.txt');

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  try {
    const currentVersion = fs.readFileSync(versionFile, 'utf8').trim();
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: currentVersion,
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: 'Version file not found',
      timestamp: new Date().toISOString()
    });
  }
});

// API endpoint
app.get('/api/status', (req, res) => {
  try {
    const currentVersion = fs.readFileSync(versionFile, 'utf8').trim();
    res.status(200).json({
      message: 'API is operational',
      version: currentVersion,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  try {
    const currentVersion = fs.readFileSync(versionFile, 'utf8').trim();
    res.status(200).json({
      requests_processed: 0,
      uptime_seconds: process.uptime(),
      memory_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      version: currentVersion
    });
  } catch (error) {
    res.status(500).json({ error: 'Metrics unavailable' });
  }
});

// Start server
app.listen(PORT, () => {
  const currentVersion = fs.readFileSync(versionFile, 'utf8').trim();
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] Current version: ${currentVersion}`);
});

module.exports = app;
