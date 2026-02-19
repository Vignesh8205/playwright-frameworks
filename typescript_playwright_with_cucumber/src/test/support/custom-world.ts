import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium, firefox, webkit } from '@playwright/test';

export interface ICustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  init(browserType?: 'chromium' | 'firefox' | 'webkit', headless?: boolean): Promise<void>;
  cleanup(): Promise<void>;
}

export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init(browserType: 'chromium' | 'firefox' | 'webkit' = 'chromium', headless: boolean = true) {
    // Launch browser
    switch (browserType) {
      case 'chromium':
        this.browser = await chromium.launch({ headless });
        break;
      case 'firefox':
        this.browser = await firefox.launch({ headless });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless });
        break;
      default:
        this.browser = await chromium.launch({ headless });
    }

    // Create context with useful settings
    this.context = await this.browser.newContext({
      viewport: null,
      recordVideo: process.env.VIDEO === 'true' ? { dir: './test-results/videos' } : undefined,
    });

    // Create page
    this.page = await this.context.newPage();
  }

  async cleanup() {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);
