$(function() {

    // Add smooth scrolling to all page links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (1000) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    // Add background
    $('.image-bg').each(function() {
        $(this).parent().css('background-image', 'url("' + $(this).attr('src') + '")')
    })

    // Show or hide navbar when page is scrolled

    var lastScrollTop = 0; // Variable to store scroll position

    $(window).scroll(function() {

        if ($(window).scrollTop() > $(window).height()) {

            $(".header").addClass("fixed");

            if ($(window).scrollTop() > lastScrollTop) {
                // Scrolling Down
                $(".header").addClass("hide");
            } else {
                // Scrolling Up
                $(".header").removeClass("hide");
            }

        } else {
            $(".header").removeClass("fixed hide");
        }

        // Save ScrollTop
        lastScrollTop = $(window).scrollTop();

    });

    $("#menu-button").click(function() {
        $("body").toggleClass("menu-triggered");
    });

    $(".nav a").click(function() {
        $("body").removeClass("menu-triggered");
    });



});