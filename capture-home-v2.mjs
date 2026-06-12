import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    console.log('📸 Capturing Home Page with loaded images...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(4000);
    
    // Scroll to city images section
    await page.evaluate(() => {
      window.scrollTo(0, 800);
    });
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: '/tmp/home-cities.png', fullPage: true });
    console.log('✅ Screenshot saved: /tmp/home-cities.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
