var should = require('chai').should(),
    htmlize = require('../index');

describe('json-htmlize', function() {

	describe('.toHtmlDom()', function() {

		it.skip('should convert provided JSON to a DOM representation', function() {
			var domElement = htmlize.toHtmlDom({"name": "mongo", "type": "db", "newkey": { "foo" : "bar" } });

			// TODO
		});

	});

	describe('.toHtmlString()', function() {

		it('should convert provided JSON to HTML as string', function() {
			var htmlAsString = htmlize.toHtmlString({"name": "mongo", "type": "db", "newkey": { "foo" : "bar" } });

			htmlAsString.should.equal('<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>db</span>,</div><div style="margin-left: 30px;"><strong>newkey:  </strong><div><span>{</span><div style="margin-left: 30px;"><strong>foo:  </strong><span>bar</span></div><span>}</span></div></div><span>}</span>');
		});

	});

});
