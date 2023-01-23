let userDataSaved = 'false';


function loginAnimation() {
    setTimeout(() => {
        document.getElementById('center').classList.remove('d-none');
        // document.getElementById('signUpBtn').classList.remove('d-none');
        setSignUpBtn()
    }, 1000)
}

function setSignUpBtn() {
    w = window.innerWidth;
    if (w < 700) {
        document.getElementById('mobileSignUpBtn').classList.remove('d-none');
        document.getElementById('signUpBtn').classList.add('d-none');
    } else {
        document.getElementById('signUpBtn').classList.remove('d-none');
    }
}

function showSignUp() {
    document.getElementById('signUpContainer').classList.remove('d-none');
    document.getElementById('loginContainer').classList.add('d-none');
    document.getElementById('signUpBtn').classList.add('d-none');
    document.getElementById('mobileSignUpBtn').classList.add('d-none');
    currentPage = 'signUp'
}

function closeSignUp() {
    document.getElementById('signUpContainer').classList.add('d-none');
    document.getElementById('loginContainer').classList.remove('d-none');
    document.getElementById('signUpBtn').classList.remove('d-none');
    document.getElementById('mobileSignUpBtn').classList.remove('d-none');
    currentPage = 'login'
}

function showForgotPW() {
    document.getElementById('loginContainer').classList.add('d-none');
    document.getElementById('forgotContainer').classList.remove('d-none')
    document.getElementById('forgotContainerWidth').classList.remove('d-none')
    document.getElementById('signUpBtn').classList.add('d-none');
    document.getElementById('mobileSignUpBtn').classList.add('d-none');
    currentPage = 'forgotPw'
}

function closeForgotPW() {
    document.getElementById('loginContainer').classList.remove('d-none');
    document.getElementById('forgotContainer').classList.add('d-none');
    document.getElementById('forgotContainerWidth').classList.add('d-none')
    document.getElementById('signUpBtn').classList.remove('d-none');
    document.getElementById('mobileSignUpBtn').classList.remove('d-none');
    currentPage = 'login'
}

function rememberUser() {
    document.getElementById('checkbox').classList.add('checkboxChecked');
    document.getElementById('remember').onclick = dontRemember;
    userDataSaved = 'true';
    localStorage.removeItem('userDataSaved');
    localStorage.setItem('userDataSaved', 'true');
}

function dontRemember() {
    document.getElementById('checkbox').classList.remove('checkboxChecked');
    document.getElementById('remember').onclick = rememberUser;
    userDataSaved = 'false';
    localStorage.removeItem('userDataSaved');
    localStorage.setItem('userDataSaved', 'false');
}



function autofill() {
    userDataSaved = localStorage.getItem('userDataSaved')
    if (userDataSaved == 'true') {
        document.getElementById('email').value = localStorage.getItem('userEmail');
        document.getElementById('password').value = localStorage.getItem('userPw');
        document.getElementById('checkbox').classList.add('checkboxChecked');
        document.getElementById('remember').onclick = dontRemember;
    } else {

    }
}

function saveUserData() {
    let email = document.getElementById('email').value;
    let pw = document.getElementById('password').value;
    localStorage.removeItem('userEmail');
    localStorage.setItem('userEmail', email);
    localStorage.removeItem('userPw');
    localStorage.setItem('userPw', pw);
}

function logIn(event) {
    event.preventDefault();
    saveUserData();
    let email = document.getElementById('email').value;
    let pw = document.getElementById('password').value;
    if (users.length == 0) {
        document.getElementById('bottomRow1').classList.add('loginFailRows')
        document.getElementById('bottomRow2').classList.add('loginFailRows')
        document.getElementById('loginFail').classList.remove('d-none')
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userEmail == email && users[i].userPw == pw) {
                localStorage.removeItem('currentUserName');
                localStorage.removeItem('currentUserEmail');
                localStorage.setItem('currentUserName', users[i].userName);
                localStorage.setItem('currentUserEmail', users[i].userEmail);
                document.body.classList.add('d-none');
                checkWindowSize();

            } else {
                document.getElementById('bottomRow1').classList.add('loginFailRows')
                document.getElementById('bottomRow2').classList.add('loginFailRows')
                document.getElementById('loginFail').classList.remove('d-none')
            }
        }
    }
}


function guestLogIn() {
    localStorage.removeItem('userEmail');
    localStorage.setItem('currentUserEmail', 'guest has no e-mail');
    localStorage.removeItem('currentUserName');
    localStorage.setItem('currentUserName', 'Guest User');
    checkWindowSize();
}

function nextPage() {
    if (w < 450) {
        window.open("greeting.html", "_self");
    } else {
        window.open("summary.html", "_self");
    }


}



//*** SIGN UP SECTION */

async function signUp(event) {
    getRandomColor();
    event.preventDefault();
    userName = document.getElementById('signUpName').value;
    userEmail = document.getElementById('signUpEmail').value;
    userPw = document.getElementById('signUpPassword').value;
    let newUser = { userName, userEmail, userPw }
    if (users.length == 0) {
        users.push(newUser)
        await backend.setItem('users', JSON.stringify(users));
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUserColor');
        localStorage.setItem('currentUserName', userName);
        localStorage.setItem('currentUserEmail', userEmail);
        localStorage.setItem('currentUserColor', color);
        checkWindowSize();
    } else {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userEmail == userEmail) {
                document.getElementById('signUpBtn2').classList.add('d-none');
                document.getElementById('emailExists').classList.remove('d-none')
            } else if (users[i] != newUser) {
                users.push(newUser)
                await backend.setItem('users', JSON.stringify(users));
                localStorage.removeItem('currentUserName');
                localStorage.removeItem('currentUserEmail');
                localStorage.removeItem('currentUserColor');
                localStorage.setItem('currentUserName', userName);
                localStorage.setItem('currentUserEmail', userEmail);
                localStorage.setItem('currentUserColor', color);
                checkWindowSize();
            }
        }
    }
}


window.addEventListener("keydown", (e) => {
    document.getElementById('signUpBtn2').classList.remove('d-none');
    document.getElementById('emailExists').classList.add('d-none')
})


/*** forgot Password Section */

function sendEmail() {
    email = document.getElementById('sendEmail').value;
    for (let i = 0; i < users.length; i++) {
        if (users[i].userEmail == email) {
            emailSend();
        } else if (email <= 0) {
            document.getElementById('emailEmpty').classList.remove('d-none');
            document.getElementById('bottomRow3').classList.add('loginFailRows')
        }
    }
    document.getElementById('emailNotRegistered').classList.remove('d-none');
    document.getElementById('bottomRow3').classList.add('loginFailRows')
}


window.addEventListener("keydown", (e) => {
    document.getElementById('emailNotRegistered').classList.add('d-none');
    document.getElementById('bottomRow3').classList.remove('loginFailRows')
})

async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) {
        sendEmail();
    } else {
        alert('Email cound not be sent, try again later')
    }
}

function action(formData) {
    const input = 'https://robert-hahn.developerakademie.net/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(
        input,
        requestInit
    );
}

function emailSend() {
    document.getElementById('forgotContainer').classList.add('d-none')
    document.getElementById('signUpBtn').classList.add('d-none')
    setTimeout(() => {
        document.getElementById('emailSend').classList.add('emailSend');
        document.getElementById('emailSend').classList.remove('d-none');
    }, 300)
}