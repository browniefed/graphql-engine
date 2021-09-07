/** @type {import('next').NextConfig} */
const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname)],
    prependData: `@import "@/css/vars.scss";`,
  },
  async redirects() {
    return [
      {
        source: "/api/api-explorer",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
