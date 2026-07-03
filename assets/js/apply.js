/* File: assets/js/apply.js */

/* =========================================================
   SAMLEE ESTATES
   APPLY FORM GOOGLE SHEETS SUBMISSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

const applicationForm = document.getElementById("applicationForm");
const formStatus = document.getElementById("formStatus");

const googleSheetWebAppUrl = "https://script.google.com/macros/s/AKfycbxMc9Yu7wMsT4XjzoEuHqvVWf_yCJt9BxZl7wNYk42vEKAi-58Lhs1Lj4Kcm0YDkoLv/exec";

function showFormStatus(type, message) {

    if (!formStatus) {
        return;
    }

    formStatus.classList.remove("success", "error");
    formStatus.classList.add(type);
    formStatus.textContent = message;
    formStatus.style.display = "block";

}

function resetSubmitButton(button) {

    if (!button) {
        return;
    }

    button.disabled = false;
    button.textContent = "Submit Application";

}

function setSubmitButtonLoading(button) {

    if (!button) {
        return;
    }

    button.disabled = true;
    button.textContent = "Submitting...";

}

if (applicationForm) {

    applicationForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton = applicationForm.querySelector("button[type='submit']");

        setSubmitButtonLoading(submitButton);

        const formData = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim(),
            institution: document.getElementById("institution").value,
            yearOfStudy: document.getElementById("yearOfStudy").value,
            funding: document.getElementById("funding").value,
            moveInDate: document.getElementById("moveInDate").value,
            roomType: document.getElementById("roomType").value,
            preferredArea: document.getElementById("preferredArea").value,
            message: document.getElementById("message").value.trim(),
            consent: document.getElementById("consent").checked ? "Yes" : "No",
            source: "SamLee Estates Website"
        };

        try {

            await fetch(googleSheetWebAppUrl, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },
                body: JSON.stringify(formData)
            });

            showFormStatus(
                "success",
                "Application submitted successfully. SamLee Estates will contact you soon."
            );

            applicationForm.reset();

        } catch (error) {

            showFormStatus(
                "error",
                "Something went wrong. Please try again or contact SamLee Estates directly."
            );

        }

        resetSubmitButton(submitButton);

    });

}

});
