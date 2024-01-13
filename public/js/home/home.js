import helperFunctions from "/js/home/helperFunctions.mjs";

//ON  SIGNUP
const signupElements = {
    name: signup_form.querySelector('input[name="Name"]'),
    email: signup_form.querySelector('input[name="Email"]'),
    phoneNo: signup_form.querySelector('input[name="phoneNumber"]'),
    password1: signup_form.querySelector('input[name="Password1"]'),
    password2: signup_form.querySelector('input[name="Password2"]'),
    signup_btn: signup_form.querySelector('input[type="submit"]'),
    alert1: signup_form.querySelector('#alert1'),
    alert2: signup_form.querySelector('#alert2'),
    alert3: signup_form.querySelector('#alert3'),
}

signupElements.signup_btn.addEventListener('click', onSignup);
async function onSignup(e) {
    try {
        if (signup_form.checkValidity()) {
            e.preventDefault();
            if (signupElements.password1.value === signupElements.password2.value) {
                const data = {
                    name: signupElements.name.value,
                    email: signupElements.email.value,
                    phoneNumber: signupElements.phoneNo.value,
                    imageUrl:Math.floor(Math.random() * 1000),
                    password: signupElements.password1.value
                }
               await axios.post("/user/signup", data);

                signup_form.reset();
                helperFunctions.alertFunction(signupElements.alert3);
                setTimeout(() => {
                    window.location.href = "/user";
                }, 3000)
            } else {
                helperFunctions.alertFunction(signupElements.alert2);
            }
        }

    } catch (error) {
        if (error.response && error.response.status === 409) {
            e.preventDefault();
            helperFunctions.alertFunction(signupElements.alert1);
        } else {
            alert("Something went wrong - signup agin")
            console.error("An error occurred:", error);
        }
    }
}

//ON  SIGN IN 
const signinElements = {
    email: signin_form.querySelector('input[name="Email"]'),
    password: signin_form.querySelector('input[name="Password"]'),
    signin_btn: signin_form.querySelector('input[type="submit"]'),
    alert1: signin_form.querySelector('#alert1'),
    alert2: signin_form.querySelector('#alert2'),
    alert3: signin_form.querySelector('#alert3'),

}
signinElements.signin_btn.addEventListener('click', onSignin);
async function onSignin(e) {
    try {
        if (signin_form.checkValidity()) {
            e.preventDefault();
            const data = {
                email: signinElements.email.value,
                password: signinElements.password.value
            }
            const signinResponse = await axios.post("/user/signin", data);
            signin_form.reset();
            helperFunctions.alertFunction(signinElements.alert3);
            setTimeout(() => {
                window.location.href = "/user";
            }, 3000)
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            helperFunctions.alertFunction(signinElements.alert2)
        } else if (error.response && error.response.status === 409) {
            helperFunctions.alertFunction(signinElements.alert1)
        } else {
            alert("Something went wrong - Sign in again");
            console.log(error);
        }

    }
}

//ON  FORGOTPASSWORD 

const forgotModalELements = {
    email: forgot_form.querySelector('input[name="email"]'),
    submit_btn: forgot_form.querySelector('input[type="submit"]'),
    alert1: forgot_form.querySelector('#alert1'),
    alert2: forgot_form.querySelector('#alert2'),
}
forgotModalELements.submit_btn.addEventListener('click', forgotPassword);
async function forgotPassword(e) {
    try {
        if (e.target && e.target.classList.contains("submit") && forgot_form.checkValidity()) {
            e.preventDefault();
            const data = {
                email: forgotModalELements.email.value
            }
            await axios.post('/user/forgotPassword', data);
            helperFunctions.alertFunction(forgotModalELements.alert2);
            forgot_form.reset();
            setTimeout(()=>{
                $('#forgotPassword_modal').modal('hide');
            },1500)
        }


    } catch (error) {
        if (error.response && error.response.status === 404) {
            helperFunctions.alertFunction(forgotModalELements.alert1);

        } else {
            console.log("Error occured while sending mail.", error);
            alert(error.response.data.message);
        }
    }
}