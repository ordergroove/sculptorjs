---
layout: home
---

## Install

Lorem ipsum dolor sit amet, at pro facer eloquentiam, mei ad decore pericula vulputate. Ea vix postea vivendum conceptam, rebum doctus no ius.

### npm 

```bash
npm install sculptorjs --save-dev
```

## Use

```html
<select name="colors" id="colors">
    <option disabled>Choose a color</option>
    <option value="#0000f9">blue</option>
    <option value="#00f900">green</option>
    <option value="#f90000">red</option>
</select>
```

```js
sculptor.init(document.getElementById('colors'));
```

```html
<div class="sculptor-dropdown">
    <ul class="sculptor-dropdown-options">
        <li data-value="disabled"></li>
        <li data-value="#0000f9">blue</li>
        <li data-value="#00f900">green</li>
        <li data-value="#f90000">red</li>
    </ul>
</div>
```

**.sculptor-dropdown:before** pseudo-class contains the current value of the dropdown.

**.sculptor-dropdown:after** holds the symbol which you can modify changing the **content** CSS property of it.

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
