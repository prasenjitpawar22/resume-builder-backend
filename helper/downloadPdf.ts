// // import fs from 'fs'
// let chrome: any = {};
// let puppeteer: any;

// console.log(process.env.AWS_LAMBDA_FUNCTION_VERSION);


// if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
//     // running on the Vercel platform.
//     chrome = require('chrome-aws-lambda');
//     puppeteer = require('puppeteer-core');
// } else {
//     // running locally.
//     puppeteer = require('puppeteer');
// }
import chromium from 'chrome-aws-lambda';


// import puppeteer from 'puppeteer'

export const downloadPdf = async (userId: string) => {
    // Create a browser instance
    // const browser = await puppeteer.launch();
    try {
        let browser = await chromium.puppeteer.launch({
            args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        })
        // Create a new page
        const page = await browser.newPage();

        // Website URL to export as pdf
        // let website_url = ''
        // if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
        let website_url = `https://backend-be.vercel.app/build/download/${userId}`;
        // }
        // else {
        // website_url = `http://localhost:8000/build/download/${userId}`
        // }

        // Open URL in current page
        await page.goto(website_url, { waitUntil: 'networkidle0' });
        console.log(process.env.AWS_LAMBDA_FUNCTION_VERSION);

        await page.emulateMediaType('screen');


        const pdf = await page.pdf({
            path: 'result.pdf',
            format: 'a4',
        });


        await browser.close();

        return pdf
    } catch (err) {
        console.error(err);
        return null;
    }

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