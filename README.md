# SimpleHTMLEditor

A simple WYSIWYG editor with pure JavaScript.

## How to use

1. Add Application.js to your HTML document
2. Add a div panel with an ID you choose (for example "pnlEditor")
3. Add a new <script> tag to your document
4. Define a new configuration object from _SimpleHTMLEditorConfig_ class and define this properties bellow 
   - WorkPanel = ID of the div from step 2
   - W3CSSPath = Path to W3.CSS css framework (Yes, the same W3.CSS from W3Schools)
   - LineAwesomePath = Path to LineAwesome font icon (Font Awesome but the outline version)
5. Define a variable and assign with _new SimpleHTMLEditor(#your_config_object).Run();_
