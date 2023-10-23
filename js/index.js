const demosList = [
    {
        "companyName": "Educohire",
        "chatbotPublicId": "4c0aa5a8-8d51-4573-8230-eec6a91fb15c",
        "page": "/educohire",
        "iframeURL": "https://www.educohire.com/",
        "backgroundImageURL": "https://tinyurl.com/9ff2d8d6", // failover if iframeURL has security rules preventing embed
    }
]

// window.onload = async function () {
//     console.log("here")
//     await loadDemo();
// }

document.addEventListener("DOMContentLoaded", async function() {
    await loadDemo();
});

async function loadDemo() {
    const currentURL = window.location.href;

    // Now make the backgroundImageDiv
    for (let i = 0; i < demosList.length; i++) {
        const currentDemo = demosList[i];
        // currentURL.includes(currentDemo["page"])
        if (true) {
            // Create script tag for this particular demo
            const scriptTag = document.createElement("script");

            // Change the ID of the script tag to point to the chatbot public ID
            scriptTag.setAttribute("id", currentDemo["chatbotPublicId"]);

            scriptTag.setAttribute("src", "https://cdn.jsdelivr.net/gh/addy-ai/customer-inquiry-bot@latest/js/bubble.min.js");
            scriptTag.setAttribute("title", "embed");

            // Change the background image to be the Demo background
            await embedIframeOrBackgroundImage(currentDemo);

            // Append the script tag to the page
            document.body.append(scriptTag);
            
        }
        
    }
}

async function embedIframeOrBackgroundImage(currentDemo) {
    const backgroundImageDiv = document.getElementById("background-image-homepage");
    const demoIframe = document.getElementById("demo-iframe");
    // Fetch the url to check if it has X-Frame-Options set
    fetch(currentDemo["iframeURL"]).then(response => {
        // Check if 'x-frame-options' or 'content-security-policy' are present in headers
        if (response.headers.has('x-frame-options') || response.headers.has('content-security-policy')) {
            console.log('Cannot embed due to security rules');
            
            // Proceed with div background Image setup
            if (backgroundImageDiv) {
                backgroundImageDiv.style.backgroundImage = `url(${currentDemo["backgroundImageURL"]})`;
                backgroundImageDiv.style.display = "block";
                demoIframe.style.display = "none";
            }
        } else {
            // It's safe to set the iframe src attribute
            if (demoIframe) {
                demoIframe.setAttribute("src", currentDemo["iframeURL"]);

                demoIframe.style.display = "block";
                if (backgroundImageDiv) backgroundImageDiv.style.display = "none";
            }
        }
    }).catch(err => {
        console.log('Error occurred: ', err);

        // In case of error, proceed with div background Image setup
        if (backgroundImageDiv) {
            console.log("Using background image");
            backgroundImageDiv.style.backgroundImage = `url(${currentDemo["backgroundImageURL"]})`;
            backgroundImageDiv.style.display = "block";
            if (demoIframe) demoIframe.style.display = "none";
        }
    });

}
