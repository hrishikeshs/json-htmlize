var htmlize = require('../index');
var assert = require('node:assert').strict;

describe('json-htmlize', function () {
  describe('.toHtmlDom()', function () {
    it('should convert provided JSON to a DOM representation', function () {
      var domElement = htmlize.toHtmlDom({
        name: 'mongo',
        type: 'db',
        newkey: { foo: 'bar' },
      });
      var htmlDomElementAsString = domElement.innerHTML;
      // asserting that the dom element returned has the innerHTML we expect is enough
      assert.deepEqual(
        htmlDomElementAsString,
        '<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>db</span>,</div><div style="margin-left: 30px;"><strong>newkey:  </strong><div><span>{</span><div style="margin-left: 30px;"><strong>foo:  </strong><span>bar</span></div><span>}</span></div></div><span>}</span>'
      );
    });
  });

  describe('.toHtmlString()', function () {
    it('should convert provided JSON to HTML as string', function () {
      var htmlAsString = htmlize.toHtmlString({
        name: 'mongo',
        type: 'db',
        newkey: { foo: 'bar' },
      });

      assert.strictEqual(
        htmlAsString,
        '<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>db</span>,</div><div style="margin-left: 30px;"><strong>newkey:  </strong><div><span>{</span><div style="margin-left: 30px;"><strong>foo:  </strong><span>bar</span></div><span>}</span></div></div><span>}</span>'
      );
    });
  });

  describe('.toHtmlString handles undefined and null values correctly', function () {
    it('should convert provided JSON to HTML as string', function () {
      var htmlAsString = htmlize.toHtmlString({
        name: 'mongo',
        type: 'db',
        newkey: { foo: 'bar' },
        keyWithNull: null,
        keyWithUndefined: undefined,
      });

      assert.strictEqual(
        htmlAsString,
        '<span>{</span><div style="margin-left: 30px;"><strong>name:  </strong><span>mongo</span>,</div><div style="margin-left: 30px;"><strong>type:  </strong><span>db</span>,</div><div style="margin-left: 30px;"><strong>newkey:  </strong><div><span>{</span><div style="margin-left: 30px;"><strong>foo:  </strong><span>bar</span></div><span>}</span></div>,</div><div style="margin-left: 30px;"><strong>keyWithNull:  </strong><span>null</span>,</div><div style="margin-left: 30px;"><strong>keyWithUndefined:  </strong><span>undefined</span></div><span>}</span>'
      );
    });
  });
});
