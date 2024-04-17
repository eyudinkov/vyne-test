const fs = require("fs");
const dotenv = require("dotenv");
const envs = dotenv.parse(fs.readFileSync(".env"));

for (const i in envs) {
  process.env[i] = envs[i];
}

const PROXY_CONFIG = [
  {
    context: ["/swagger-ui", "/api"],
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
    target: process.env.URL || "http://127.0.0.1:8080/",
  },
];

module.exports = PROXY_CONFIG;
