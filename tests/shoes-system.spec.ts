import { test, expect } from '@playwright/test';

/**
 * CRITICAL SAFETY SYSTEM TEST
 * This test verifies the covert communication system for Morgan.
 * Every single part must work perfectly - this is life and death.
 */

const SITE_URL = process.env.TEST_URL || 'http://localhost:8888';
const SHOES_URL = `${SITE_URL}/shoes`;

// Login credentials
const MORGAN_CREDS = { order: 'ORD-745620', zip: '80203' };
const ERICA_CREDS = { order: 'ORD-274913', zip: '80112' };

test.describe('Shoes Communication System - CRITICAL SAFETY TESTS', () => {

  test('1. Shoes page loads and looks legitimate', async ({ page }) => {
    await page.goto(SHOES_URL);

    // Page should load successfully
    await expect(page).toHaveTitle(/VIVIFIED.*Shoes/i);

    // Header should be present with brand
    const brand = page.locator('.brand');
    await expect(brand).toContainText('VIVIFIED');

    // Navigation should be present
    await expect(page.locator('nav a:has-text("New")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Sale")')).toBeVisible();

    // Hero section should be visible
    await expect(page.locator('h1')).toContainText('Fall sneaker drops');

    // Should have multiple shoe cards
    const cards = page.locator('.card');
    const cardCount = await cards.count();
    expect(cardCount).toBeGreaterThanOrEqual(6);

    console.log(`✓ Shoes page loaded with ${cardCount} products`);
  });

  test('2. Gordon 92 shoe is present and identifiable', async ({ page }) => {
    await page.goto(SHOES_URL);

    // Find the secret Gordon 92 shoe
    const gordonCard = page.locator('.card[data-sku="EG-92"]');
    await expect(gordonCard).toBeVisible();

    // Verify it has the correct title
    await expect(gordonCard.locator('h3')).toContainText("Gordon 92");

    // Verify it has the price
    await expect(gordonCard.locator('p')).toContainText('$199');

    // Verify it has a Shop Now button
    await expect(gordonCard.locator('button')).toBeVisible();

    console.log('✓ Gordon 92 shoe found and visible');
  });

  test('3. Clicking Gordon 92 redirects to returns page', async ({ page }) => {
    await page.goto(SHOES_URL);

    // Click the Gordon 92 shoe's button
    const gordonCard = page.locator('.card[data-sku="EG-92"]');
    await gordonCard.locator('button').click();

    // Should navigate to returns page
    await page.waitForURL(/\/shoes\/returns\.html/);

    // Verify we're on the returns page
    await expect(page.locator('h2')).toContainText('Track your return');

    // Should have Order # and ZIP inputs
    await expect(page.locator('#order')).toBeVisible();
    await expect(page.locator('#zip')).toBeVisible();
    await expect(page.locator('button#go')).toBeVisible();

    console.log('✓ Gordon 92 successfully redirects to returns page');
  });

  test('4. Other shoes do NOT redirect to returns page', async ({ page }) => {
    await page.goto(SHOES_URL);

    // Click a different shoe (not Gordon 92)
    const otherCard = page.locator('.card[data-sku="AJ1-CHICAGO"]');
    const currentUrl = page.url();

    await otherCard.locator('button').click();

    // Should stay on shoes page (just add anchor)
    await page.waitForTimeout(500);
    expect(page.url()).toContain('/shoes');
    expect(page.url()).not.toContain('returns');

    console.log('✓ Decoy shoes work correctly (no redirect)');
  });

  test('5. MORGAN LOGIN: Credentials work correctly', async ({ page }) => {
    await page.goto(`${SHOES_URL}/returns.html`);

    // Enter Morgan's credentials
    await page.fill('#order', MORGAN_CREDS.order);
    await page.fill('#zip', MORGAN_CREDS.zip);

    // Click continue
    await page.click('button#go');

    // Should redirect to portal
    await page.waitForURL(/\/shoes\/returns-portal\.html/, { timeout: 10000 });

    // Verify we're in the portal
    await expect(page.locator('h2')).toContainText('Return details');
    await expect(page.locator('#msgs')).toBeVisible();
    await expect(page.locator('#text')).toBeVisible();
    await expect(page.locator('button#send')).toBeVisible();

    console.log('✓ MORGAN LOGIN SUCCESSFUL');
  });

  test('6. ERICA LOGIN: Credentials work correctly', async ({ page }) => {
    await page.goto(`${SHOES_URL}/returns.html`);

    // Enter Erica's credentials
    await page.fill('#order', ERICA_CREDS.order);
    await page.fill('#zip', ERICA_CREDS.zip);

    // Click continue
    await page.click('button#go');

    // Should redirect to portal
    await page.waitForURL(/\/shoes\/returns-portal\.html/, { timeout: 10000 });

    // Verify we're in the portal
    await expect(page.locator('h2')).toContainText('Return details');
    await expect(page.locator('#msgs')).toBeVisible();

    console.log('✓ ERICA LOGIN SUCCESSFUL');
  });

  test('7. WRONG CREDENTIALS: Should fail gracefully', async ({ page }) => {
    await page.goto(`${SHOES_URL}/returns.html`);

    // Enter wrong credentials
    await page.fill('#order', 'WRONG-12345');
    await page.fill('#zip', '99999');

    // Click continue
    await page.click('button#go');

    // Should stay on login page with error message
    await page.waitForTimeout(2000);
    const url = page.url();
    expect(url).toContain('returns.html');
    expect(url).not.toContain('returns-portal');

    // Error message should appear
    const status = page.locator('#status');
    await expect(status).toContainText(/not found|unavailable/i);

    console.log('✓ Wrong credentials rejected correctly');
  });

  test('8. MESSAGE SENDING: Can send a message', async ({ page, context }) => {
    // Login as Morgan
    await page.goto(`${SHOES_URL}/returns.html`);
    await page.fill('#order', MORGAN_CREDS.order);
    await page.fill('#zip', MORGAN_CREDS.zip);
    await page.click('button#go');
    await page.waitForURL(/returns-portal\.html/);

    // Send a test message
    const testMessage = `Test message ${Date.now()}`;
    await page.fill('#text', testMessage);
    await page.click('button#send');

    // Wait for message to appear
    await page.waitForTimeout(2000);

    // Message should be in the chat
    const msgs = page.locator('#msgs');
    await expect(msgs).toContainText(testMessage);

    // Should be marked as "me" (sender's message)
    const myMessage = page.locator('.msg.me');
    await expect(myMessage).toContainText(testMessage);

    console.log('✓ Message sent successfully');
  });

  test('9. MESSAGE RECEIVING: Two users can communicate', async ({ browser }) => {
    // Create two separate browser contexts (Morgan and Erica)
    const morganContext = await browser.newContext();
    const ericaContext = await browser.newContext();

    const morganPage = await morganContext.newPage();
    const ericaPage = await ericaContext.newPage();

    try {
      // Morgan logs in
      await morganPage.goto(`${SHOES_URL}/returns.html`);
      await morganPage.fill('#order', MORGAN_CREDS.order);
      await morganPage.fill('#zip', MORGAN_CREDS.zip);
      await morganPage.click('button#go');
      await morganPage.waitForURL(/returns-portal\.html/);

      // Erica logs in
      await ericaPage.goto(`${SHOES_URL}/returns.html`);
      await ericaPage.fill('#order', ERICA_CREDS.order);
      await ericaPage.fill('#zip', ERICA_CREDS.zip);
      await ericaPage.click('button#go');
      await ericaPage.waitForURL(/returns-portal\.html/);

      // Morgan sends a message
      const morganMessage = `From Morgan: ${Date.now()}`;
      await morganPage.fill('#text', morganMessage);
      await morganPage.click('button#send');
      await morganPage.waitForTimeout(1000);

      // Wait for auto-refresh (20 seconds) or manually refresh
      await ericaPage.reload();
      await ericaPage.waitForTimeout(2000);

      // Erica should see Morgan's message (not marked as "me")
      const ericaMsgs = ericaPage.locator('#msgs');
      await expect(ericaMsgs).toContainText(morganMessage);

      // Should NOT be marked as "me" for Erica
      const notMyMessage = ericaPage.locator('.msg:not(.me)');
      await expect(notMyMessage.first()).toContainText(morganMessage);

      // Erica sends a reply
      const ericaMessage = `From Erica: ${Date.now()}`;
      await ericaPage.fill('#text', ericaMessage);
      await ericaPage.click('button#send');
      await ericaPage.waitForTimeout(1000);

      // Morgan refreshes and sees Erica's message
      await morganPage.reload();
      await morganPage.waitForTimeout(2000);

      const morganMsgs = morganPage.locator('#msgs');
      await expect(morganMsgs).toContainText(ericaMessage);

      console.log('✓ Two-way communication working');

    } finally {
      await morganContext.close();
      await ericaContext.close();
    }
  });

  test('10. QUICK EXIT: Emergency exit links work', async ({ page }) => {
    await page.goto(SHOES_URL);

    // Find the customer support link (quick exit)
    const quickExit = page.locator('a.quiet-exit');
    await expect(quickExit).toBeVisible();

    const href = await quickExit.getAttribute('href');
    expect(href).toContain('amazon.com');

    console.log('✓ Quick exit link present and points to Amazon');
  });

  test('11. COMPLETE USER FLOW: From shoes to messaging', async ({ page }) => {
    console.log('Starting complete user flow test...');

    // Step 1: Load shoes page
    await page.goto(SHOES_URL);
    console.log('  → Loaded shoes page');

    // Step 2: Click Gordon 92
    const gordonCard = page.locator('.card[data-sku="EG-92"]');
    await gordonCard.locator('button').click();
    console.log('  → Clicked Gordon 92');

    // Step 3: Login
    await page.waitForURL(/returns\.html/);
    await page.fill('#order', MORGAN_CREDS.order);
    await page.fill('#zip', MORGAN_CREDS.zip);
    await page.click('button#go');
    console.log('  → Entered credentials');

    // Step 4: Access portal
    await page.waitForURL(/returns-portal\.html/);
    await expect(page.locator('h2')).toContainText('Return details');
    console.log('  → Reached portal');

    // Step 5: Send message
    const message = `Complete flow test ${Date.now()}`;
    await page.fill('#text', message);
    await page.click('button#send');
    await page.waitForTimeout(2000);
    console.log('  → Sent message');

    // Step 6: Verify message appears
    await expect(page.locator('#msgs')).toContainText(message);
    console.log('  → Message confirmed');

    console.log('✓ COMPLETE USER FLOW SUCCESSFUL');
  });

  test('12. SECURITY: No noindex meta tag issues', async ({ page }) => {
    await page.goto(SHOES_URL);

    // Check for noindex to keep out of search engines
    const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(metaRobots).toBeTruthy();
    expect(metaRobots).toContain('noindex');

    console.log('✓ Noindex meta tag present (good for privacy)');
  });
});

test.afterAll(() => {
  console.log('\n===========================================');
  console.log('ALL CRITICAL SAFETY TESTS COMPLETED');
  console.log('===========================================\n');
});
