import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/custom-world';
import * as fs from 'fs';
import * as path from 'path';

// Set default timeout for all steps (can be overridden per step)
setDefaultTimeout(90000);

// Setup directories for artifacts
BeforeAll(async function () {
  const dirs = [
    './test-results/screenshots',
    './test-results/videos',
    './test-results/traces',
    './reports'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log('🚀 Cucumber BDD Test Suite Starting...\n');
});

// Before each scenario
Before(async function (this: ICustomWorld, { pickle }) {
  console.log(`\n📝 Scenario: ${pickle.name}`);
  console.log(`   Tags: ${pickle.tags.map(tag => tag.name).join(', ')}`);
  
  // Get browser type from environment variable or default to chromium
  const browserType = (process.env.BROWSER as 'chromium' | 'firefox' | 'webkit') || 'chromium';
  const headless = process.env.HEADLESS !== 'false';

  // Initialize browser, context, and page
  await this.init(browserType, headless);
});

// After each scenario
After(async function (this: ICustomWorld, { pickle, result }) {
  const scenarioName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = new Date().getTime();

  // Take screenshot on failure
  if (result?.status === Status.FAILED && this.page) {
    const screenshotPath = path.join(
      './test-results/screenshots',
      `${scenarioName}_${timestamp}.png`
    );
    
    const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
    
    // Attach screenshot to report
    await this.attach(screenshot, 'image/png');
    console.log(`   ❌ Scenario Failed - Screenshot saved: ${screenshotPath}`);
  }

  // Log scenario result
  if (result?.status === Status.PASSED) {
    console.log(`   ✅ Scenario Passed`);
  } else if (result?.status === Status.FAILED) {
    console.log(`   ❌ Scenario Failed: ${result.message}`);
  } else if (result?.status === Status.SKIPPED) {
    console.log(`   ⏭️  Scenario Skipped`);
  }

  // Cleanup browser resources
  await this.cleanup();
});

// After all scenarios
AfterAll(async function () {
  console.log('\n✨ Cucumber BDD Test Suite Completed!\n');
});
