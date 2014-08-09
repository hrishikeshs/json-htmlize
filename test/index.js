var should = require('chai').should(),
    htmlize = require('../index'),
    jsonToHtml= htmlize.toHtml;

describe('#htmlstring', function() {
  it('returns a html string for the given json object', function() {
    jsonToHtml({'name' : 'mongo'}).should.equal("{<div style='margin-left: 30px;'><div style='display: inline;'><strong>name</strong>:  <span style='overflow:auto;'>'mongo'</span></div></div>}");
  });
});


