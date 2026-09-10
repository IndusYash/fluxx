const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(morgan('dev'));

const Application = require('./models/application');
const applicationRouter = require('./routes/applications');

app.use('/api/applications', applicationRouter);

// Basic root route and health-checks
// Accept any method on root so hosting platform HEAD/GET probes succeed.
app.all('/', (req, res) => {
  res.json({ status: 'ok', message: 'FLUX Dbms backend is running' });
});

// Dedicated health endpoint for platform health checks
app.get('/healthz', (req, res) => {
  // Optionally add DB connectivity status here
  const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ status: 'ok', db: dbState, uptime: process.uptime() });
});

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flux_db';

// Start listening immediately so platform health checks pass even if Mongo isn't ready yet.
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  // Attempt to connect to MongoDB (log errors but don't exit; infra can retry/restart)
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err);
    });
});
