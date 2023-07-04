import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
})

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Remix Notes/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await expect(page).toHaveURL(/.*login/);
});
