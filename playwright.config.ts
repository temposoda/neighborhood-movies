import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * Only load in ENV variables when we are not running in CI.
 * The relevant variables are stored in Github Environments
 * during the CI process.
 */
if (!process.env.CI) dotenv.config({ path: './.env' })

/**
 * In some environments we know the exposed port information, so we append that to the hostname,
 * but in other environments the hostname is all we know because the name server hides the
 * port info using DNS. in that case we drop the port from the URL
 */
const BASE_URL = `${process.env.FRONTEND_PROTOCOL}${process.env.FRONTEND_HOST_NAME}${process.env.FRONTEND_PORT ? `:${process.env.FRONTEND_PORT}` : ''}`

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  updateSnapshots: 'all',
  testDir: './end-to-end-tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  /* Run your local dev server before starting the tests */
  ...(!process.env.CI ? {
    webServer: [{
      command: 'npm run build && npm run start',
      url: BASE_URL,
      reuseExistingServer: true,
    }, {
      command: 'npm run docker',
      url: BASE_URL,
      reuseExistingServer: true,
    }]
  } : {}),
});
