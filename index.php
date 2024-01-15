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
        <h2>About This Site</h2>
        <p>Markdown is a clean, easily readable text format that doesn't ac</p>
        <h2>About Markdown</h2>
        <p>The HTML to Markdown Converter is a user-friendly online tool that converts web page HTML into markdown
            format. It simplifies the process of sharing web content on platforms like ChatGPT or GitHub while
            preserving crucial information. It is also more usable for non-technical people.
        </p>
        <ul>
            <li>Markdown is a clean, easily readable text format</li>
            <li>Markdown is widely used in blogging, instant messaging, online forums, collaborative software,
                documentation pages, and readme files</li>
            <li>Markdown is easier to read and write than HTML</li>
            <li>Markdown is easier to make accessible</li>
        </ul>
        <p>For more information on Markdown, see <a href="https://www.markdownguide.org/">The Markdown Guide</a>.</p>

        <form>
            <h3>Step 1: Provide HTML</h3>
            <label for="htmlInput" class="visually-hidden">Paste HTML</label><textarea id="htmlInput"
                class="form-control mb-3" rows="10" placeholder="Enter HTML here"></textarea>
            <h3>Step 2: Convert to Markdown</h3>
            <button type="button" id="convertToMarkdown" class="btn btn-primary">Convert to Markdown</button>
            <h3>Step 3: Enjoy!</h3>
            <label for="markdownOutput" class="visually-hidden"><textarea id="markdownOutput" class="form-control mt-3"
                    rows="10" placeholder="Markdown will appear here"></textarea>
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