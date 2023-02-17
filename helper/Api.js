import fs from 'fs'
import { request } from 'https';
export default async function aapiCall(app) {
    console.log('innnnnnn');
    // @param {String} token - String containing your API Key 
    // @param {String} url - Encoded URI string container the URI you're targeting 
    // @param {Integer} width - Integer indicating the width of your target render
    // @param {Integer} height - Integer indicating the height of your target render
    // @param {String} output - String specifying the output format, "image" or "json"
    var token = 'Your API Key';
    var url = encodeURIComponent("http://localhost:3000/download-resume");
    var width = 1920;
    var height = 1080;
    var output = 'pdf';

    // Construct the query params and URL
    var query = "https://shot.screenshotapi.net/pdf";;
    query += `?token=${token}&url=${url}&width=${width}&height=${height}&output=${output}`;

    // Call the API and save the screenshot
    request.get({ url: query, encoding: 'binary' }, (err, response, body) => {
        console.log('in');
        fs.writeFile("screenshot.pdf", body, 'binary', err => {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    });

}