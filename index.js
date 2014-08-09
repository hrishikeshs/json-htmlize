Handlebars = require('handlebars');

module.exports = {

    toHtml: function (json) {

        function prettyPrint(json) {

            var type = typeof json;

            switch(type) {

            case 'string' :          return  "'" + Handlebars.Utils.escapeExpression(json) + "'";
            break;

            case 'number' :
            case 'undefined' :
            case 'boolean' :         return '<span>' + Handlebars.Utils.escapeExpression(json) + '</span>';


            default:                 if (Array.isArray(json)) {
                                        json = json.map(prettyPrint);
                                        return  '[<div style="margin-left: 30px;">'  + json.join(",<br />") + '</div>]';
                                     }

                                     else {
                                         //none of the above so it is the object
                                         if (json !== null) {
                                             var keys = Object.keys(json);
                                             var htmlArray = [];
                                             for(var i = 0, len = keys.length; i < len; i++) {
                                                 var k = keys[i];
                                                 if(k.indexOf(' ') !== -1) {
                                                     k = '"' + k + '"';
                                                 }
                                                 var html = "<div style='display: inline;'><strong>"
                                                     +  k 
                                                     + '</strong>'
                                                     + ':  ' 
                                                     + "<span style='overflow:auto;'>"
                                                     + prettyPrint(json[k])
                                                     + "</span></div>";

                                                 htmlArray.push(html);
                                             }
                                             return '{' + "<div style='margin-left: 30px;'>" + htmlArray.join(',<br />') + '</div>}';
                                         }
                                         return 'null';
                                     } 

            }
        }
        var html = prettyPrint(json);
        return html;
    }
}
