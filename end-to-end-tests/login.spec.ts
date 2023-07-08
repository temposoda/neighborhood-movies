import { test, expect } from '@playwright/test';

test('screenshot', async ({ page }) => {
  await page.goto('/login');
  await expect(page).toHaveScreenshot();
})

test('log in as test user', async ({ page }) => {
  await page.goto('/login');
  const submit = page.getByRole('button', { name: 'Log in' })
  await page.getByTestId('email').fill(String(process.env.USERNAME))
  await page.getByTestId('password').fill(String(process.env.PASSWORD))
  await expect(page).toHaveScreenshot();

  await submit.click()
  await expect(page).toHaveURL(/.*notes/);
});
