<!DOCTYPE html>
<html>

<head>
    <title>Conver HTML to Markdown</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php include('includes/head.php'); ?>
</head>

<body>
    <?php include('includes/navbar.php'); ?>
    <div class="container mt-4">
        <div class="container mt-4">
            <div class="row">

                <div class="col-md-8">
                    <h2>About This Site</h2>
                    <p>The HTML to Markdown Converter is a user-friendly online tool that converts web page HTML
                        into markdown format. It simplifies the process of sharing web content on platforms like
                        ChatGPT or GitHub while preserving crucial information. It is also more usable for non-technical
                        people.
                    </p>
                    <ul>
                        <li>Markdown is a clean, easily readable text format</li>
                        <li>Markdown is widely used in blogging, instant messaging, online forums, collaborative
                            software, documentation pages, and readme files</li>
                        <li>Markdown is easier to read and write than HTML</li>
                        <li>Markdown is easier to make accessible</li>
                    </ul>
                    <p>For more information on Markdown, see <a href="https://www.markdownguide.org/">The
                        Markdown Guide</a>.</p>
                </div>

                <!-- Logo Column -->
                <div class="col-md-4">
                    <img src="images/logo.png" alt="HTML to Markdown Converter Logo" class="img-fluid">
                </div>
            </div>
        </div>

        <form class="mb-5">
            <h3>Step 1: Provide HTML</h3>
            <p>Copy and paste the HTML you wish to convert, or enter the URL of a webpage.</p>
            <div class="alert alert-warning" role="alert">
                <i class="fa-solid fa-exclamation-triangle"></i> <strong>Important:</strong> Entering the URL may not
                work depending on the website's security settings. If you get an error, try pasting the HTML instead.
            </div>
            <p>
                <label for="htmlInput" class="visually-hidden">Paste HTML or a URL</label>
                <textarea id="htmlInput" class="form-control mb-3" rows="10" placeholder="Enter HTML or a URL here"
                    required></textarea><br>
            </p>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="filterBySelector">
                <label class="form-check-label" for="filterBySelector">
                    Filter HTML by Selector
                </label><br>
            </div>
            <div id="selectorInput" style="display: none;">
                <label for="htmlSelector" class="form-label">HTML Selector</label>
                <input type="text" class="form-control" id="htmlSelector" placeholder="Enter a CSS selector">
            </div>


            <h3 class="mt-4">Step 2: Convert to Markdown</h3>
            <button type="button" id="convertToMarkdown" class="btn btn-primary">Convert to Markdown</button>

            <h3 class="mt-4">Step 3: Enjoy!</h3>
            <label for="markdownOutput" class="visually-hidden">View Output</label>
            <textarea id="markdownOutput" class="form-control mt-3 mb-2" rows="10"
                placeholder="Markdown will appear here" readonly></textarea>
            <button onclick="copyToClipboard()" class="btn btn-outline-primary"><i class="fa-solid fa-copy"></i>
                Copy</button>
            <button onclick="downloadML()" class="btn btn-outline-primary"><i class="fa-solid fa-file-download"></i>
                Download as .ml</button>
            <button type="reset" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Start Over</button>
        </form>
    </div>

    <?php include('includes/footer.php'); ?>
    <?php include('includes/footer-js.php'); ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/turndown/7.1.2/turndown.min.js"
        integrity="sha512-7V0hFVI06CJbkXSOgZtdqg40iSPxK+a9nEehUcp299C0elYdeNG+w7ceJ1Ko6WPrLjERkC5pnriiylQWM9Vnpg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="script.js"></script>

</body>
</html>