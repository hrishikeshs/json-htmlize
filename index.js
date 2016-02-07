(function() {
  if(typeof document === "undefined") {
    // node.js
    var jsdom = require('jsdom');
    document = jsdom.jsdom("<html><body><h1>Hello</h1></body></html>", {
      features: {
        // QuerySelector must be turned on on the specific document we're creating
        QuerySelector: true
      }
    });
  }
})();

module.exports = {

  toHtmlDom: function ( json ) {

    function prettyPrint( json, root ) {

      var type = typeof json;
      switch(type) {

      case 'string' :        var d = document.createElement('span');
                             d.appendChild(document.createTextNode(json));
                             return d;
      break;

      case 'number' :
      case 'undefined' :
      case 'boolean' :
                            var span = document.createElement('span');
                            span.appendChild(document.createTextNode(json)); 
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
                                prev.appendChild(comma);
                                prev.appendChild(br);
                                prev.appendChild(cur);
                                return prev;
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
                                   br = document.createElement('br'),
                                   span2 = null,
                                   colon = null,
                                   strong = null;
                               for(var i = 0, len = keys.length; i < len; i++) {
                                 var k = keys[i];
                                 if(k.indexOf(' ') !== -1) {
                                   k = '"' + k + '"';
                                 }
                                 div = document.createElement('div'),
                                 strong = document.createElement('strong');
                                 strong.textContent = k; 
                                 div.style.marginLeft = "30px";
                                 colon = document.createTextNode(':  ');
                                 div.appendChild(strong).appendChild(colon);
                                 var json_keys_i = json[keys[i]];
                                 if(!json_keys_i) json_keys_i = '(empty)'
                                 div.appendChild(prettyPrint(json_keys_i, div));
                                 if((len - i) !== 1) {
                                   div.appendChild(document.createTextNode(','));
                                 }
                                 htmlArray.push(div);
                               }
                               var openingBracket = document.createElement('span');
                               openingBracket.appendChild(document.createTextNode('{'));
                               var documentDiv = document.createElement('div');
                               documentDiv.appendChild(openingBracket);
                               htmlArray.forEach(function(docFrag) {
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
    var html = prettyPrint(json, root);
    return html;
  },
  
  toHtmlString: function( json ) {
    return this.toHtmlDom(json).innerHTML;
  }
};
