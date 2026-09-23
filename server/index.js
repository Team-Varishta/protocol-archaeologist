const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const AnalysisService = require('./analysis/AnalysisService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from client build (will be set up later)
app.use(express.static(path.join(__dirname, '../client/build')));

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Legacy system analysis endpoints
app.get('/api/legacy-system/files', (req, res) => {
  // Return list of files in legacy system for analysis
  const legacyPath = path.join(__dirname, '../demo/legacy-system');
  const fileList = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const relPath = path.relative(legacyPath, fullPath);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else {
        fileList.push({
          path: relPath,
          fullPath: fullPath,
          size: stat.size,
          modified: stat.mtime,
          extension: path.extname(file).toLowerCase()
        });
      }
    });
  }

  walkDir(legacyPath);
  res.json({ files: fileList });
});

// Analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { repoPath } = req.body;

    if (!repoPath) {
      return res.status(400).json({ error: 'Repository path is required' });
    }

    const analysisService = new AnalysisService();
    const results = await analysisService.analyzeRepository(repoPath || path.join(__dirname, '../demo/legacy-system'));

    res.json(results);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});