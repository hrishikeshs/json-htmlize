(function () {
  if (typeof document === 'undefined') {
    // node.js
    var jsdom = require('jsdom');
    var JSDOM = jsdom.JSDOM;
    var dom = new JSDOM('<html><body><h1>Hello</h1></body></html>');
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = global.window.navigator;
  }
})();

module.exports = {
  toHtmlDom: function (jsObject) {
    function prettyPrint(objToPrettyPrint, root) {
      var type = typeof objToPrettyPrint;
      switch (type) {
        case 'string':
          var d = document.createElement('span');
          d.appendChild(document.createTextNode(objToPrettyPrint));
          return d;

        case 'number':
        case 'undefined':
        case 'boolean':
          var span = document.createElement('span');
          span.appendChild(document.createTextNode(objToPrettyPrint));
          return span;

        default:
          if (Array.isArray(objToPrettyPrint)) {
            objToPrettyPrint = objToPrettyPrint.map(prettyPrint, root);
            var arrayOpening = document.createTextNode('['),
              arrayClosing = document.createTextNode(']'),
              containerDiv = document.createElement('div');
            containerDiv.appendChild(
              objToPrettyPrint.reduce(function (prev, cur) {
                var comma = document.createTextNode(','),
                  br = document.createElement('br');
                prev.appendChild(comma);
                prev.appendChild(br);
                prev.appendChild(cur);
                return prev;
              })
            );
            containerDiv.style.marginLeft = '30px';
            var documentFrag = document.createElement('div');
            documentFrag.appendChild(arrayOpening);
            documentFrag.appendChild(containerDiv);
            documentFrag.appendChild(arrayClosing);
            return documentFrag;
          } else {
            //none of the above so it is the object
            if (objToPrettyPrint !== null) {
              var keys = Object.keys(objToPrettyPrint);
              var htmlArray = [];
              for (var i = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                var div = document.createElement('div');
                var strong = document.createElement('strong');
                var colon = document.createTextNode(':  ');
                strong.textContent = k;
                div.style.marginLeft = '30px';
                div.appendChild(strong).appendChild(colon);
                if (k === null) {
                  k = 'null'; // explicitly use the word 'null' to indicate null values
                } else if (k === undefined) {
                  k = 'undefined';
                }
                if (k.indexOf(' ') !== -1) {
                  k = '"' + k + '"';
                }
                var currentValue = objToPrettyPrint[keys[i]];
                if (currentValue === null) {
                  currentValue = 'null';
                } else if (currentValue === undefined) {
                  currentValue = 'undefined';
                }

                div.appendChild(prettyPrint(currentValue, div));
                if (len - i !== 1) {
                  div.appendChild(document.createTextNode(','));
                }
                htmlArray.push(div);
              }
              var openingBracket = document.createElement('span');
              openingBracket.appendChild(document.createTextNode('{'));
              var documentDiv = document.createElement('div');
              documentDiv.appendChild(openingBracket);
              htmlArray.forEach(function (docFrag) {
                documentDiv.appendChild(docFrag);
              });
              var closingBracket = document.createElement('span');
              closingBracket.appendChild(document.createTextNode('}'));
              documentDiv.appendChild(closingBracket);
              return documentDiv;
            }
            return root;
          }
      }
    }
    var root = document.createElement('div');
    var html = prettyPrint(jsObject, root);
    return html;
  },

  toHtmlString: function (obj) {
    return this.toHtmlDom(obj).innerHTML;
  },
};
