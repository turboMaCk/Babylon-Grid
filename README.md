Babylon Grid
============

Babylon Grid is lightweight jQuery + CSS plugin for creating responsive, dynamic & customizable pinterest like grid with diferent column width support and few display mods. And it's faster than you ever think!

*[Test demo](http://babylongrid.marekrocks.it)*

*[Test plugin functionality on CODEPEN](http://codepen.io/turbo_MaCk/full/GazmK)*

*You can donate this plugin via paypall if you like it. (marek.faj@gmail.com)*

## Usage


Include jQuery

    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>


Include plugin

    <script type="text/javascript" src="js/jquery.babylongrid.min.js"></script>

Include plugin CSS:

    <link rel="stylesheet" href="css/jquery.babylongrid.css">

Or import plugin SCSS to your SASS:

    @import "jquery.babylongrid";

Apply plugin method for your container element with articles inside.

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

## Setting schme

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

And define columns sizes for every sheme using SASS or CSS (example in SCSS):

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

## Other parametres

* `firstToRight:` true/false, // default: false; move first article to last column
* `display:` 'tower'/'city', // default: Nan; Set vertical align to bottom or center

## TODO:

* Article Height divisor for prevent little article height difference
* SASS uniform (all columns with same width) generator

## Licence
MIT
