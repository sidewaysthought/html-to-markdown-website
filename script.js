
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