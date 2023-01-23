setURL('https://robert-hahn.developerakademie.net/smallest_backend_ever-master');
let w = window.innerWidth;
let currentPage;

async function init() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    taskID = JSON.parse(backend.getItem('taskID')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    categoryColor = JSON.parse(backend.getItem('categoryColor')) || [];
}

async function initTasks() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    boardRenderTasks();
    checkWindowSize();
}

async function initContacts() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || contactsLocal;
    charFirstName = [];
    charLastName = [];
    contactColor = [];
    rednerContacts();
}

async function loadContacts() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || contactsLocal;
}

async function saveContactsBackend() {
    await backend.setItem('contacts', JSON.stringify(contacts))
}


async function saveAndRenderContacts() {
    await backend.setItem('contacts', JSON.stringify(contacts))
    initContacts();
}


async function deleteBackend() {
    await backend.deleteItem('tasks')
    await backend.deleteItem('contacts')
    await backend.deleteItem('taskID')
    await backend.deleteItem('users')
}

async function saveBoard() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
}

function fillColor() {
    for (let j = 0; j < contacts.length; j++) {
        if (!contacts[j].contactColor) {
            contacts[j].contactColor = color;
            getRandomColor();
        }
    }
}

async function initSummary() {
    await init();
    renderSummary();
}


async function loadUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    autofill();
}

function openDropdownLogout() {
    document.getElementById('logoutDropdown').classList.remove('d-none');
    document.getElementById('headerUser').onclick = closeDropdownLogout;
}

function closeDropdownLogout() {
    document.getElementById('logoutDropdown').classList.add('d-none');
    document.getElementById('headerUser').onclick = openDropdownLogout;
}

function logout() {
    window.open("login.html", "_self");
}

function openMobileDropdownLogout() {
    document.getElementById('mobileLogoutDropdown').classList.remove('d-none');
    document.getElementById('mobileHelp').classList.remove('d-none');
    document.getElementById('mobileLegalNotice').classList.remove('d-none');
    document.getElementById('mobileHeaderUser').onclick = closeMobileDropdownLogout;
}

function closeMobileDropdownLogout() {
    document.getElementById('mobileLogoutDropdown').classList.add('d-none');
    document.getElementById('mobileHelp').classList.add('d-none');
    document.getElementById('mobileLegalNotice').classList.add('d-none');
    document.getElementById('mobileHeaderUser').onclick = openMobileDropdownLogout;
}

function setCurrentPageBoard() {
    currentPage = 'board'
}

function setCurrentPageAddTask() {
    currentPage = 'addTask'
}

function setCurrentPageSummary() {
    currentPage = 'summary'
}

function setCurrentPageLogin() {
    currentPage = 'login'
}

function setCurrentPageLegalNotice() {
    currentPage = 'legalNotice'
}

function setCurrentPageContacts() {
    currentPage = 'contacts'
}

function setCurrentPageHelp() {
    currentPage = 'help'
}

function setCurrentResetPassword() {
    currentPage = 'resetpassword'
}


window.addEventListener("resize", function () {
    w = window.innerWidth;
    if (currentPage == 'board') {
        tasksNotDraggableStatus(w)
        changeDetailsSymbol(w)
    }
    if (currentPage == 'login') {
        setSignUpBtn();
    } 
    if (currentPage == 'contacts') {
        hideRightContainer(w)
    }
    if (currentPage == 'contactDetails') {
        hideLeftContainer(w)
        setContactsBtn(w)
        
    }
})


function checkWindowSize() {
    if (currentPage == 'board') {
        tasksNotDraggableStatus(w)
        changeDetailsSymbol(w)
    }
    if (currentPage == 'login') {
        nextPage(w);
    }
    if (currentPage == 'contacts') {
        hideRightContainer(w)
        // setContactsBtn(w)
    }
    if (currentPage == 'contactDetails') {
        setContactsBtn(w)
    }
}