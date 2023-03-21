/**
 * @type {SimpleHTMLEditorConfig}
 * */
var Config;

/**
 * New Simple HTML Editor engine
 * */
class SimpleHTMLEditor {
    //Config;

    /**
     * New Simple HTML Editor engine
     * 
     * @param {SimpleHTMLEditorConfig}  config  Configuration object for SimpleHTMLEditor
     * */
    constructor(config) {
        Config = config
    }

    /**
     * Application's main entry point
     * */
    Run() {
        this.Initialize();
        this.Render();
    }

    Initialize() {
        document.getElementById(config.WorkingPanel).style.height = "500px";
    }

    Render() {
        var layout = new LayoutBuilder(Config).Build();

        document.getElementById(Config.WorkingPanel).appendChild(layout);
    }
}

/**
 * Layout builder class
 * 
 * */
class LayoutBuilder {

    /** @type {SimpleHTMLEditorConfig} */
    Config;

    /**
     * 
     * */
    constructor(config) {
        this.Config = config;
    }

    /**
     * Build layout
     * 
     * @param {SimpleHTMLEditorConfig}  config Configuration object
     * */
    Build() {
        // Main editor layout
        var layout = document.createElement("div");
        layout.style.height = "100%";
        layout.classList.add("w3-display-container");

        // Toolbar
        var toolbar = document.createElement("div");
        toolbar.id = "pnlEditorToolbar_" + this.Config.WorkingPanel;
        toolbar.classList.add("w3-bar");
        toolbar.classList.add("w3-block");
        toolbar.classList.add("w3-block");
        toolbar.classList.add("w3-black");
        toolbar.classList.add("w3-card");
        toolbar.style.zIndex = 99;
        toolbar.style.position = "absolute";
        toolbar.style.top = "0";
        layout.appendChild(toolbar);

        // Get available controls
        toolbar.appendChild(GenerateControls());

        // Content
        var contentPanelContainer = document.createElement("iframe");
        contentPanelContainer.id = "pnlEditorContent_" + this.Config.WorkingPanel;
        contentPanelContainer.classList.add("w3-display-bottomleft");
        contentPanelContainer.classList.add("w3-block");
        contentPanelContainer.style.overflowY = "scroll";
        contentPanelContainer.style.overflowX = "hidden";
        contentPanelContainer.style.backgroundColor = "#ffffffc0";
        contentPanelContainer.style.backdropFilter = "blur(10px)";
        contentPanelContainer.style.height = "500px";
        contentPanelContainer.style.paddingTop = "38.5px";
        contentPanelContainer.style.border = "none";
        contentPanelContainer.srcdoc = "<html><head><link rel=\"stylesheet\" href=\"" + config.W3CSSPath + "\" /><link rel=\"stylesheet\" href=\"" + config.LineAwesomePath + "\" /></head><body class=\"w3-container\" onload=\"document.designMode='On';\"></body></html>";
        layout.appendChild(contentPanelContainer);

        // Append to panel
        return layout;
    }
}

function GenerateControls() {

    var controlGroup = document.createElement("div");

    // Bold button
    var btnBold = new BoldButton();
    btnBold.WorkingPanel = Config.WorkingPanel;
    btnBold.ID = "btnEditBold";
    controlGroup.appendChild(btnBold.Render());

    // Italic button
    var btnItalic = new ItalicButton();
    btnItalic.WorkingPanel = Config.WorkingPanel;
    btnItalic.ID = "btnEditItalic";
    controlGroup.appendChild(btnItalic.Render());

    // Underline button
    var btnUnderline = new UnderlineButton();
    btnUnderline.WorkingPanel = Config.WorkingPanel;
    btnUnderline.ID = "btnEditItalic";
    controlGroup.appendChild(btnUnderline.Render());

    var separator = new Separator();
    separator.ID = "separator1";
    controlGroup.appendChild(separator.Render());

    var btnLeftAlign = new LeftAlign();
    btnLeftAlign.WorkingPanel = Config.WorkingPanel;
    btnLeftAlign.ID = "btnLeftAlign";
    controlGroup.appendChild(btnLeftAlign.Render());

    var btnJustifyAlign = new JustifyFullAlign();
    btnJustifyAlign.WorkingPanel = Config.WorkingPanel;
    btnJustifyAlign.ID = "btnJustifyAlign";
    controlGroup.appendChild(btnJustifyAlign.Render());

    var btnRightyAlign = new RightAlign();
    btnRightyAlign.WorkingPanel = Config.WorkingPanel;
    btnRightyAlign.ID = "btnRightAlign";
    controlGroup.appendChild(btnRightyAlign.Render());

    var separator2 = new Separator();
    separator2.ID = "separator2";
    controlGroup.appendChild(separator2.Render());

    var btnOrderedList = new OrderedList();
    btnOrderedList.WorkingPanel = Config.WorkingPanel;
    btnOrderedList.ID = "btnOrderedList";
    controlGroup.appendChild(btnOrderedList.Render());

    var btnUnorderedList = new UnorderedList();
    btnUnorderedList.WorkingPanel = Config.WorkingPanel;
    btnUnorderedList.ID = "btnUnorderedList";
    controlGroup.appendChild(btnUnorderedList.Render());

    var btnQuote = new QuoteButton();
    btnQuote.WorkingPanel = Config.WorkingPanel;
    btnQuote.ID = "btnQuote";
    controlGroup.appendChild(btnQuote.Render());

    // Separator
    return controlGroup;
}

class SimpleHTMLEditorConfig {

    /** @type {string} Panel to work */
    WorkingPanel;

    /** @type {string} W3CSS url or path */
    W3CSSPath;

