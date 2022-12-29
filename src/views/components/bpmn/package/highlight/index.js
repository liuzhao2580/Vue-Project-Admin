const hljs = require("highlight.js/lib/highlight");
// import hljs from "highlight.js/lib/highlight";
hljs.registerLanguage("xml", require("highlight.js/lib/languages/xml"));
hljs.registerLanguage("json", require("highlight.js/lib/languages/json"));

module.exports = hljs;
