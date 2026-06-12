import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    console.log('📸 Capturing Fixed Home Page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/tmp/home-fixed.png', fullPage: true });
    console.log('✅ Screenshot saved: /tmp/home-fixed.png');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
