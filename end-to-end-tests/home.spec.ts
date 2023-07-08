import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot();
})

test('log in link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Log In' }).click();
  await expect(page).toHaveURL(/.*login/);
});

test('sign up link', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page).toHaveURL(/.*join/);
});