    /** @type {string} Line Awesome url or path */
    LineAwesomePath;
}

// #region Base class

/**
 * Base control for SimpleHTMLEditor
 * */
class ControlBase {
    /** @type {string}*/
    WorkingPanel;

    /** @type {string} */
    ID;

    /** @type {string} */
    CssClass;

    /** @type {string} */
    Style;

    /** @type {string}*/
    Type;

    constructor() {
    }
}

/** Button class */
class Button extends ControlBase {
    Button;

    constructor() {
        super();
        this.Type = "button";
        this.Button = document.createElement(this.Type);
        this.CssClass = "w3-bar-item w3-button w3-transparent w3-hover-dark-grey";
    }
}


// #endregion Base class


// #region Controls

/**
 * Bold control for SimpleHTMLEditor
 * */
class BoldButton extends Button {
    constructor() {
        super();
    }

    /** @type {string}*/
    Text;

    /** Convert document*/
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.innerHTML = "<i class=\"la la-bold\"></i>";
        this.Button.className = this.CssClass;
        this.Button.title = "Make selected text bold";
        this.Button.addEventListener("click", function () { ExecuteCommand("bold", workingPanel) });
        return this.Button;
    }
}

class ItalicButton extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.innerHTML = "<i class=\"la la-italic\"></i>";
        this.Button.className = this.CssClass;
        this.Button.title = "Make selected text italic";
        this.Button.addEventListener("click", function (event) { ExecuteCommand("italic", workingPanel); });
        return this.Button;
    }
}

class UnderlineButton extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.innerHTML = "<i class=\"la la-underline\"></i>";
        this.Button.className = this.CssClass;
        this.Button.title = "Add underline to selected text";
        this.Button.addEventListener("click", function () { ExecuteCommand("underline", workingPanel); });
        return this.Button;
    }
}

// #region Document alignment

class LeftAlign extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.className = this.CssClass;
        this.Button.innerHTML = "<i class=\"la la-align-left\"></i>";
        this.Button.title = "Align text to the left";
        this.Button.addEventListener("click", function () { ExecuteCommand("justifyLeft", workingPanel); });

        return this.Button;
    }
}

class JustifyFullAlign extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.className = this.CssClass;
        this.Button.innerHTML = "<i class=\"la la-align-justify\"></i>";
        this.Button.title = "Align text to both left and right of the document";
        this.Button.addEventListener("click", function () { ExecuteCommand("justifyFull", workingPanel); });

        return this.Button;
    }
}

class RightAlign extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.className = this.CssClass;
        this.Button.innerHTML = "<i class=\"la la-align-right\"></i>";
        this.Button.title = "Align text to both right of the document";
        this.Button.addEventListener("click", function () { ExecuteCommand("justifyRight", workingPanel); });

        return this.Button;
    }
}
// #endregion Document alignment

// #region List
class OrderedList extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.className = this.CssClass;
        this.Button.innerHTML = "<i class=\"la la-list-ol\"></i>";
        this.Button.title = "Add ordered list to the document";
        this.Button.addEventListener("click", function () { ExecuteCommand("insertOrderedList", workingPanel); });

        return this.Button;
    }
}

class UnorderedList extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.className = this.CssClass;
        this.Button.innerHTML = "<i class=\"la la-list-ul\"></i>";
        this.Button.title = "Add unordered list to the document";
        this.Button.addEventListener("click", function () { ExecuteCommand("insertUnorderedList", workingPanel); });

        return this.Button;
    }
}

// #endregion List

// Quotes
class QuoteButton extends Button {
    constructor() {
        super();
    }
    Render() {
        var workingPanel = this.WorkingPanel;
        this.Button.id = this.ID;
        this.Button.className = this.CssClass;
        this.Button.innerHTML = "<i class=\"la la-quote-right\"></i>";
        this.Button.title = "Add quote to document";
        this.Button.addEventListener("click", function () { ExecuteAddQuote(workingPanel); });

        return this.Button;
    }
}

// Separator

class Separator extends ControlBase {
    constructor() {
        super();
        this.Type = "div";
    }
    Render() {
        var separator = document.createElement(this.Type);
        separator.id = this.ID;
        separator.className = "w3-bar-item w3-text-dark-grey";
        separator.innerHTML = "|";
        separator.style.width = "1";
        return separator;
    }
}

// #endregion Controls

// Region Command
/**
 * Execute command
 * 
 * @param {string} command      Command name
 * @param {string} workingPanel Working Iframe panel id
 * */
function ExecuteCommand(command, workingPanel) {
    console.log(workingPanel)
    var test = document.getElementById("pnlEditorContent_" + workingPanel).contentWindow.document.execCommand(command, false, null);
}

/**
 * Add quote to panel
 * 
 * @param {string} workingPanel Working iframe panel id
 * */
function ExecuteAddQuote(workingPanel) {
    var quote = "<div class=\"w3-card w3-leftbar w3-border-green w3-margin-top\" style=\"padding-top:16px; padding-bottom:16px;\"><br />";
    quote += "    <div class=\"w3-container w3-xlarge\" contenteditable=\"true\">";
    quote += "        <i>Enter quote here</i>";
    quote += "    </div>";
    quote += "    <footer class=\"w3-container w3-wide\" contenteditable=\"true\">";
    quote += "        Add quote source here";
    quote += "    </footer>";
    quote += "</div>";

    document.getElementById("pnlEditorContent_" + workingPanel).contentWindow.document.body.innerHTML += quote;
    document.getElementById("pnlEditorContent_" + workingPanel).contentWindow.document.body.innerHTML += "<br \>";


}
// #endregion Command