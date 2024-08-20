module.exports = {
    collectCoverage: true, 
    collectCoverageFrom: [
        "**/*.js", 
        "!node_modules/**",
        "!coverage/**",
    ],
    coverageDirectory: "coverage", 
    coverageReporters: ["json", "html", "text"], 
  };
  