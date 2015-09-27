/*
 *  Project: Babylon Grid
 *  Version: 2.1
 *  Description: Lightweight jQuery + CSS plugin for creating responsive, dynamic & customizable pinterest like grid with diferent colun width support and few display mods.
 *  Author: Marek Fajkus @turbo_MaCk (http://marekrocks.it)
 *  License: MIT
 */

;(function ( $, window, undefined ) {

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
                heightDivisor: 25,
                afterRender: null
            };

    // The actual plugin constructor
    var Plugin = function Plugin( element, options ) {
        this.element = element;

        // extend defaults with options
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    };

    Plugin.prototype = {
        init: function () {

            // Store this in var for changing context
            var self = this;

            // Inner wrap element with grid container
            $(this.element).wrapInner('<div class="babylongrid-container" />');

            // Cache Elements
            this.cacheElements();

            // Start plugin on load
            this._setGrid();

            // Responzive on window resize
            $(window).resize(function() {
                self._setGrid();
            });

            $(this.element).on('babylongrid:resize', function() {
                self._setGrid();
            });

            $(this.element).on('babylongrid:load', function() {
                self._loadNewArticles();
            });
        },
        /*
         Load New articles
         */
        _loadNewArticles: function() {
            var self = this;
            var newArticles = $(this.element).children().not('.babylongrid-container');

            newArticles.each(function() {
                self.cached.articles.push(this);
            });

            self._setColumns(self.__currentColumns);
        },
        /*
        Cache elements
        */
        cacheElements: function() {
            var $element = $(this.element),
                $container = $element.children('.babylongrid-container'),
                $articles = $container.children();

            this.cached = {
                'element': $element,
                'container': $container,
                'articles': $articles
            };
        },
        /*
        Set Grid
        */
        _setGrid: function() {
            var $container = this.cached.container,
                containerWidth = $container.width(),
                containerClass,
                columns,
                self = this;

            // loop options and set container class
            $.each( this.options.scheme, function() {

                if ( this.minWidth <= containerWidth ) {
                    columns = this.columns;
                    containerClass = 'container-' + columns;

                    // check if container's class has to be change changed
                    if ( !$container.hasClass(containerClass) ) {

                        // reset container classes
                        $container
                            .removeClass()
                            .addClass('babylongrid-container')
                            .addClass(containerClass);

                        // store current columns
                        self.__currentColumns = columns;

                        // time to set columns
                        self._setColumns(columns);
                    } else {
                        self._resizeArticles();
                    }

                    return false;
                }
            });

            if (this.options.afterRender) {
                this.options.afterRender();
            }
        },
        /*
        Set Columns
        */
        _setColumns: function(columns) {
            var $container = this.cached.container,
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
            var $articles = this.cached.articles,
                $article,
                $container = this.cached.container,
                $columns = $container.children('.column'),
                minColumnHeight = $columns.data('height') + 1,
                $lowColumn,
                columnHeight,
                $oldLowColumn,
                self = this;

            // Disable TOWER / CITY DISPLAY while procesing
            if ( this.options.display ) {
                $container
                    .removeClass('tower')
                    .removeClass('city');
            }

            // First to Right side
            if ( this.options.firstToRight ) {

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
                        if (self.options.heightDivisor > 1) {
                            self._setArticleHeight($article);
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

                // Right before whole grid is set
                if ( count+1 === $articles.length ) {

                    // show article if they are hidden by default
                    if ( self.cached.element.css('visibility') === 'hidden' ) {
                        self.cached.element.css('visibility', 'visible');
                    }

                    // ENABLE TOWER / CITY DISPLAY
                    if ( self.options.display ) {
                        if ( self.options.display === 'tower' ) {
                            $container.addClass('tower');
                        } else if ( self.options.display === 'city' ) {
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
            // remove inline style before storing values into variables
            $article.removeAttr('style');

            var divisor = this.options.heightDivisor,
                height = $article.height(),
                difference = height%divisor;

            if ( difference > 0 ) {
                $article.height(height+divisor-difference);
            }
        },
        /*
        Change just articles height
        */
        _resizeArticles: function() {
            var self = this;

            // Loop articles and set them height
            $.each(this.cached.articles, function() {
                self._setArticleHeight($(this));
            });
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
