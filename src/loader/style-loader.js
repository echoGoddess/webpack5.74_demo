// style-loader
const {
    getOptions,
    parseQuery,
    stringifyRequest
} = require("loader-utils");
const {
    validate
} = require("schema-utils");

module.exports = function(source){
    const options = getOptions(this);
    parseQuery("?param1=foo");
    stringifyRequest(this, "test/lib/index.js")
    let style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style)
  `;
    return style;
}