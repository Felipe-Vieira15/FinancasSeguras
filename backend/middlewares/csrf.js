const { doubleCsrf } = require("csrf-csrf");

const { doubleCsrfProtection } = doubleCsrf({
  get tokens() { return require('./tokenStore').tokens; },
  cookieName: "__Host-csrf",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  errorStatusCode: 403,
});

module.exports = doubleCsrfProtection;