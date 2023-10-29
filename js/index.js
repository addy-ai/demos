const demosList = [
    {
        "companyName": "Educohire",
        "chatbotPublicId": "712beb15-1de0-46d2-8aca-10a18c15a08a",
        "page": "#educohire",
        "iframeURL": "https://www.educohire.com/",
        "backgroundImageURL": "https://tinyurl.com/9ff2d8d6", // failover if iframeURL has security rules preventing embed
    },
    {
        "companyName": "BuiltFirst",
        "chatbotPublicId": "26726d1a-1020-47c9-bb86-444344757463",
        "page": "#builtfirst",
        "iframeURL": "https://builtfirst.com",
        "backgroundImageURL": "https://firebasestorage.googleapis.com/v0/b/hey-addy-chatgpt.appspot.com/o/public%2Fdemos%2FScreen%20Shot%202023-10-25%20at%206.32.03%20PM.png?alt=media&token=f2c0c09d-c834-46da-bf2a-ae78476f8165", // failover if iframeURL has security rules preventing embed
    },
    {
        "companyName": "CoryHomeTeam",
        "chatbotPublicId": "145d08a1-5732-4a3f-90d4-3f913029c53f",
        "page": "#cory",
        "iframeURL": "https://www.soldbyblakecory.com",
        "backgroundImageURL": "https://firebasestorage.googleapis.com/v0/b/hey-addy-chatgpt.appspot.com/o/public%2Fdemos%2FScreen%20Shot%202023-10-25%20at%206.32.03%20PM.png?alt=media&token=f2c0c09d-c834-46da-bf2a-ae78476f8165", // failover if iframeURL has security rules preventing embed
    },
    {
        "companyName": "CircleUp",
        "chatbotPublicId": "8ddd2356-9129-4ecb-85e1-07e30bf46238",
        "page": "#circleup",
        "iframeURL": "https://www.circleup.online/",
        "backgroundImageURL": "https://firebasestorage.googleapis.com/v0/b/hey-addy-chatgpt.appspot.com/o/public%2Fdemos%2Fcircleup_site.png?alt=media&token=c67488bb-db6b-46f7-8fc4-eaae1807f0f8", // failover if iframeURL has security rules preventing embed
    },

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
        if (currentURL.includes(currentDemo["page"])) {
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

