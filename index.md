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
        <li class="sculptor-option">choose a color</li>
        <li class="sculptor-option">blue</li>
        <li class="sculptor-option sculptor-option-selected">green</li>
        <li class="sculptor-option">red</li>
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

        <select class="custom-select months-sample-dropdown">
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9" selected>September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </div>
</div>

If the original ```select``` element contains special classes, **sculptor** will add them to the new custom element so you can put target them and put special styles.


<div id="sculptures"></div>

## Sculptures

If you don't wanna spend a lot of time styling and tweaking the new generated elements we have a tool for you inside our repository that will make things a lot easier.

The first thing you'll need is to <a href="https://github.com/ordergroove/sculptorjs" target="_blank">fork the project on Github</a> and <a href="www.gulpjs.com" target="_blank">Gulp</a> installed in your terminal.

*You can also make this work inside the node module folder.*

In your IDE open the project folder and you will find two **LESS** files.

Inside **sculptor_variables.less** you will be able to configure some specific stuff about the custom dropdown, we will take care of all the adjustments and metric changes to make it work.

```css
// background color of main element and options
// value: css valid color
// default: white
@background-color: white;

// width of main element and options borders
// value: number of pixels
// default: 1px
@border-width: 1px;

// border color of main element and options
// value: css valid color
// default: black
@border-color: black;

// amount of pixels in dropdown corners' radius
// value: number of pixels
// default: 0
@rounded: 0;

// symbol on the right of the dropdown
// value: valid css content character
// default: '\25BC' 
@symbol: '\25BC';

// position options will be seen when opened
// value: top, bottom, left, right
// defaut: bottom
@options-position: bottom;
```

You might have noticed that you can also change the direction where the options are opened, we suggest you make this particular changes here like border widths and radius because there could be some compromises to make it work properly, but we already took care of them for you.

After that, you can go to **sculptor_custom.less** where you'll find a blank file with selectors you can fill with your own styles and build the custom dropdown you are looking for.

```css
.sculptor-dropdown {
    // CUSTOM STYLES
    // style for main element

    .sculptor-dropdown-options {
        // styles for options container
 
        li {
            // style for options

            &:hover {
                // style for options when hovered                
            }
        }
    }

    &:before {
        // styles for current value in main element
    }

    &:after {
        // styles for symbol
    }

    &.sculptor-dropdown-opened {
        // styles for main element when options are opened

        .sculptor-dropdown-options {
            // styles for options when they are opened
        }
    }
}
```

When you're finish go to your terminal and run **gulp build --sculpt &lt;SCULPTURE_NAME&gt;** and **.css** file with the sculpture name you choose will appear in a **sculptures** folder so you can grab it and use it in your project.

Let's do a quick example.

```css
// background color of main element and options
// value: css valid color
// default: white
@background-color: #607D8B;

// width of main element and options borders
// value: number of pixels
// default: 1px
@border-width: 0;

// border color of main element and options
// value: css valid color
// default: black
@border-color: black;

// amount of pixels in dropdown corners' radius
// value: number of pixels
// default: 0
@rounded: 0;

// symbol on the right of the dropdown
// value: valid css content character
// default: '\25BC' 
@symbol: '\25BC';

// position options will be seen when opened
// value: top, bottom, left, right
// defaut: bottom
@options-position: right;
```

```css
.sculptor-dropdown {
    color: #ffffff;
    width:125px;

    &:after {
        right: 5px;
    }

    .sculptor-dropdown-options {
 
        li {
            padding: 7px;

            &:hover {
                font-weight: 600;
            }
        }
    }

    &.sculptor-dropdown-opened {
        
        &:after {
            transform: rotate(-45deg);
        }
    }
}
```

```bash
gulp build --sculpt sample
```

Result.

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

        <select class="custom-select right-arrow-dropdown">
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9" selected>September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
        </select>
    </div>
</div>

You can put more complex styles in the second **.less** file and create really good looking custom select, andyou can create as many sculptures as you want.

```css
// background color of main element and options
// value: css valid color
// default: white
@background-color: #03A9F4;

// width of main element and options borders
// value: number of pixels
// default: 1px
@border-width: 0px;

// border color of main element and options
// value: css valid color
// default: black
@border-color: black;

// amount of pixels in dropdown corners' radius
// value: number of pixels
// default: 0
@rounded: 14px;

// symbol on the right of the dropdown
// value: valid css content character
// default: '\25BC' 
@symbol: '\25BC';

// position options will be seen when opened
// value: top, bottom, left, right
// defaut: bottom
@options-position: bottom;
```

```css
.sculptor-dropdown {
    color: #fff;
    padding-left: 10px;
    padding-right: 25px;
    text-transform: uppercase;
    width: 200px;

    .sculptor-dropdown-options {
        // styles for options container
 
        li {
            padding: 5px 10px;
            transition: all .15s ease;

            &:hover {
                background: #0288D1;
                padding-left: 20px;
            }
        }
    }

    &:after {
        right: 10px;
    }

    &.sculptor-dropdown-opened {

        .sculptor-dropdown-options {
            padding: 7px 0 12px;
        }
    }
}
```

```bash
gulp build --sculpt countries
```

Result.

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

        <select class="custom-select country-dropdown">
            <option value="ar">Argentina</option>
            <option value="br">Brazil</option>
            <option value="de">Germany</option>
            <option value="ru">Russia</option>
            <option value="us">United States</option>
        </select>
    </div>
</div>

The custom dropdowns generated by **sculptorJS** are accessible through tabbing and its value can be change with key arrows as a normal select.

<nav>
    <div class="row">
        <a class="nav-logo" href="#home">
            <img src="{{ site.baseurl }}/assets/img/logo_nav.png" alt="sculptorJS">
        </a>
        <a class="nav-link" href="#install">Install</a>
        <a class="nav-link" href="#use">Use</a>
        <a class="nav-link" href="#styling">Styling</a>
        <a class="nav-link" href="#sculptures">Sculptures</a>
    </div>
</nav>
