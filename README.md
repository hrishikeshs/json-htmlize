json-htmlize
============

Spits out html from your server's json response.


Installing
==========
```
npm install json-htmlize
```

Usage
=====

```
var s = require('json-htmlize');

var html = s.toHtml({name: "mongo", type: "db", type: "nosql-database"}) 
```

example
=======

```
var s = require('json-htmlize');

var html = s.toHtml({name: "mongo", type: "db", type: "nosql-database"}); 

//html is a string that looks like this:
'{<div style=\'margin-left: 30px;\'><div style=\'display: inline;\'><strong>name</strong>:  <span style=\'overflow:auto;\'>\'mongo\'</span></div>,<br /><div style=\'display: inline;\'><strong>type</strong>:  <span style=\'overflow:auto;\'>\'nosql-database\'</span></div></div>}'

var elem = document.createElement('div');

elem.innerHTML = html;

document.body.appendChild(elem); //Pretty print your json object right in the browser.

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
