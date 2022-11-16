// style-loader
const { parseQuery, stringifyRequest } = require("loader-utils");

module.exports = function (source) {
  parseQuery("?param1=foo");
  stringifyRequest(this, "test/lib/index.js");
  const style = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style)
  `;
  return style;
};
