angular.module("myctrl");
.directive('tableHeaderAtTop', ['$window', '$compile', function ($window, $compile) {
var $win = angular.element($window);
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var $this = $(element),
                    $parentTable = $this.parent(),
                    $t_fixed;

                function init() {
                    var $root = $parentTable.parent();
                    if ($('.fixedHeader', $root).length == 0) {
                        $t_fixed = $('<div class="fixedHeader bg-light">' +
                            '<div class="fixedHeaderWrap">' +
                                '<table class="fixedTable"><thead></thead></table>' +
                            '</div></div>');

                        $parentTable.parent().prepend($t_fixed);
                    }
                }

                function resizeFixed() {
                    if ($('.fixedTable thead', $t_fixed).length == 0) {
                        $('.fixedTable', $t_fixed).append($compile($this.clone())(scope));
                        $('.fixedHeaderWrap', $t_fixed).width($parentTable.parent().width());
                        $('.fixedTable', $t_fixed).width($parentTable.width());

                        $('.fixedTable thead tr th', $t_fixed).each(function (index) {
                            var regularTH = $('tr th', $this)[index];
                            $(this).css('width', $(regularTH).outerWidth() + "px");

                            $(this).css('padding', $(regularTH).css('padding'));
                            $(this).css('border', $(regularTH).css('border'));
                        });
                    }
                }

                function scrollFixed() {
                    if ($t_fixed.length > 0) {
                        var offset = $win.scrollTop();
                        var tableOffset = $this.offset().top;

                        if ($win.scrollTop() >= tableOffset) {
                            resizeFixed();
                            $t_fixed.show();
                            $parentTable.parent().bind('scroll', function (event) {
                                var hzp = $(this).scrollLeft();
                                $('.fixedTable', $t_fixed).css('margin-left', -1 * hzp);
                            });
                        }
                        else {
                            $t_fixed.hide();
                            $this.parent().unbind('scroll');
                            $('.fixedTable').html('');
                        }
                    }
                }

                init();
                $win.resize(resizeFixed);
                $win.scroll(scrollFixed);
            }
        };
    }])
