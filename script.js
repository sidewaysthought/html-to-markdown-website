
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convertToMarkdown').addEventListener('click', convertToMarkdown);
});

function convertToMarkdown() {

    // If the user has entered a URL, download the HTML from that URL
    // Otherwise, use the HTML from the text area
    var inputTxt = document.getElementById('htmlInput').value;
    var html = '';

    // Check if inputTxt is blank. If so, alert the user and return
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

function copyToClipboard() {
    var copyText = document.getElementById("markdownOutput");
    copyText.select();
    document.execCommand("copy");
}

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

function isValidUrl(url) {
    var regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return regex.test(url);
}