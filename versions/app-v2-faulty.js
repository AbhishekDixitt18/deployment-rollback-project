const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Version 2 - FAULTY VERSION with bug
const versionFile = path.join(__dirname, 'current-version.txt');

app.use(express.json());

// BUGGY Health check endpoint - missing error handling
app.get('/health', (req, res) => {
  // BUG: Intentionally reading undefined variable
  const buggyData = undefined.toString();
  
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    uptime: process.uptime()
  });
});

// API endpoint
app.get('/api/status', (req, res) => {
  // BUG: Throwing error intentionally
  throw new Error('Database connection failed');
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  try {
    res.status(200).json({
      requests_processed: 0,
      uptime_seconds: process.uptime(),
      memory_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      version: '2.0.0'
    });
  } catch (error) {
    res.status(500).json({ error: 'Metrics unavailable' });
  }
});

app.listen(PORT, () => {
  fs.writeFileSync(versionFile, '2.0.0-FAULTY', 'utf8');
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] Version 2.0.0 - FAULTY DEPLOYMENT`);
});

module.exports = app;
