const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1400, height: 900 });
  
  try {
    console.log('📸 Capturing Home Page...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/home-page.png', fullPage: true });
    console.log('✅ Home page captured');
    
    console.log('📸 Capturing Map Page...');
    await page.goto('http://localhost:5173/map', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/tmp/map-page.png', fullPage: true });
    console.log('✅ Map page captured');
    
    console.log('📸 Capturing Reviews Page...');
    await page.goto('http://localhost:5173/reviews', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: '/tmp/reviews-page.png', fullPage: true });
    console.log('✅ Reviews page captured');
    
    console.log('📸 Capturing Hotels Page...');
    await page.goto('http://localhost:5173/hotels', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/tmp/hotels-page.png', fullPage: true });
    console.log('✅ Hotels page captured');
    
    console.log('\n✅ ALL SCREENSHOTS CAPTURED!');
    console.log('📁 Home: /tmp/home-page.png');
    console.log('📁 Map: /tmp/map-page.png');
    console.log('📁 Reviews: /tmp/reviews-page.png');
    console.log('📁 Hotels: /tmp/hotels-page.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
