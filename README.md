json-htmlize
============

Creates an HTML representation of a JSON object, for node and browser.


Installing
==========
```
npm install --save json-htmlize
```

* Browser : no dependencies !
* node.js : `jsdom` is a dependency which you'll have to install using `npm install --save jsdom@3`.

Usage
=====

```javascript
var htmlize = require('json-htmlize');

// to DOM element
var html = htmlize.toHtmlDom({name: "mongo", type: "db", type: "nosql-database"}); 

// to string
var htmlString = htmlize.toHtmlString({name: "mongo", type: "db", type: "nosql-database"}); 
```

examples
========

```javascript
var s = require('json-htmlize');

var dom = s.toHtmlDom({name: "mongo", type: "db", type: "nosql-database"}); // returns a dom node.

document.body.appendChild(dom); // pretty print your json object right in the browser.

// you can also obtain the dom generated as a string

var htmlString = s.toHtmlString({name: "mongo", type: "db", type: "nosql-database"}); 

console.log(htmlString);
```

prints out:
```
"<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>nosql-database</span></div><span>}</span>"
```


Why?
====
I just created this when I was learning to create a node module. I've seen several apps backed by mongodb which provide a gui where dumping your json object stored in the database is a common need. This means everyone who writes one of those things is implementing their own version of json to html convertor. I had to do it while creating MongoMan. This is really just an attempt to provide something that works out of the box when someone needs do json to html conversion.


Contributing
============
Pull Requests are welcome, thank you!

You may want to create an issue first if you are not sure.

* fork
* clone
* `cd json-htmlize`
* `npm install`
* `npm test`
* (optional : start a branch)
* add tests
* add features
* send pull request https://help.github.com/articles/be-social#pull-requests


License
========
Copyright © 2014 Hrishikesh S

json-htmlize is licensed under the <a href="http://www.opensource.org/licenses/MIT">MIT License</a>.
