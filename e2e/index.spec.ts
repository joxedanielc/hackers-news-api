import { test, expect, type Page } from "@playwright/test";
import { VariablesStored, CodeLanguageEnum } from "@/utils";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
});

test.describe("Test the entire page flow", () => {
  const newsCardInformationElement = '[data-testid="newsCardInformation"]';
  const favoriteButtonElement = "favoriteButton";
  const condeLanguageElement = "codeLanguageSelector";

  test("The news are being loaded", async ({ page }) => {
    await expect(page).toHaveURL(page.url());
    await page.waitForSelector(newsCardInformationElement);
    await expect(page.locator(newsCardInformationElement).count()).not.toBe(0);
  });

  test("Favorite 1 random new", async ({ page }) => {
    const countNewsCard = await page
      .locator(newsCardInformationElement)
      .count();
    await page
      .getByTestId(
        `${favoriteButtonElement}${randomNumberInRange(0, countNewsCard)}`
      )
      .click();

    await checkVariableInLocalStorage(VariablesStored.newsFavorited, page, 1);
  });

  test("Go to MyFaves view and check for 1 favorited new", async ({ page }) => {
    const countNewsCard = await page
      .locator(newsCardInformationElement)
      .count();
    await page
      .getByTestId(
        `${favoriteButtonElement}${randomNumberInRange(0, countNewsCard)}`
      )
      .click();
    await page.locator('[data-testid="myFavesNewsView"]').click();
    await page.waitForSelector(newsCardInformationElement);
    const myFavesCount = await page.locator(newsCardInformationElement).count();
    await expect(myFavesCount).toBe(1);
  });

  test("Change code language, render response and check for sessionStorage", async ({
    page,
  }) => {
    await page.getByTestId(condeLanguageElement).click();
    await page.getByTestId(CodeLanguageEnum.reactjs.toLowerCase()).click();

    await page.waitForSelector(newsCardInformationElement);

    const newsCount = await page.locator(newsCardInformationElement).count();

    await expect(newsCount).not.toBe(0);

    await checkValueVariableInLocalStorage(
      VariablesStored.codeLanguageSelected,
      page,
      CodeLanguageEnum.reactjs.toLowerCase()
    );
  });
});

async function checkVariableInLocalStorage(
  variable: string,
  page: Page,
  expected: number
) {
  return await page.waitForFunction(
    ({ expected: e, variable: v }) => {
      return JSON.parse(sessionStorage[`${v}`]).length === e;
    },
    { expected, variable }
  );
}

async function checkValueVariableInLocalStorage(
  variable: string,
  page: Page,
  expected: any
) {
  return await page.waitForFunction(
    ({ expected: e, variable: v }) => {
      return JSON.parse(sessionStorage[`${v}`]) === e;
    },
    { expected, variable }
  );
}

function randomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
