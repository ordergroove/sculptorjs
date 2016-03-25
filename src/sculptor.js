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
                dom.addClass(customOption, 'sculptor-option');
                // put text content in custom option
                customOption.innerHTML = option.innerHTML;

                // set attr, custom properties and content
                if (option.disabled) {
                    customOption.setAttribute('data-value', 'disabled');
                } else {
                    if (option.style) {
                        customOption.setAttribute('style', option.style);
                    }
                    customOption.setAttribute('data-value', option.value);
                    customOption.setAttribute('data-value-index', i);
                    customOption.__originalDropdown__ = select;
                    customOption.__customDropdown__ = customElement;

                    if (option.selected) {
                        customElement.setAttribute('data-value', option.innerHTML);
                    }
                }

                // emulate change event and append element
                dom.addEvent(customOption, 'click', _onValueChange);
                ul.appendChild(customOption);
            }

            return customElement;
        }
    }

    /**
     * event triggered when value changes on custom select
     * @method _onValueChange
     */
    function _onValueChange(e) {
        var target = dom.getEventTarget(e),
            value = target.getAttribute('data-value'),
            valueIndex = target.getAttribute('data-value-index'),
            select = target.__originalDropdown__,
            custom = target.__customDropdown__,
            selected = dom.$('.sculptor-option-selected', custom)[0];

        if (value === 'disabled') {
            return;
        }

        // trigger real select change
        select.selectedIndex = valueIndex;
        dom.trigger(select, 'change');

        // remove selected class to previous option element
        if (selected) {
            dom.removeClass(selected, 'sculptor-option-selected');
        }

        custom.setAttribute('data-value', target.innerHTML);
        dom.addClass(target, 'sculptor-option-selected');
        dom.removeClass(custom, 'sculptor-dropdown-opened');
    }

    /**
     * closes custom dropdown removing opened class
     * @method _closeDropdown
     */
    function _closeDropdown() {
        /* jshint validthis:true */
        var me = this;
        dom.removeClass(me, 'sculptor-dropdown-opened');
    }

    /**
     * toggles special open class on select element
     * @method _toggleDropdown
     */
    function _toggleDropdown(e) {
        var target = dom.getEventTarget(e);

        // avoid toggle class over option elements
        if (target.__customDropdown__) {
            return;
        }

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
        // prevent window key propagation if
        // up arrow or down arrow are pressed
        if (e.which === 40 || e.which === 38) {
            dom.preventDefault(e);
            dom.stopPropagation(e);
        }

        var el = dom.getEventTarget(e),
            currentOption = dom.$('.sculptor-option-selected', el)[0] || dom.$('li', el)[0];

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

            if (custom) {
                // hide original select
                dom.setCssProperty(select, 'display', 'none', 'important');

                // get classes from original select
                if (select.className !== '') {
                    dom.addClass(custom, select.className.split(/\s+/));
                }

                // insert custom element and bind events
                select.parentNode.insertBefore(custom, select);

                dom.addEvent(custom, 'click', _toggleDropdown);
                dom.addEvent(custom, 'mouseleave', _closeDropdown);
                dom.addEvent(custom, 'keydown', _keyNavigation);

                // set selected class
                var defaultOptionSelector = select.value ? '[data-value="' + select.value + '"]' : 'li',
                    defaultOption = dom.$(defaultOptionSelector, custom)[0];

                if (defaultOption) {
                    dom.addClass(defaultOption, 'sculptor-option-selected');
                }
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