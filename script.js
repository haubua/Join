let taskCategory = [];
let id = [];
let backlog = [];
let board = [];
let todo = [];
let inProgress = [];
let testing = [];
let done = [];
let users = [
    {
        'firstName': 'Robert',
        'lastName': 'Hahn',
        'userImg': "./img/profile.png"
    },
    {
        'firstName': 'Arsen',
        'lastName': 'Tasha',
        'userImg': "./img/profile.png"
    },
    {
        'firstName': 'Delil',
        'lastName': 'Duro',
        'userImg': "./img/profile.png"
    }];
let userNameArr = [];
let userImgArr = [];
let currentDraggedElement;



setURL('https://gruppe-298.developerakademie.net/smallest_backend_ever/smallest_backend_ever-master');

/**
 * This function will download all arrays from the backend-server, and it will render the start-page
 */

async function init() {
    await downloadFromServer();
    backlog = JSON.parse(backend.getItem('backlog')) || [];
    board = JSON.parse(backend.getItem('board')) || [];
    taskCategory = JSON.parse(backend.getItem('taskCategory')) || [];
    userNameArr = JSON.parse(backend.getItem('userNameArr')) || [];
    userImgArr = JSON.parse(backend.getItem('userImgArr')) || [];
    loadBoard();
}


/**
 * This function will save all arrays on the backend-server
 */

async function setItem() {
    await backend.setItem('backlog', JSON.stringify(backlog));
    await backend.setItem('board', JSON.stringify(board));
    await backend.setItem('taskCategory', JSON.stringify(taskCategory));
    await backend.setItem('userNameArr', JSON.stringify(userNameArr));
    await backend.setItem('userImgArr', JSON.stringify(userImgArr))
}

function loadBoard() {
    boardHtmlTemplate();
    todoHTMLTemplate();
    inProgressHTMLTemplate();
    testingHTMLTemplate();
    doneHTMLTemplate();
    generateId();
}

function loadBacklog() {
    backlogHtmlTemplate();
    for (let i = 0; i < backlog.length; i++) {
        loadTasksHtmlTemplate(i);
        renderUserImages(i);
    }
}

function renderUserImages(i){
    for (let j = 0; j < backlog[i]['userImages'].length; j++) {
        document.getElementById(`userImg${i}`).innerHTML += `
        <img  class="userImg" src="${backlog[i]['userImages'][j]}">`
    }    
}


function showAddTast() {
    addTaskHTMLTemplate();
    renderUsers();
}

function showHelp() {
    showHelpHtmlTemplate();
}

function createNewTask() {
    pushNewTask();
    setItem();
}


/**
 * This function will push each value into an seperate Array
 */

function pushNewTask() {
    let title = document.getElementById('inputTitel');
    let description = document.getElementById('inputDescription');
    let category = document.getElementById('inputCategory');
    let date = document.getElementById('inputDate');
    let urgencyStatus = document.getElementById('inputUrgency');
    backlog.push(
        {
            'titles': title.value,
            'description': description.value,
            'category': category.value,
            'dates': date.value,
            'urgencyStatus': urgencyStatus.value,
            'taskCategory': 'todo',
            'userNames': userNameArr,
            'userImages': userImgArr
        }
    )
    userNameArr = [];
    userImgArr = [];
    clearInput(title, description, category, date, urgencyStatus);
    document.getElementById(`user${0}`).classList.remove('avatarCornize')
    document.getElementById(`user${1}`).classList.remove('avatarCornize')
    document.getElementById(`user${2}`).classList.remove('avatarCornize')
}


function clearInput(title, description, category, date, urgencyStatus) {
    title.value = '';
    description.value = '';
    category.value = '';
    date.value = '';
    urgencyStatus.value = '';
}


function selectAvatar(i) {
    let boxImg = document.getElementById(`user${i}`);

    const userName = users[i]['firstName'];
    const userImg = users[i]['userImg'];
    let index = userNameArr.indexOf(userName)
    if (index == -1) {
        userNameArr.push(userName)
        userImgArr.push(userImg);
        boxImg.classList.add('avatarCornize');
    } else {
        userNameArr.splice(userName);
        userImgArr.splice(userImg);
        document.getElementById(`user${0}`).classList.remove('avatarCornize')
        document.getElementById(`user${1}`).classList.remove('avatarCornize')
        document.getElementById(`user${2}`).classList.remove('avatarCornize')
    }
}


function pushToBoardArray(i) {
    board.push(
        {
            'titles': backlog[i]['titles'],
            'description': backlog[i]['description'],
            'category': backlog[i]['category'],
            'dates': backlog[i]['dates'],
            'urgencyStatus': backlog[i]['urgencyStatus'],
            'taskCategory': backlog[i]['taskCategory'],
            'userName': backlog[i]['userNames'],
            'userImg': backlog[i]['userImages'],
            'id': 0
        }
    )
    spliceBacklog(i);
    setItem();
    generateId();
}


function generateId() {
    for (let j = 0; j < board.length; j++) {
        board[j]['id'] = j;
    }
}


function deleteTask(i) {
    spliceBacklog(i);
    setItem();
}


function spliceBacklog(i) {
    backlog.splice(i, 1);
    taskCategory.splice(i, 1);
    userNameArr.splice(i, 1);
    userImgArr.splice(i, 1);
    loadBacklog();
}


/**
 * This function is just for testing.. you can clear all arrays with it
 */

async function deleteAllArrays() {
    await backend.deleteItem('titles');
    await backend.deleteItem('descriptions');
    await backend.deleteItem('categorys');
    await backend.deleteItem('dates');
    await backend.deleteItem('urgencyStatusArr');
    await backend.deleteItem('taskCategory')
}


/**
 * This function is for drag & drop
 * 
 * @param {*} ev 
 */

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    board[currentDraggedElement]['taskCategory'] = category;
    setItem();
    loadBoard();
}

function startDragging(id) {
    currentDraggedElement = id;
}