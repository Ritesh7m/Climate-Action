
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





    
    

