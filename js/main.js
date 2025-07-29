!(function ($) {
    "use strict";

    var $body = $("body");

    // Handles AJAX page loading and closing
    function handleAjaxPage() {
        var $ajaxPage = $("#page-ajax-loaded");

        function showAjaxPage() {
            $ajaxPage.removeClass("fadeOutLeft closed").show();
            $body.addClass("ajax-page-visible");
        }

        // Load AJAX page if hash matches
        $(".ajax-page-load").each(function () {
            var href = $(this).attr("href");
            var hashBase = location.hash.split("/")[0] + "/" + href.substr(0, href.length - 5);
            if (location.hash === hashBase) {
                showAjaxPage();
                $ajaxPage.load(href);
                return false;
            }
        });

        // Close AJAX page
        $(document).on("click", "#ajax-page-close-button", function (e) {
            e.preventDefault();
            $ajaxPage.addClass("fadeOutLeft closed");
            $body.removeClass("ajax-page-visible");
            setTimeout(function () {
                $("#page-ajax-loaded.closed").html("");
                $ajaxPage.hide();
            }, 500);
            location.hash = location.hash.split("/")[0];
        });

        // Open AJAX page on link click
        $(document).on("click", ".ajax-page-load", function () {
            var href = $(this).attr("href");
            var hashBase = location.hash.split("/")[0] + "/" + href.substr(0, href.length - 5);
            location.hash = hashBase;
            showAjaxPage();
            return false;
        });
    }

    // Show/hide scroll-to-top button
    function handleScrollToTop() {
        if ($body.scrollTop() > 150) {
            $(".lmpixels-scroll-to-top").removeClass("hidden-btn");
        } else {
            $(".lmpixels-scroll-to-top").addClass("hidden-btn");
        }
    }

    // Document ready
    $(function () {
        // Contact form validation and AJAX submit
        $("#contact_form").validator();
        $("#contact_form").on("submit", function (e) {
            if (!e.isDefaultPrevented()) {
                $.ajax({
                    type: "POST",
                    url: "contact_form/contact_form.php",
                    data: $(this).serialize(),
                    success: function (response) {
                        var alertClass = "alert-" + response.type;
                        var message = response.message;
                        var alertHtml = '<div class="alert ' + alertClass + ' alert-dismissable">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                            message + "</div>";
                        if (alertClass && message) {
                            $("#contact_form").find(".messages").html(alertHtml);
                            $("#contact_form")[0].reset();
                        }
                    }
                });
                return false;
            }
        });
    });

    // Window load and hashchange events
    $(window)
        .on("load", function () {
            // Preloader fade out
            $(".preloader").fadeOut(800, "linear");

            var windowWidth = $(window).width();
            var animation = $("#page_container").attr("data-animation");
            var $container = $(windowWidth > 991 ? ".page-container" : ".site-main");
            $container.addClass("animated " + animation);

            $(".page-scroll").addClass("add-prespective");
            $container.addClass("transform3d");
            setTimeout(function () {
                $(".page-scroll").removeClass("add-prespective");
                $container.removeClass("transform3d");
            }, 1000);
        })
        .on("hashchange", function () {
            if (location.hash) handleAjaxPage();
        });

    // Document ready (continued)
    $(document).ready(function () {
        // Parallax background effect
        var l = 15 / $(document).height();
        var n = 15 / $(document).width();

        $body.on("mousemove", function (e) {
            var offsetX = e.pageX - $(document).width() / 2;
            var offsetY = e.pageY - $(document).height() / 2;
            var moveX = n * offsetX * -1;
            var moveY = l * offsetY * -1;
            var $bgElements;
            if ($(".page-container").hasClass("bg-move-effect")) {
                $bgElements = $(".home-photo .hp-inner:not(.without-move), .lm-animated-bg");
            } else {
                $bgElements = $(".home-photo .hp-inner:not(.without-move)");
            }
            $bgElements.addClass("transition")
                .css({ "background-position": "calc( 50% + " + moveX + "px ) calc( 50% + " + moveY + "px )" });
            setTimeout(function () {
                $bgElements.removeClass("transition");
            }, 300);
        }).scroll(function () {
            handleScrollToTop();
        });

        // Portfolio grid and filters
        var $portfolioGrid = $(".portfolio-grid");
        var $portfolioGalleryGrid = $("#portfolio-gallery-grid");
        $portfolioGalleryGrid.imagesLoaded(function () {
            $portfolioGalleryGrid.masonry();
        });
        $portfolioGrid.imagesLoaded(function () {
            $(".portfolio-content").each(function () {
                var $content = $(this);
                var contentId = $content.attr("id");
                var $grid = $("#" + contentId + " .portfolio-grid");
                var $filters = $("#" + contentId + " .portfolio-filters");
                var $filterBtns = $("#" + contentId + " .portfolio-filters .filter");
                if ($grid.length) {
                    $grid.shuffle({ speed: 450, itemSelector: "figure" });
                    $(".site-auto-menu").on("click", "a", function () {
                        $grid.shuffle("update");
                    });
                    $filters.on("click", ".filter", function (e) {
                        e.preventDefault();
                        $filterBtns.parent().removeClass("active");
                        $(this).parent().addClass("active");
                        $grid.shuffle("shuffle", $(this).attr("data-group"));
                    });
                }
            });
        });

        // Portfolio carousel
        $(".portfolio-page-carousel").each(function () {
            $(this).imagesLoaded(function () {
                $(".portfolio-page-carousel").owlCarousel({
                    smartSpeed: 1200,
                    items: 1,
                    loop: true,
                    dots: true,
                    nav: true,
                    navText: false,
                    autoHeight: true,
                    margin: 10
                });
            });
        });

        // Blog masonry
        var $blogMasonry = $(".blog-masonry");
        $blogMasonry.imagesLoaded(function () {
            $blogMasonry.masonry({ itemSelector: ".item", resize: false });
        });

        // Menu toggle
        $(".menu-toggle").on("click", function () {
            $(".site-nav").addClass("animate").toggleClass("mobile-menu-hide");
        });

        // Text rotation
        $(".text-rotation").owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 10,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: "fadeOut",
            animateIn: "fadeIn"
        });

        // Testimonials carousel
        $(".testimonials.owl-carousel").owlCarousel({
            nav: false,
            items: 3,
            loop: false,
            navText: false,
            margin: 25,
            responsive: {
                0: { items: 1 },
                480: { items: 1 },
                768: { items: 2 },
                1200: { items: 2 }
            }
        });

        // Clients carousel
        $(".clients.owl-carousel").imagesLoaded().owlCarousel({
            nav: false,
            items: 2,
            loop: false,
            navText: false,
            margin: 10,
            autoHeight: false,
            responsive: {
                0: { items: 2 },
                768: { items: 4 },
                1200: { items: 6 }
            }
        });

        // Magnific popup for images and AJAX
        $body.magnificPopup({
            fixedContentPos: false,
            delegate: "a.lightbox",
            type: "image",
            removalDelay: 300,
            mainClass: "mfp-fade",
            image: {
                titleSrc: "title",
                gallery: { enabled: true }
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="mfp-title mfp-bottom-iframe-title"></div></div>',
                patterns: {
                    youtube: { index: "youtube.com/", id: null, src: "%id%?autoplay=1" },
                    vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                    gmaps: { index: "//maps.google.", src: "%id%&output=embed" }
                },
                srcAction: "iframe_src"
            },
            callbacks: {
                markupParse: function (template, values, item) {
                    values.title = item.el.attr("title");
                }
            }
        });

        $(".ajax-page-load-link").magnificPopup({
            type: "ajax",
            removalDelay: 300,
            mainClass: "mfp-fade",
            gallery: { enabled: true }
        });

        $(".portfolio-page-wrapper .portfolio-grid").each(function () {
            $(this).magnificPopup({
                delegate: "a.gallery-lightbox",
                type: "image",
                gallery: { enabled: true }
            });
        });

        // Form control focus
        $(".form-control").val("");
        $(".form-control").on("focusin", function () {
            $(this).parent(".form-group").addClass("form-group-focus");
        });
        $(".form-control").on("focusout", function () {
            if ($(this).val().length === 0) {
                $(this).parent(".form-group").removeClass("form-group-focus");
            }
        });

        // Append AJAX page container
        $body.append(
            '<div id="page-ajax-loaded" class="page-portfolio-loaded animated fadeInLeft" style="display: none">' +
            '<div class="preloader-portfolio"><div class="preloader-animation"><div class="preloader-spinner"></div></div></div></div>'
        );

        // Initialize AJAX page handler
        handleAjaxPage();

        // Sidebar toggle
        $(".sidebar-toggle").on("click", function () {
            $("#blog-sidebar").toggleClass("open");
            $(this).toggleClass("open");
        });

        // Scroll to top
        $(".lmpixels-scroll-to-top").click(function () {
            $("body,html").animate({ scrollTop: 0 }, 400);
            return false;
        });

        // Initial scroll-to-top button state
        handleScrollToTop();

        // Skill bar widths
        var skillStyles = "";
        $(".skill-container").each(function () {
            var value = $(this).attr("data-value");
            if (value >= 101) value = "100";
            if (value !== undefined) {
                var id = $(this).attr("id");
                skillStyles += "#" + id + " .skill-percentage { width: " + value + "%; } ";
            }
        });
        $("head").append('<style data-styles="leven-theme-skills-css" type="text/css">' + skillStyles + "</style>");

        // Main menu navigation handler
        $('.site-main-menu a[href*="#"]').on('click', function(e) {
            e.preventDefault();
            var hash = this.hash;
            var elem = document.querySelector(hash);
            if (elem) {
                // Close mobile menu if open
                $(".site-nav").addClass("mobile-menu-hide");
                // Smooth native scroll
                elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        // Side navigation - use native smooth scroll
        $('.side-nav a').on('click', function(e) {
            e.preventDefault();
            var href = $(this).attr('href');
            if (href && href.indexOf('#') === 0) {
                var elem = document.querySelector(href);
                if (elem) {
                    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
})(jQuery);
