import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveScreenshot();
})

test('has title', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveTitle(/Remix Notes/);
});

test('get started link', async ({ page }) => {
  await page.goto('/login');
  const link = page.getByRole('link', { name: 'Log in' })
  expect(link).toBeEnabled()
});
