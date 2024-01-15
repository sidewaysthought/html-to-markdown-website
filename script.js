/**
 * Attach event listeners to the buttons
 */
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convertToMarkdown').addEventListener('click', convertToMarkdown);
});

/**
 * Converts HTML to Markdown
 */
function convertToMarkdown() {

    var inputTxt = document.getElementById('htmlInput').value;
    var html = '';

    if (inputTxt == '') {
        alert('Please enter some HTML to convert');
        return;
    }

    if (isValidUrl(inputTxt)) {
        try {
            var request = new XMLHttpRequest();
            request.open('GET', inputTxt, false);
            request.send(null);
            html = request.responseText;
        } catch (error) {
            alert('Error: ' + error);
            return;
        }
    } else {
        html = inputTxt;
    }

    if (html != '') {
        var turndownService = new TurndownService();
        var markdown = turndownService.turndown(html);
        document.getElementById('markdownOutput').value = markdown;    
    }
}

/**
 * Copy the markdown to the clipboard
 */
function copyToClipboard() {
    var copyText = document.getElementById("markdownOutput");
    copyText.select();
    document.execCommand("copy");
}

/**
 * Download the markdown as a file
 */
function downloadML() {
    var text = document.getElementById("markdownOutput").value;
    var filename = "output.ml";

    var blob = new Blob([text], { type: "text/plain" });

    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/**
 * Checks if the input is a valid URL
 * @param {string} url 
 */
function isValidUrl(url) {
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url);
}