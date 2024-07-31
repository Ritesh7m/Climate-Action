    //Pre-loader
    $(window).on('load', function (event) {
        // Hide preloader when everything is loaded
        $('.js-preloader').delay(500).fadeOut(500);
    });

    //Force Pre-load
    /* document.addEventListener('DOMContentLoaded', function() {
        const loader = document.querySelector('.js-preloader');
    
        window.addEventListener('load', function() {
            // Add class to start the transition
            loader.classList.add('hidden');
        
            // Optional: Remove the loader from the DOM after the transition
            // This ensures it doesn't interfere with the rest of the page
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000); // Match this timeout with the duration of the opacity transition
        });
    }); */

    AOS.init({
        delay: 0,
        duration: 600,
        once: true,
    });
    // send mail 
    function sendEmail() {
        const email = document.getElementById('newsletter-email').value;
        const message = document.getElementById('newsletter-message').value;

        const params = {
            email: email,
            message: message
        };

        const serviceId = "service_s6r13xw";
        const templateId = "template_g17s9zn";

        emailjs.send(serviceId, templateId, params)
            .then(response => {
                document.getElementById('newsletter-email').value = "";
                document.getElementById('newsletter-message').value = "";
                Swal.fire({
                    title: "Success!",
                    text: "Message Sent Successfully!",
                    icon: "success"
                });
            })
            .catch(error => {
                alert("Error: " + error);
            });
    }

    const form = document.querySelector('form');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        sendEmail();
    });





    
    

