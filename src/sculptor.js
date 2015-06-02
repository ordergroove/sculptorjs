(function(doc) {
    'use strict';

    var dom = require('pocket-dom');

    /**
     * builds a custom element from a select
     * @method _buildElement
     * @params {node} select
     * @returns {node|null}
     */

    function _buildElement(select) {
        var customElement,
            option,
            ul,
            customOption,
            len = select.length;

        // starts only if select has options
        if (len > 0) {
            // generate element
            customElement = doc.createElement('div');
            customElement.setAttribute('tabindex', '0');
            dom.addClass(customElement, 'sculptor-dropdown');

            ul = document.createElement('ul');
            dom.addClass(ul, 'sculptor-dropdown-options');

            customElement.appendChild(ul);

            // generate li elements from options
            for (var i = 0; i < len; i++) {
                option = select[i];

                customOption = doc.createElement('li');
                // put text content in custom option
                customOption.innerHTML = option.innerHTML;

                // set attr, custom properties and content
                if (option.disabled) {
                    customOption.setAttribute('data-value', 'disabled');
                } else {
                    customOption.setAttribute('data-value', option.value);
                    customOption.__originalDropdown__ = select;
                    customOption.__customDropdown__ = customElement;

                    if (option.selected) {
                        customElement.setAttribute('data-value', option.innerHTML);
                    }
                }

                // emulate change event and append element
                dom.addEvent(customOption, 'click', _onValueChange);
                dom.$('ul', customElement)[0].appendChild(customOption);
            }

            return customElement;
        }
    }

    /**
     * event triggered when value changes on custom select
     * @method _onValueChange
     */
    function _onValueChange(e) {
        e.preventDefault();
        e.stopPropagation();

        var target = dom.getEventTarget(e),
            value = target.getAttribute('data-value'),
            select = target.__originalDropdown__,
            custom = target.__customDropdown__;

        if (value === 'disabled') {
            return;
        }

        // trigger real select change
        select.value = value;
        dom.trigger(select, 'change');

        custom.setAttribute('data-value', target.innerHTML);
        dom.removeClass(custom, 'sculptor-dropdown-opened');
    }

    /**
     * toggles special open class on select element
     * @method _toggleDropdown
     */
    function _toggleDropdown(e) {
        var target = dom.getEventTarget(e);

        if (dom.hasClass(target, 'sculptor-dropdown-opened')) {
            dom.removeClass(target, 'sculptor-dropdown-opened');
        } else {
            dom.addClass(target, 'sculptor-dropdown-opened');
        }
    }

    /**
     * control key events on custom element
     * @method _keyNavigation
     * @parameter {event} e
     */
    function _keyNavigation(e) {
        var el = dom.getEventTarget(e),
            currentValue = el.getAttribute('data-value'),
            currentOption = dom.$('[data-value="' + currentValue + '"]', el)[0];

        if (e.which === 40 && currentOption.nextSibling) {
            dom.trigger(currentOption.nextSibling, 'click');
        }

        if (e.which === 38 && currentOption.previousSibling) {
            dom.trigger(currentOption.previousSibling, 'click');
        }
    }

    /**
     * replaces select for custom ones
     * @method _initialize
     * @params {Array|NodeList} elements
     * @params {Function} _onChange
     */
    function _initialize(elements) {
        var selects = elements,
            len = selects.length,
            select,
            custom;

        while (len) {
            select = selects[--len];

            custom = _buildElement(select);

            // hide original select
            dom.setCssProperty(select, 'display', 'none', 'important');

            if (custom) {

                // get classes from original select
                if (select.className !== '') {
                    dom.addClass(custom, select.className.split(/\s+/));
                }

                // insert custom element
                select.parentNode.insertBefore(custom, select);
                dom.addEvent(custom, 'click', _toggleDropdown);
                dom.addEvent(custom, 'keydown', _keyNavigation);
            }
        }

        custom = select = len = null;
    }

    // generate factory and return
    // according to global enviroment
    var factory = {
        init: _initialize
    };

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        window.sculptor = factory;
    }
})(document);