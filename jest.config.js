module.exports = {
    collectCoverage: true, 
    collectCoverageFrom: [
        "**/*.js", 
        "!node_modules/**",
        "!coverage/**",
        "!jest.config.js", 
        "!index.js", 
        "!ComfyChairApp.js", 
    ],
    coverageDirectory: "coverage", 
    coverageReporters: ["json", "html", "text"], 
  };
  