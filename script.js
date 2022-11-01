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
        'userImg': "./img/robert.jpeg"
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
let isMobile = false;
let screenMore630px = window.matchMedia("(max-width: 630px)").matches
let screenLess900px = window.matchMedia("max-width: 900px").matches

setURL('https://gruppe-298.developerakademie.net/smallest_backend_ever/smallest_backend_ever-master');



/**
 * this function will return if the for the game used device is a mobile device
 */

function checkUsedDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        isMobile = true;
}


/**
 * This function will download all arrays from the backend-server, and it will render the start-page
 */

async function init() {
    checkUsedDevice();
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
    if (isMobile || screenMoreWidth) 
        closeContainer();
}

function loadBacklog() {
    backlogHtmlTemplate();
    for (let i = 0; i < backlog.length; i++) {
        loadTasksHtmlTemplate(i);
        renderUserImages(i);
    }
    if (isMobile || screenMoreWidth) 
        closeContainer();
}

function renderUserImages(i) {
    for (let j = 0; j < backlog[i]['userImages'].length; j++) {
        document.getElementById(`userImg${i}`).innerHTML += `
        <img  class="userImg" src="${backlog[i]['userImages'][j]}">`
    }
}


function showAddTast() {
    addTaskHTMLTemplate();
    renderUsers();
    if (isMobile || screenMoreWidth) 
        closeContainer();
}

function showHelp() {
    showHelpHtmlTemplate();
    if (isMobile || screenMoreWidth) 
        closeContainer();
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

function taskPopup(i) {
    document.getElementById('board').innerHTML += `
        <div class="popup">
            <div class="taskTopline">
                <div>Due Date: ${board[i]['dates']}</div>
                <div>
                    <img class="boardBtn" onclick="closePopup()" src="./img/exit.jpg">
                    <img class="boardBtn" onclick="deleteBoardTask(${board[i]['id']})" src="./img/trash.jpg">
                </div>
            </div>
            <div>Category: ${board[i]['category']}</div>
            <div>Status: ${board[i]['urgencyStatus']}</div>
            <div>Title: ${board[i]['titles']}</div>
            <div>Description: ${board[i]['description']}
            <div>Assigned to: ${board[i]['userName']}</div>
            <div id="boardUserImg${i}"</div>
        </div>`
    document.getElementById('notClickabel').classList.add('notClickabel');
    renderBoardUserImages(i);
}

function closePopup() {
    document.getElementById('board').classList.add('d-none');
    document.getElementById('notClickabel').classList.remove('notClickabel');
    loadBoard();
}

function renderBoardUserImages(i) {
    for (let j = 0; j < board[i]['userImg'].length; j++) {
        document.getElementById(`boardUserImg${i}`).innerHTML += `
        <img  class="userImg" src="${board[i]['userImg'][j]}">`
    }
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

async function deleteBoardTask(i) {
    board.splice(i, 1)
    setItem();
    loadBoard();
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


function openLeftContainer() {
    document.getElementById('leftContainer').classList.add('openLeftContainer');
    document.getElementById('rightContainer').classList.add('d-none');
}

function closeContainer() {
    document.getElementById('leftContainer').classList.remove('openLeftContainer');
    document.getElementById('rightContainer').classList.remove('d-none');
}