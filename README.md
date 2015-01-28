json-htmlize
============

Spits out html from your json.


Installing
==========
```
npm install json-htmlize
```

Usage
=====

```
var htmlize = require('json-htmlize').toHtml;

var html = htmlize({name: "mongo", type: "db", type: "nosql-database"}); 
```

examples
=======

```
var s = require('json-htmlize');

var dom = s.toHtmlDom({name: "mongo", type: "db", type: "nosql-database"}); //returns a dom node.

document.body.appendChild(dom); //Pretty print your json object right in the browser.

//you can also obtain the dom generated as a string

var htmlString = s.toHtmlString({name: "mongo", type: "db", type: "nosql-database"}); 

console.log(htmlString);
```

prints out:
```
"<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>nosql-database</span></div><span>}</span>"
```

Tests
=====

```
npm install --save-dev mocha
npm install --save-dev chai
```

run tests using 

```
./node_modules/bin/mocha test/
```



Why?
====
I just created this when I was learning to create a node module. I've seen several apps backed by mongodb which provide a gui where dumping your json object stored in the database is a common need. This means everyone who writes one of those things is implementing their own version of json to html convertor. I had to do it while creating MongoMan. This is really just an attempt to provide something that works out of the box when someone needs do json to html conversion.


Contributing
=============
Pull Requests welcome!

License
========
Copyright © 2014 Hrishikesh S

json-htmlize is licensed under the <a href="http://www.opensource.org/licenses/MIT">MIT License</a>.
