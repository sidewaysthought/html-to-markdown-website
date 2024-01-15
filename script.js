
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('convertToMarkdown').addEventListener('click', convertToMarkdown);
});

function convertToMarkdown() {
    var turndownService = new TurndownService();
    var html = document.getElementById('htmlInput').value;
    var markdown = turndownService.turndown(html);
    document.getElementById('markdownOutput').value = markdown;
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