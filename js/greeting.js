function initGreeting() {
    showUserName();
    greeting();
}


function showUserName() {
    currentUser = localStorage.getItem('currentUserName');
    document.getElementById('name').innerHTML = currentUser;
}


function greeting() {
    let date = new Date();
    let hour = date.getHours()
    let greeting;
    if (hour >= 4 && hour < 10) {
        greeting = 'Good morning,';
    } else if (hour >= 10 && hour < 17) {
        greeting = 'Hello,';
    } else if (hour < 4 || hour >= 17) {
        greeting = 'Good evening,';
    }
    document.getElementById('greeting').innerHTML = `${greeting}`;
}