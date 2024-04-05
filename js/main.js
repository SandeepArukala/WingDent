(function ($) 
{
    "use strict";

    // Spinner
    var spinner = function () 
    {
        setTimeout(function () 
        {
            if ($('#spinner').length > 0) 
            {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
        
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () 
    {
        if ($(this).scrollTop() > 40) 
        {
            $('.navbar').addClass('sticky-top');
        } 
        else 
        {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() 
    {
        if (this.matchMedia("(min-width: 992px)").matches) 
        {
            $dropdown.hover
            (
            function() 
            {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() 
            {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } 
        else 
        {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    // Back to top button
    $(window).scroll
    (function () 
        {
            if ($(this).scrollTop() > 100) 
            {
                $('.back-to-top').fadeIn('slow');
            } 
            else 
            {
                $('.back-to-top').fadeOut('slow');
            }
        }
    );
    $('.back-to-top').click
    (function () 
        {
            $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
            return false;
        }
    );

    // Date and time picker
    $('.date').datetimepicker
    (
        {
            format: 'L'
        }
    );
    $('.time').datetimepicker
    (
        {
            format: 'LT'
        }
    );

    // Image comparison
    $(".twentytwenty-container").twentytwenty
    (
        {}
    );

    // Price carousel
    $(".price-carousel").owlCarousel
    (
        {
            autoplay: true,
            smartSpeed: 1500,
            margin: 45,
            dots: false,
            loop: true,
            nav : true,
            navText : 
            [
                '<i class="bi bi-arrow-left"></i>',
                '<i class="bi bi-arrow-right"></i>'
            ],
            responsive: 
            {
                0:
                {
                    items:1
                },
                768:
                {
                    items:2
                }
            }
        }
    );

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });
    
})(jQuery);


//email sending using Emailjs
function sendMail() {
    var serviceElement = document.getElementById("services");
    var serviceOptions = serviceElement.options[serviceElement.selectedIndex];

    var doctorsElement = document.getElementById("doctors");
    var doctorsOptions = doctorsElement.options[doctorsElement.selectedIndex];

    // Validate inputs
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var date = document.getElementById("date1").querySelector("input").value;
    var time = document.getElementById("time1").querySelector("input").value;


    // Email format validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        swal("Error", "Please enter a valid email address.", "error");
        return;
    }

    // Date and time validation
    var currentDate = new Date();
    var selectedDateTime = new Date(date + ' ' + time);
    if (selectedDateTime <= currentDate) {
        swal("Error", "Please select a future date and time.", "error");
        return;
    }

    // Basic required field validation
    if (!name || !email || !date || !time) {
        swal("Error", "Please fill in all required fields.", "error");
        return;
    }

    var params = {
        service: serviceOptions.value,
        Doctor: doctorsOptions.value,
        Name: name,
        Email: email,
        Date: date,
        Time: time,
    };

    const serviceID = "service_0xqfm1u";
    const templateid = "template_e87mi8h";

    emailjs.send(serviceID, templateid, params)
        .then((res) => {
            // Reset form fields after successful submission
            document.getElementById("services").selectedIndex = 0;
            document.getElementById("doctors").selectedIndex = 0;
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("date1").querySelector("input").value="";
            document.getElementById("time1").querySelector("input").value="";


            console.log(res);
            swal("Success", "Your data was sent successfully.", "success");
})
    .catch((err) => {
        console.log(err);
        swal("Failed", "Something is wrong", "error");
    });
}
//date time picker
$(function () 
{
    $('#time1').datetimepicker
    ({
        format: 'HH:mm A',
    });
});