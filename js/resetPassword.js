let email = "";

function onPageLoad() {
    email = getEmailUrlParameter();
    users = getUsers();
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email')
    return email;
}

async function getUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function checkNewPassword(event) {
    event.preventDefault();
    pw1 = document.getElementById('changePw1').value
    pw2 = document.getElementById('changePw2').value
    if (pw1 == pw2) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userEmail == email) {
                users[i].userPw = pw1
                await backend.setItem('users', JSON.stringify(users));
                showSucess();
            }
        }
    } else {
        document.getElementById('passwordNotMatch').classList.remove('d-none');
        document.getElementById('continueBtn').classList.add('d-none');
    }
    
}

window.addEventListener("keydown", (e) => {
        document.getElementById('passwordNotMatch').classList.add('d-none');
        document.getElementById('continueBtn').classList.remove('d-none')
})

function showSucess() {
    setTimeout(() => {
        document.getElementById('pwReset').classList.add('pwReset');
        document.getElementById('pwReset').classList.remove('d-none');
        document.getElementById('resetContainer').classList.add('opacity20')
    }, 300)
    setTimeout(() => {
        document.getElementById('pwReset').classList.add('pwResetD-none')
    }, 2300)
    setTimeout(() => {
        document.getElementById('resetContainer').classList.remove('opacity20')
        document.getElementById('pwReset').classList.remove('pwResetD-none')
        document.getElementById('pwReset').classList.remove('pwReset');
        document.getElementById('pwReset').classList.add('d-none');
        window.open("login.html", "_self");
    }, 3200)
}