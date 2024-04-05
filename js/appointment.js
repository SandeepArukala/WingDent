function sendMail() {
    var serviceElement = document.getElementById("services");
    var serviceOptions = serviceElement.options[serviceElement.selectedIndex];

    var doctorsElement = document.getElementById("doctors");
    var doctorsOptions = doctorsElement.options[doctorsElement.selectedIndex];

    // Validate inputs
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;

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
            // Reset form fields
            document.getElementById("services").selectedIndex = 0;
            document.getElementById("doctors").selectedIndex = 0;
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";

            console.log(res);
            swal("Success", "Your data was sent successfully.", "success");
        })
        .catch((err) => {
            console.log(err);
            swal("Failed", "Something is wrong", "error");
        });
}
