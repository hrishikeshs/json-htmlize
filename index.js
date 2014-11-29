Handlebars = require('handlebars');
(function() {
  if(typeof document === "undefined") {
    var jsdom = require('jsdom');
    document = jsdom.jsdom("<html><body><h1>Hello</h1></body></html>", null, {
      features: {
        QuerySelector: true
      }
    });
  }
})();

module.exports = {

  toHtml: function (json) {

    function prettyPrint(json, root) {

      var type = typeof json;

      switch(type) {

      case 'string' :
                            return document.createTextNode(Handlebars.Utils.escapeExpression(json));

      break;

      case 'number' :
      case 'undefined' :
      case 'boolean' :
                            var span = document.createElement('span');
                            span.appendChild(document.createTextNode(Handlebars.Utils.escapeExpression(json))); 
                            return span;
                            
      break;

      default:
                            if (Array.isArray(json)) {
                              json = json.map(prettyPrint, root);
                              var arrayOpening = document.createTextNode('['),
                                  arrayClosing = document.createTextNode(']'),
                                  containerDiv = document.createElement('div');
                              containerDiv.appendChild(json.reduce(function(prev, cur) {
                                var comma = document.createTextNode(','),
                                    br = document.createElement('br');
                                return prev.appendChild(comma).appendChild(br).appendChild(cur);
                              }));
                              containerDiv.style.marginLeft = "30px";
                              var documentFrag = document.createElement('div');
                              documentFrag.appendChild(arrayOpening);
                              documentFrag.appendChild(containerDiv);
                              documentFrag.appendChild(arrayClosing);
                              return documentFrag;
                            }
        
        else {
          //none of the above so it is the object
          if (json !== null) {
            var keys = Object.keys(json);
            var htmlArray = [],
                div = null,
                span2 = null,
                colon = null,
                strong = null,
                doubleQuote= document.createTextNode('"');
            for(var i = 0, len = keys.length; i < len; i++) {
              var k = keys[i];
              if(k.indexOf(' ') !== -1) {
                k = '"' + k + '"';
              }
              div = document.createElement('div'),
              strong = document.createElement('strong');
              span2 = document.createElement('span');
              strong.textContent = k;  
              div.style.display = "inline";
              span2.style.overflow = "auto";
              colon = document.createTextNode(':');
              div.appendChild(strong).appendChild(colon);
              div.appendChild(span2).appendChild(prettyPrint(json[k], root));
              htmlArray.push(div);
            }
            var openingBracket = document.createTextNode('{');
            var documentDiv = document.createElement('div');
            documentDiv.appendChild(openingBracket);
            documentDiv.style.marginLeft = "30px";
            htmlArray.forEach(function(docFrag) {
              var lineBreak = document.createElement('br');
              documentDiv.appendChild(docFrag);
              documentDiv.appendChild(lineBreak);
            });
            root.appendChild(documentDiv);
            root.appendChild(document.createTextNode('}'));
            return root;
          }
          return root;
        } 
      }
    }
    var root = document.createElement('div');
    var html = prettyPrint(json, root);
    return html;
  }
};
