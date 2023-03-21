# SimpleHTMLEditor

A simple WYSIWYG editor with pure JavaScript.

## How to use

1. Add Application.js to your HTML document
2. Add a div panel with an ID you choose (for example "pnlEditor")
3. Add this script and but change the config properties value
```JavaScript
<script>
   var config = new SimpleHTMLEditorConfig();
   config.WorkingPanel = "pnlEditor"; // ID of the DIV from step 2
   config.LineAwesomePath = "line-awesome-1.3.0/1.3.0/css/line-awesome.min.css"; // LineAwesome font icon location
   config.W3CSSPath = "w3.css"; // W3.CSS css framework location
</script>
```
4. Define a variable and assign it with _new SimpleHTMLEditor(#your_config_object).Run();_ object and put it within the same _script_ tag
```JavaScript
var editor = new SimpleHTMLEditor(config).Run();
```
