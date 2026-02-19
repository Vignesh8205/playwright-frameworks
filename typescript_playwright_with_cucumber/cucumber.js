module.exports = {
  default: {
    require: ['src/test/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json',
      'summary'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    paths: ['src/test/features/**/*.feature'],
    publishQuiet: true,
    dryRun: false,
    parallel: 1
  }
};
