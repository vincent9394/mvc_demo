const form = document.getElementById("registerForm");
// console.log(form);

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const formObject = {};

    // {
    // 	"display_name": "mary",
    // 	"email": "mary@tecky.io",
    // 	"password": "1234"
    // }

    const form = this;

    // form validation
    const password1 = form.inputPassword1.value;
    const password2 = form.inputPassword2.value;
    if (password1 !== password2) {
        // update UI
        console.log("password not match");
        return;
    }

    formObject["display_name"] = form.inputDisplayName.value;
    formObject["email"] = form.inputEmail.value;
    formObject["password"] = password1;

    const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
    });
    const result = await res.json();
    if (result.status !== 200) {
        console.log(result.message);
    } else {
        // change window location
    }
});
