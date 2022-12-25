const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    SHORT_URL: process.env.SHORT_URL,
    ADMIN: process.env.ADMIN,
    PASSWORD: process.env.PASSWORD,
  },
};

module.exports = nextConfig;
