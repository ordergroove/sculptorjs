# Sculptor JS
[![Build Status](https://travis-ci.org/ordergroove/sculptorjs.svg)](https://travis-ci.org/ordergroove/sculptorjs)

## What Is Sculptor JS
Sculptor JS allows you to easily 'sculpt' beautiful html dropdowns that look the same across all browsers with just CSS.
The library is very lightweight and is intended to be a quick way for you to get custom styled dropdowns on a page.
This is accomplished with the age old practice of creating custom html elements on top of existing native select
controls and then feeding the user interaction back to those native elements.

## What Sculptor JS Is Not
It is not at this point in time intended as your go-to for cross-browser styling of all native html elements.
It is not a jack of all trades and will only style drop-downs that it is specifically told to style.

# Installation Instructions

Sculptor JS can be installed using NPM or by cloning the repository and including the compiled js file in your website.

# NPM

First you have to install the tool itself (which comes bundled with dependencies)
````
npm install sculptorjs
````

### Javascript Example
``` javascript
// Just a closure
(function (w, doc) {
    "use strict"
    var myAgeSelector,
        sculptor = require("sculptorjs"); // browserify require of sculptorjs

    // On window load, get the select element that I would like to style and pass it into sculptor
    w.onload = function () {
        var myAgeSelector = doc.getElementById("age-selector");
        sculptor.init([myAgeSelector]); // Notice that an array is required even for a single element - [myAgeSelector]
    }

}(window, document));
```

# Non-NPM

First you have to clone the repo
````
git clone git@github.com:ordergroove/sculptorjs.git
````

## Example Usage in a NPM Project

### HTML
``` html
<!DOCTYPE html>
<html>
    <head>
        <title>My Page</title>
        <!-- Include Sculptor JS and Base CSS files -->
        <script src="node_modules/sculptorjs/dist/sculptor.js" type="text/javascript"></script>
        <link rel="stylesheet" href="node_modules/sculptor/dist/sculptor.css" type="text/css"/>
    </head>
    <body>
        <select id="age-selector" name="age">
            <option value="1">One</option>
            <option value="2">Two</option>
        </select>
    </body>
</html>
    
```
### Javascript
``` javascript
// Just a closure
(function (w, doc) {
    "use strict"
    var myAgeSelector;

    // On window load, get the select element that I would like to style and pass it into sculptor
    w.onload = function () {
        myAgeSelector = doc.getElementById("age-selector");
        sculptor.init([myAgeSelector]); // Notice that an array is required even for a single element - [myAgeSelector]
    }

}(window, document));
```

## Required Base CSS
After Sculptor JS is installed, please reference the base css in your page. This can be as simple as copy/pasting
the css in node_modules/sculptorjs/dist/sculptor.css to your existing stylesheets or referencing the file directly.

NOTE: If you're running with LESS then please feel free to @import "node_modules/sculptorjs/src/sculptor.less"

## Make Sure It's Working
Load up your HTML page in your favorite browser and you should no longer be seeing the native select elements
but their Sculptor JS counterparts.

