const subjectAsciiOnly = require("./commitlint-rules/subject-ascii-only");

module.exports = {
  extends: ["@commitlint/config-conventional"],
  plugins: [subjectAsciiOnly],
  rules: {
    "subject-ascii-only": [2, "always"],
    "header-max-length": [2, "always", 100],
  },
};
