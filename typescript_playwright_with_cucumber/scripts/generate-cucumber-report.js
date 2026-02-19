const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Check if JSON report exists
const jsonReportPath = path.join(__dirname, '../reports/cucumber-report.json');

if (!fs.existsSync(jsonReportPath)) {
  console.error('❌ No cucumber report found. Please run tests first.');
  process.exit(1);
}

// Generate metadata
const metadata = {
  browser: {
    name: process.env.BROWSER || 'chromium',
    version: 'latest'
  },
  device: 'Local Machine',
  platform: {
    name: process.platform,
    version: process.version
  }
};

// Generate the report
report.generate({
  jsonDir: './reports',
  reportPath: './reports/cucumber-html-report',
  metadata: metadata,
  customData: {
    title: 'Droptaxie Test Automation Report',
    data: [
      { label: 'Project', value: 'Droptaxie Cab Booking' },
      { label: 'Framework', value: 'Playwright + Cucumber BDD' },
      { label: 'Environment', value: process.env.ENV || 'dev' },
      { label: 'Execution Date', value: new Date().toLocaleString() },
      { label: 'Browser', value: process.env.BROWSER || 'chromium' }
    ]
  },
  pageTitle: 'Droptaxie BDD Test Report',
  reportName: 'Cucumber BDD Automation Report',
  pageFooter: '<div><p>Powered by Playwright + Cucumber</p></div>',
  displayDuration: true,
  displayReportTime: true,
  durationInMS: true,
  openReportInBrowser: true
});

console.log('✅ Cucumber HTML report generated successfully!');
console.log('📊 Report location: ./reports/cucumber-html-report/index.html');
