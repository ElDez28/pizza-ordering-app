const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    SHORT_URL: process.env.SHORT_URL,
  },
};

module.exports = nextConfig;
