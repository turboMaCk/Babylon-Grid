/*
 *  Project: Babylon Grid
 *  Version: 1.1
 *  Description: Lightweight jQuery + CSS plugin for creating responsive, dynamic & customizable pinterest like grid with diferent colun width support and few display mods.
 *  Author: Marek Fajkus @turbo_MaCk (http://marekrocks.it)
 *  License: MIT
 */

;(function ( $, window, undefined ) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than globals
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'babylongrid',
            defaults = {
                scheme: [
                    {
                        minWidth: 960,
                        columns: 4
                    },
                    {
                        minWidth: 720,
                        columns: 3
                    },
                    {
                        minWidth: 550,
                        columns: 2
                    },
                    {
                        minWidth: 0,
                        columns: 1
                    }
                ],
                display: null,
                firstToRight: false,
                heightDivisor: 50,
            };

    // The actual plugin constructor
    var Plugin = function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and the options via the instance,
            // e.g., this.element and this.options

            // Store this in var for changing context
            var $plugin = this; // well I don't like this very much, but we need to change context, right?

            // Inner wrap element with grid container
            $(this.element).wrapInner('<div class="babylongrid-container" />');

            // Cashe Elements
            this.casheElements();

            // Start plugin on load
            this._setGrid();

            // Responzive on window resize
            $(window).resize(function() {
                $plugin._setGrid();
            });
        },
        /*
        Cash elements
        */
        casheElements: function() {
            var $element = $(this.element),
                $container = $element.children('.babylongrid-container'),
                $articles = $container.children();

            this.cashed = {
                'element': $element,
                'container': $container,
                'articles': $articles
            };
        },
        /*
        Set Grid
        */
        _setGrid: function() {
            var $container = this.cashed.container,
                containerWidth = $container.width(),
                containerClass,
                columns,
                $plugin = this; // well I don't like this very much, but we need to change context, right?

            // loop options and set container class
            $.each( this.options.scheme, function() {
                if ( this.minWidth <= containerWidth ) {
                    columns = this.columns;
                    containerClass = 'container-'+columns;

                    // check if container have to change class
                    if ( !$container.hasClass(containerClass) ) {

                        // reset container classes
                        $container
                            .removeClass()
                            .addClass('babylongrid-container')
                            .addClass(containerClass);

                        // time to set columns
                        $plugin._setColumns(columns);
                    }

                    return false;
                }
            });

        },
        /*
        Set Columns
        */
        _setColumns: function(columns) {
            var $container = this.cashed.container,
                column;

            // remove old columns
            $container.children('.column').remove();

            // generate new columns
            for ( var i = 1; i <= columns; i++ ) {
                column = '<div class="column column-' + i +'"></div>';

                // apend new columns
                $container.append(column);
            }

            // set default height
            $container.children('.column').data('height',0);

            // now we can start adding articles into columns
            this._organizeArticles(columns);
        },
        /*
        Organize Articles
        */
        _organizeArticles: function(columns) {
            var $articles = this.cashed.articles,
                $article,
                $container = this.cashed.container,
                $columns = $container.children('.column'),
                minColumnHeight = $columns.data('height') + 1,
                $lowColumn,
                columnHeight,
                $oldLowColumn,
                $plugin = this; // well I don't like this very much, but we need to change context, right?

            // Disable TOWER / CITY DISPLAY while procesing
            if ( $plugin.options.display ) {
                $container
                    .removeClass('tower')
                    .removeClass('city');
            }

            // First to Right side
            if ( $plugin.options.firstToRight ) {

                // Just simple trik => set last column to be lower:-)
                $columns.filter('.column-' + columns).data('height', -1);
            }

            // loop throught articles
            $.each($articles, function(count) {

                // store actual article into variable
                $article = $(this);

                // loop throught columns
                $.each( $columns, function(i) {

                    // we are loking for lowest column
                    if ( $(this).data('height') < minColumnHeight ) {
                        minColumnHeight = $(this).data('height');
                        $lowColumn = $(this);
                    }

                    // if height of all columns is checked
                    if ( i + 1 >= columns ) {

                        // add article to lowest one
                        $lowColumn.append($article);

                        // set article height
                        if ($plugin.options.heightDivisor > 1) {
                            $plugin._setArticleHeight($article);
                        }

                        // store columnHeight into data
                        columnHeight = $lowColumn.outerHeight(true);
                        $lowColumn.data('height', columnHeight);

                        // store new height of column into minColumnHeight
                        // + 1 is trick to fixing uniform column height
                        minColumnHeight = columnHeight + 1;

                        // store column to oldColumn
                        $oldLowColumn = $lowColumn;
                    }
                });

                // ENABLE TOWER / CITY DISPLAY
                if ( $plugin.options.display ) {
                    if ( count+1 === $articles.length ) {
                        if ( $plugin.options.display === 'tower' ) {
                            $container.addClass('tower');
                        } else if ( $plugin.options.display === 'city' ) {
                            $container.addClass('city');
                        }
                    }
                }
            });
        },
        /*
        Set Article Height
        */
        _setArticleHeight: function($article) {
            var divisor = this.options.heightDivisor,
                height = $article.height(),
                difference = height%divisor;

            if ( difference > 0 ) {
                $article.height(height+divisor-difference);
            }
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}(jQuery, window));