// import fs from 'fs'
import puppeteer from 'puppeteer'

export const downloadPdf = async () => {
    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Website URL to export as pdf
    const website_url = 'http://localhost:3000/download-resume';
    // Open URL in current page
    await page.goto(website_url, { waitUntil: 'networkidle0' });

    // //Get HTML content from HTML file
    // const html = fs.readFileSync('sample.html', 'utf-8');
    // await page.setContent(html, { waitUntil: 'networkidle2' });

    //To reflect CSS used for screens instead of print
    await page.emulateMediaType('screen');

    // Downlaod the PDF
    const pdf = await page.pdf({
        path: 'result.pdf',
        // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        // printBackground: true,
        format: 'A4',
    });

    // Capture screenshot
    await page.screenshot({
        path: 'screenshot.jpg'
    });
    // Close the browser instance
    await browser.close();
}
