(function(doc) {
    'use strict';

    var sculptor = require('../src/sculptor'),
        dom = require('pocket-dom');

    describe('sculptor', function() {
        describe('custom element creation', function() {
            var sel;
            beforeEach(function() {
                sel = doc.createElement('select');
                sel.innerHTML = '<option value="1">one</option>' +
                    '<option value="2">two</option>' +
                    '<option value="3">three</option>';
                dom.setCssProperty(sel, 'display', 'block', 'important');
                doc.body.appendChild(sel);
            });
            afterEach(function() {
                doc.body.innerHTML = '';
                sel = null;
            });
            it('contains list with options', function() {
                sculptor.init([ sel ]);

                var custom = dom.$('.sculptor-dropdown')[0];

                expect(custom.nodeType).toBe(1);
                expect(custom.getElementsByTagName('ul').length).toBe(1);
                expect(custom.getElementsByTagName('li').length).toBe(3);
            });
            it('hides original select', function() {
                sculptor.init([ sel ]);

                expect(document.getElementsByTagName('select')[0].style.display).toBe('none');
            });
            it('custom list contains correct text and respect order', function() {
                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                expect(custom.getElementsByTagName('li')[0].innerHTML).toBe('one');
                expect(custom.getElementsByTagName('li')[1].innerHTML).toBe('two');
                expect(custom.getElementsByTagName('li')[2].innerHTML).toBe('three');
            });
            it('first option placed as default', function() {
                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                expect(custom.getAttribute('data-value')).toBe('one');
            });
            it('shows selected option as default', function() {
                sel[1].selected = true;

                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                expect(custom.getAttribute('data-value')).toBe('two');
            });
            it('custom elements data-value(s) matches option values', function() {
                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                expect(sel[0].value === dom.$('li', custom)[0].getAttribute('data-value')).toBe(true);
                expect(sel[1].value === dom.$('li', custom)[1].getAttribute('data-value')).toBe(true);
                expect(sel[2].value === dom.$('li', custom)[2].getAttribute('data-value')).toBe(true);
            });
            it('specifies disabled value on data attribute in options', function() {
                sel[1].disabled = true;

                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                expect(dom.$('li', custom)[1].getAttribute('data-value')).toBe('disabled');
            });
            it('inserts select classes in custom element', function() {
                sel.className = 'oneClass twoClass';

                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                expect(dom.hasClass(custom, 'oneClass')).toBe(true);
                expect(dom.hasClass(custom, 'twoClass')).toBe(true);
            });
            it('no extra classes in custom element', function() {
                sculptor.init([ sel ]);
                var custom = dom.$('.sculptor-dropdown')[0];

                // contains only the sculptor-dropdown class
                expect(custom.className).toBe('sculptor-dropdown');
            });
            it('doesn\'t throw an error with empty arrays', function() {
                sculptor.init([]);

                expect(true).toBe(true);
            });
        });
    });
})(document);