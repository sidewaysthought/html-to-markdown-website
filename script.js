/**
 * Attach event listeners to the buttons
 */
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convertToMarkdown').addEventListener('click', convertToMarkdown);
    document.getElementById('filterBySelector').addEventListener('change', toggleSelectorInput);
    document.getElementById('copyToClipboardBtn').addEventListener('change', copyToClipboard);
    document.getElementById('downloadFileBtn').addEventListener('change', downloadMd);
});

/**
 * Toggles the selector input
 */
function toggleSelectorInput(e) {
    e.preventDefault();
    var checkbox = document.getElementById('filterBySelector');
    var selectorInput = document.getElementById('selectorInput');
    selectorInput.style.display = checkbox.checked ? 'block' : 'none';
}

/**
 * Converts HTML to Markdown
 */
function convertToMarkdown(e) {
    e.preventDefault();
    var inputTxt = document.getElementById('htmlInput').value;
    var useSelector = document.getElementById('filterBySelector').checked;
    var selector = useSelector ? document.getElementById('htmlSelector').value : null;

    if (inputTxt === '') {
        alert('Please enter some HTML or URL(s) to convert');
        return;
    }

    // Check if input is likely a URL or HTML
    if (isLikelyUrl(inputTxt)) {
        var inputs = inputTxt.split(/[\n\s]+/);
        var promises = inputs.map(input => {
            if (isValidUrl(input)) {
                return fetchAndConvertUrl(input, selector, useSelector);
            } else {
                return Promise.resolve(''); // If not a valid URL, resolve with an empty string
            }
        });

        Promise.all(promises).then(results => {
            // Join all the markdown contents
            var combinedMarkdown = results.join('\n\n');
            document.getElementById('markdownOutput').value = combinedMarkdown;
        });
    } else {
        var processedHtml = processHtmlWithSelector(inputTxt, selector);
        if (processedHtml !== null) {
            convertHtmlToMarkdown(processedHtml);
        }
    }
}

/**
 * Check if the input text is likely a URL
 * @param {string} text 
 */
function isLikelyUrl(text) {
    return text.trim().startsWith('http://') || text.trim().startsWith('https://');
}

/**
 * Fetches and converts a URL to Markdown
 * @param {string} url 
 * @param {string} selector 
 * @param {boolean} useSelector - Indicates whether to use the selector
 */
function fetchAndConvertUrl(url, selector, useSelector) {
    return fetch(url)
        .then(response => response.text())
        .then(data => {
            var processedHtml = useSelector && selector ? processHtmlWithSelector(data, selector) : data;
            return processedHtml !== null ? convertHtmlToMarkdown(processedHtml) : '';
        })
        .catch(error => {
            alert('Error fetching the URL:', error);
            return ''; // Return an empty string in case of error
        });
}
/**
 * Process the HTML with the selector
 * @param {*} html 
 * @param {*} selector 
 * @returns 
 */
function processHtmlWithSelector(html, selector) {
    if (selector) {
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


/**
 * Converts HTML to Markdown
 * @param {*} html 
 */
function convertHtmlToMarkdown(html) {
    if (html !== '') {
        html = html.replace(/<head>[\s\S]*?<\/head>/gi, '');
        html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
        html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
        html = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, '');

        var turndownService = new TurndownService({
            'headingStyle': 'atx',
            'codeBlockStyle': 'fenced',
            'strongDelimiter': '__'
        });
        var markdown = turndownService.turndown(html);

        // Collapse multiple empty lines down to one
        markdown = markdown.replace(/\n{3,}/g, '\n\n');
        return markdown;
    } else {
        alert('No content found for conversion.');
        return '';
    }
}

/**
 * Copy the markdown to the clipboard
 */
function copyToClipboard(e) {
    e.preventDefault();
    var copyText = document.getElementById("markdownOutput");
    copyText.select();
    document.execCommand("copy");
}

/**
 * Download the markdown as a file
 */
function downloadMd(e) {
    e.preventDefault();
    var text = document.getElementById("markdownOutput").value;
    var currentDate = new Date();
    var formattedDate = currentDate.toISOString().replace(/[-:]/g, "").slice(0, 14);
    var filename = "output_" + formattedDate + ".md";

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