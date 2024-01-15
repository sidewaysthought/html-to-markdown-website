/**
 * Attach event listeners to the buttons
 */
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convertToMarkdown').addEventListener('click', convertToMarkdown);
    document.getElementById('filterBySelector').addEventListener('change', toggleSelectorInput);
});

/**
 * Toggles the selector input
 */
function toggleSelectorInput() {
    var checkbox = document.getElementById('filterBySelector');
    var selectorInput = document.getElementById('selectorInput');
    selectorInput.style.display = checkbox.checked ? 'block' : 'none';
}

/**
 * Converts HTML to Markdown
 */
function convertToMarkdown() {
    var inputTxt = document.getElementById('htmlInput').value;
    var useSelector = document.getElementById('filterBySelector').checked;
    var selector = useSelector ? document.getElementById('htmlSelector').value : null;

    if (inputTxt === '') {
        alert('Please enter some HTML to convert');
        return;
    }

    /**
     * Process the HTML with the selector
     * @param {*} html 
     * @returns 
     */
    function processHtmlWithSelector(html) {
        if (useSelector && selector) {
            try {
                // Test if the selector is valid
                document.createDocumentFragment().querySelector(selector);
            } catch (error) {
                alert('Invalid CSS selector.');
                return null;
            }

            var parser = new DOMParser();
            var doc = parser.parseFromString(html, 'text/html');
            var selectedContent = doc.querySelector(selector);
            return selectedContent ? selectedContent.outerHTML : '';
        }
        return html;
    }

    if (isValidUrl(inputTxt)) {
        fetch(inputTxt)
            .then(response => response.text())
            .then(data => {
                var processedHtml = processHtmlWithSelector(data);
                if (processedHtml !== null) {
                    convertHtmlToMarkdown(processedHtml);
                }
            })
            .catch(error => {
                alert('Error fetching the URL: ' + error);
            });
    } else {
        var processedHtml = processHtmlWithSelector(inputTxt);
        if (processedHtml !== null) {
            convertHtmlToMarkdown(processedHtml);
        }
    }
}

/**
 * Converts HTML to Markdown
 * @param {*} html 
 */
function convertHtmlToMarkdown(html) {
    if (html !== '') {
        var turndownService = new TurndownService();
        var markdown = turndownService.turndown(html);
        document.getElementById('markdownOutput').value = markdown;
    } else {
        alert('No content found for conversion.');
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
    var filename = "output.md";

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