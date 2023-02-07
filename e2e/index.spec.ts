import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Test the entire page flow", () => {
  const newsCardInformationElement = "newsCardInformation";

  test("The news are being loaded", async ({ page }) => {
    await expect(page).toHaveURL(page.url());
    await expect(page.getByTestId(newsCardInformationElement).count()).not.toBe(
      0
    );
  });
});
