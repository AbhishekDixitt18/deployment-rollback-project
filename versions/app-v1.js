const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Version 1 - Stable and working
const versionFile = path.join(__dirname, 'current-version.txt');

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  try {
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API endpoint
app.get('/api/status', (req, res) => {
  try {
    res.status(200).json({
      message: 'API is operational',
      version: '1.0.0',
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
    res.status(200).json({
      requests_processed: 0,
      uptime_seconds: process.uptime(),
      memory_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      version: '1.0.0'
    });
  } catch (error) {
    res.status(500).json({ error: 'Metrics unavailable' });
  }
});

app.listen(PORT, () => {
  fs.writeFileSync(versionFile, '1.0.0', 'utf8');
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] Version 1.0.0 - STABLE`);
});

module.exports = app;
