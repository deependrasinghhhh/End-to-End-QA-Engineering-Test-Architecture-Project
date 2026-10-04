import { test, expect } from '../../fixtures/test.fixture';

test.describe('Catalog & Search Regression Suite', () => {

  test('CAT-REG-01: Top navigation menu category and subcategory links @regression', async ({ homePage, page }) => {
    await homePage.open();
    const computersLink = page.locator('.top-menu a[href="/computers"]');
    await expect(computersLink).toBeVisible();
    await computersLink.hover();
    
    const desktopsLink = page.locator('.top-menu a[href="/desktops"]');
    await expect(desktopsLink).toBeVisible();
  });

  test('CAT-REG-02: Category products sorting by Price: Low to High @regression', async ({ categoryPage }) => {
    await categoryPage.openDesktops();
    await categoryPage.sortBy('10');
    
    const prices = await categoryPage.getProductPrices();
    expect(prices.length).toBeGreaterThanOrEqual(2);
    // Verify prices are ascending
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  test('CAT-REG-03: Category products sorting by Name: A to Z @regression', async ({ categoryPage }) => {
    await categoryPage.openDesktops();
    await categoryPage.sortBy('5');
    
    const titles = await categoryPage.getProductTitles();
    expect(titles.length).toBeGreaterThanOrEqual(2);
    const sorted = [...titles].sort((a, b) => a.localeCompare(b));
    expect(titles).toEqual(sorted);
  });

  test('CAT-REG-04: Search auto-suggest dropdown functionality @regression', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.header.typeSearch('comp');
    
    const autoItem = page.locator('#search-autocomplete-list .item').first();
    await expect(autoItem).toBeVisible({ timeout: 5000 });
    const text = await autoItem.innerText();
    expect(text.toLowerCase()).toContain('computer');
  });

  test('CAT-REG-05: Non-existent search query returns graceful empty state @regression', async ({ homePage, page }) => {
    await homePage.open();
    await homePage.header.searchFor('nonexistentxyz999');
    
    const noResultMsg = page.locator('.no-result');
    await expect(noResultMsg).toBeVisible();
    await expect(noResultMsg).toHaveText('No products were found that matched your criteria.');
  });

});
