// // import fs from 'fs'
let chrome = {};
let puppeteer: any;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    // running on the Vercel platform.
    chrome = require('chrome-aws-lambda');
    puppeteer = require('puppeteer-core');
} else {
    // running locally.
    puppeteer = require('puppeteer');
}

// import puppeteer from 'puppeteer'

export const downloadPdf = async (userId: string) => {
    // Create a browser instance
    const browser = await puppeteer.launch();

    // Create a new page
    const page = await browser.newPage();

    // Website URL to export as pdf
    let website_url = ''
    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        website_url = `https://backend-be.vercel.app/build/download/${userId}`;
    }
    else {
        website_url = `http://localhost:8000/build/download/${userId}`
    }

    // Open URL in current page
    await page.goto(website_url, { waitUntil: 'networkidle0' });
    console.log(process.env.AWS_LAMBDA_FUNCTION_VERSION);

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

    return pdf
}


// const getData = async (url) => {
//   try {
//     let browser = await puppeteer.launch({
//       args: [...chrome.args, '--hide-scrollbars', '--disable-web-security'],
//       defaultViewport: chrome.defaultViewport,
//       executablePath: await chrome.executablePath,
//       headless: true,
//       ignoreHTTPSErrors: true,
//     });
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// }