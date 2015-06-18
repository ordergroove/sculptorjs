---
layout: home
---

<div id="install"></div>

## Install

One of the ways you have to start using **sculptorjs** include the minimized distribution file in your project like this:

```html
<script src="/assets/js/sculptor.min.js"></script>
```

### npm 

If you're using **npm packages** in your build process you can also install it:

```bash
npm install sculptorjs --save-dev
```

<div id="use"></div>

## Use

As we know select elements are really hard to style, mostly if you want them to look almost identical in all browsers. This library will make things easier to you in this area.

The first thing you'll need to do is call the **init** method and pass a collection of select elements:

```js
sculptor.init(document.getElementsByClassName('custom-select'));
```

If you have just one element you can do this:

```js
sculptor.init([ document.getElementById('colors') ]);
```

The script will build a new element made with common HTML tags and hide the original select:

```html
<select id="colors" class="custom-select colors">
    <option disabled>choose a color</option>
    <option value="#0000f9">blue</option>
    <option value="#00f900" selected>green</option>
    <option value="#f90000">red</option>
</select>
```

And this will now appear in your site:

```html
<div data-value="green" class="sculptor-dropdown custom-select colors">
    <ul class="sculptor-dropdown-options">
        <li class="sculptor-option" data-value="disabled">choose a color</li>
        <li class="sculptor-option" data-value="#0000f9">blue</li>
        <li class="sculptor-option" data-value="#00f900">green</li>
        <li class="sculptor-option" data-value="#f90000">red</li>
    </ul>
</div>
```

As you see **sculptor** took care of a couple of extra things for you. All the classes you have initially in your select element were added to the sculptor one so you can identify it and make custom styling on it.

Every time the element is clicked a class called **sculptor-dropdown-opened** will toggle to indicate its state.

Also the value that was selected by default in the select is the initial value in the sculptor element and the disable one is there too.

### Pseudo elements

**.sculptor-dropdown:before** contains the current value that is being shown in the dropdown.

**.sculptor-dropdown:after** holds the symbol which you can modify changing the **content** CSS property of it.


<div id="styling"></div>

## Styling

In the distribution folder you get a CSS file that you can import in your style sheet where you can add your own rules to modify how the elements look.

```css
@import 'sculptor.css';
```

Out of the box, **sculptor** takes care of all the styles the element needs to work and look like a select element. The only thing you must add to it is a width so the content fits. Then you can override any rule to customize it.

Each element generated will have its class so you can style.

```css
.sculptor-dropdown {
    /* styles for the main element */
}

.sculptor-dropdown.sculptor-dropdown-opened {
    /* styles for the main element 
       when the options are shown */
}

.sculptor-dropdown:after {
    /* styles for the arrow */
}

.sculptor-dropdown-options {
    /* styles for the options list */
}

.sculptor-dropdown.sculptor-dropdown-opened .sculptor-dropdown-options {
    /* styles for the options list 
       when the options are shown */
}
```

<div id="examples"></div>

## Examples

<div class="inner-row row">
    <div class="column column-6">
        <h4>native select</h4>

        <select name="months" id="months">
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9" selected>September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </div>
    <div class="column column-6">
        <h4>sculptor select</h4>

        <select class="custom-select custom-months-select">
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9" selected>September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </div>
</div>

<div class="inner-row row">
    <div class="column column-6">
        <h4>native select</h4>

        <select name="country" id="country">
            <option value="ar">Argentina</option>
            <option value="br">Brazil</option>
            <option value="de">Germany</option>
            <option value="ru">Russia</option>
            <option value="us">United States</option>
        </select>
    </div>
    <div class="column column-6">
        <h4>sculptor select</h4>

        <select class="custom-select custom-country-select">
            <option value="ar">Argentina</option>
            <option value="br">Brazil</option>
            <option value="de">Germany</option>
            <option value="ru">Russia</option>
            <option value="us">United States</option>
        </select>
    </div>
</div>

<div class="inner-row row">
    <div class="column column-6">
        <h4>native select</h4>

        <select name="colors" id="colors">
            <option disabled>choose a color</option>
            <option value="#0000f9">blue</option>
            <option value="#00f900">green</option>
            <option value="#f90000">red</option>
        </select>
    </div>
    <div class="column column-6">
        <h4>sculptor select</h4>

        <select class="custom-select custom-colors-select">
            <option disabled>choose a color</option>
            <option value="#0000f9">blue</option>
            <option value="#00f900">green</option>
            <option value="#f90000">red</option>
        </select>
    </div>
</div>

<nav>
    <div class="row">
        <a class="nav-logo" href="#home">LOGO</a>
        <a class="nav-link" href="#install">Install</a>
        <a class="nav-link" href="#use">Use</a>
        <a class="nav-link" href="#styling">Styling</a>
        <a class="nav-link" href="#examples">Examples</a>
    </div>
</nav>
