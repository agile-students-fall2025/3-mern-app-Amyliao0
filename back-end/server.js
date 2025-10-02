#!/usr/bin/env node

require('dotenv').config({ silent: true });
const app = require('./app');

const port = process.env.PORT || 7002;

const listener = app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});

const close = () => listener.close();
module.exports = { close };
