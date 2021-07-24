/** 
 * ===================================================================
 * Main js
 *
 * ------------------------------------------------------------------- 
 */ 

(function($) {

    "use strict";

    /* --------------------------------------------------- */
    /* Preloader
    ------------------------------------------------------ */ 
    $(window).load(function() {
        // will first fade out the loading animation 
        $("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      }); 
})

    /*---------------------------------------------------- */
    /* FitVids
    ------------------------------------------------------ */ 
    $(".fluid-video-wrapper").fitVids();

    /* --------------------------------------------------- */
    /*  Particle JS
    ------------------------------------------------------ */
    $('.home-particles').particleground({
        dotColor: '#fff',
        lineColor: '#555555',
        particleRadius: 6,
        curveLines: true,
        density: 10000,
        proximity: 110
    }); 

    /*-----------------------------------------------------*/
    /* tabs
    -------------------------------------------------------*/    
    $(".tab-content").hide();
    $(".tab-content").first().show();

    $("ul.tabs li").click(function () {
        $("ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".tab-content").hide();
        var activeTab = $(this).attr("data-id");
        $("#" + activeTab).fadeIn(700);
    });

    /*----------------------------------------------------*/
    /* Smooth Scrolling
    ------------------------------------------------------*/
    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });
    });

    /*---------------------------------------------------- */
    /*    contact form
    ------------------------------------------------------ */

    /* local validation */
    $('#contactForm').validate({

    /* submit via ajax */
    submitHandler: function(form) {

        var sLoader = $('#submit-loader');

        $.ajax({
            type: "POST",
            url: "inc/sendEmail.php",
            data: $(form).serialize(),
            beforeSend: function() { 

            sLoader.fadeIn(); 

        }, success: function(msg) {
            // Message was sent
            if (msg == 'OK') {
                sLoader.fadeOut(); 
                $('#message-warning').hide();
                $('#contactForm').fadeOut();
                $('#message-success').fadeIn();   
            }
            // There was an error
            else {
                sLoader.fadeOut(); 
                $('#message-warning').html(msg);
                $('#message-warning').fadeIn();
            }

        }, error: function() {
            sLoader.fadeOut(); 
            $('#message-warning').html("Bir şeyler yanlış gitti. Lütfen tekrar deneyin.");
            $('#message-warning').fadeIn();
        }

    });             
  }
});    
 
})(jQuery);
