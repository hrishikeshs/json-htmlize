var should = require('chai').should(),
    htmlize = require('../index');

// QuerySelector must be turned on on the specific document we're creating

describe('#generates the dom as a string for the given json', function() {
  it('returns the dom json object', function() {
    var dom = htmlize
          .toHtmlString({"name": "mongo", "type": "db", "newkey": { "foo" : "bar" } })
          .should
          .equal('<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>db</span>,</div><div style="margin-left: 30px;"><strong>newkey:  </strong><div><span>{</span><div style="margin-left: 30px;"><strong>foo:  </strong><span>bar</span></div><span>}</span></div></div><span>}</span>');
  });
});


