Babylon Grid
============

Babylon Grid is lightweight jQuery + CSS plugin for creating responsive, dynamic & customizable pinterest like grid with diferent column width support, few display mods and AJAX support. And it's faster than you ever think!

*[Test demo](http://babylongrid.marekrocks.it)*

## Instalation

Best way to install this plugin is using **Borwer** 

    $ bower install babylon-grid --save

## Usage

**You'll find all production ready files in dist/ folder**

Include jQuery

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>


Include plugin

    <script type="text/javascript" src="js/jquery.babylongrid.min.js"></script>

Include plugin CSS:

    <link rel="stylesheet" href="css/babylongrid-default.css">

Or import plugin SCSS to your sass files:

    @import "sass/babylongrid-default";

Init plugin on element:

    <div id="babylongrid">
        <article>
            First article
        </article>
        <article>
            Second article
        </article>
        <article>
            Third article
        </article>
        <article>
            Fourth article
        </article>
        <article>
            Fifth article
        </article>
    <script type="text/javascript">
        (function($) {
            $('#babylongrid').babylongrid();
        },(jQuery));
    </script>

## Setting scheme

You can set custom scheme throught `scheme` parameter start from largest screen to smallest one.

    $('#babylongrid').babylongrid({
       scheme: [
                   {
                       minWidth: 960,
                       columns: 3
                   },
                   {
                       minWidth: 400,
                       columns: 2
                   },
                   {
                       minWidth: 0,
                       columns: 1
                   }
               ]
    });

And define columns sizes for every scheme using SASS or CSS (example in SCSS) *unecessary if you're using default styles without custom grind configuration*:

     .babylongrid-container {

        // For columns layout
        &.container-4 {
            .column-1, .column-3 {
                width: 30%;
            }
            .column-2, .column-4 {
                width: 20%;
            }
        }

        // Three columns layout
        &.container-3 {
            .column-1, .column-2 {
                width: 35%;
            }
            .column-3 {
                width: 30%;
            }
        }

        // Two columns layout
        &.container-2 {
            .column-1 {
                width: 60%;
            }
            .column-2 {
                width: 40%;
            }
        }

        // One columns layout
        &.container-1 {
            .column-1 {
                width: 100%;
            }
        }
    }

## Force redraw grid

fire `babylongrid:resize` event on element

    $('#babylongrid').trigger('babylongrid:resize')

## Ajax support

add new content to element where grid was initialized and trigger `babylongrid:load` event on this element.

    // init grid
    $('#babylongrid').babylongrid();

    // add new load new content
    // This should be done in AJAX callback
    $('#babylongrid').append('<article>Hello, I'm new here</atricle>');

    // trigger event to load new article to grid
    // This should also be done in AJAX callback right after new element is added to DOM
    $('#babylongrid').trigger('babylongrid:load');


## Other parameters

* `firstToRight:` true/false, // default: false; move first article to last column
* `display:` 'tower'/'city', // default: null; Set vertical align to bottom or center
* `heightDivisor:` [number], // default: 50; Article height divisor. For disable set 1;
* `afterRender`: function, // callback after rendering is done

## Uniform Grid Generator

Simple component that allow you quickly generate Babylon Grid's css for your custom grid scheme using SASS.

* Open `sass/_uniformgrid.generator.scss`
* Edit `$scheme` variable => each value is number of columns in each scheme
* Use Sass `@import 'uniformgrid.generator' or compilate SCSS straight to CSS

## Optimalization

**It's important to load all images before initializing plugin (images sizes have effect on article height).**
To prevent page skiping from default layout to Babylon's you can set container element to `visibility: hidden;` in your CSS.
Plugin itself test if container element is hidden a set it to visible right after whole layout is ternatively you can init plugin on page load and then force redrawing on instace via event. See

**Alternatively you can init plugin on page load and then force redrawing on instace via event. See above `Force redraw grid`.**

## TODO

* [x] Add bower support
* [x] Separate `source` and `distributions/builds`
* [x] Automate tasks with `grunt`, `gulp` or `broccoli`
* [x] Ajax support (for infinit scroll)

## Licence
MIT
