let taskCategory = [];
let id = [];
let titles = [];
let descriptions = [];
let categorys = [];
let dates = [];
let urgencyStatusArr = [];
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
        'userImg': "./img/profile.jpg"
    }];
let currentDraggedElement;

setURL('https://gruppe-298.developerakademie.net/smallest_backend_ever/smallest_backend_ever-master');

/**
 * This function will download all arrays from the backend-server, and it will render the start-page
 */

async function init() {
    await downloadFromServer();
    titles = JSON.parse(backend.getItem('titles')) || [];
    descriptions = JSON.parse(backend.getItem('descriptions')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    dates = JSON.parse(backend.getItem('dates')) || [];
    urgencyStatusArr = JSON.parse(backend.getItem('urgencyStatusArr')) || [];
    board = JSON.parse(backend.getItem('board')) || [];
    taskCategory = JSON.parse(backend.getItem('taskCategory')) || [];
    loadBoard();
}


/**
 * This function will save all arrays on the backend-server
 */

async function setItem() {
    await backend.setItem('titles', JSON.stringify(titles));
    await backend.setItem('descriptions', JSON.stringify(descriptions));
    await backend.setItem('categorys', JSON.stringify(categorys));
    await backend.setItem('dates', JSON.stringify(dates));
    await backend.setItem('urgencyStatusArr', JSON.stringify(urgencyStatusArr));
    await backend.setItem('board', JSON.stringify(board))
    await backend.setItem('taskCategory', JSON.stringify(taskCategory))
}

function loadBoard() {
    boardHtmlTemplate();
    todoHTMLTemplate();
    inProgressHTMLTemplate();
    testingHTMLTemplate();
    doneHTMLTemplate();
}

function loadBacklog() {
    backlogHtmlTemplate();
    for (let i = 0; i < descriptions.length; i++) {
        loadTasksHtmlTemplate(i);
    }
}

function showAddTast() {
    addTaskHTMLTemplate();
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
    titles.push(title.value);
    descriptions.push(description.value);
    categorys.push(category.value);
    dates.push(date.value);
    urgencyStatusArr.push(urgencyStatus.value);
    taskCategory.push('todo')
    title.value = '';
    description.value = '';
    category.value = '';
    date.value = '';
    urgencyStatus.value = '';
}

function pushToBoardArray(i) {
    board.push(
                {
                'titles' :titles[i], 
                'description' :descriptions[i], 
                'category' :categorys[i], 
                'dates' :dates[i],
                'urgencyStatusArr': urgencyStatusArr[i],
                'taskCategory' : taskCategory[i],
                // 'id' : j
                }
            )
        // for (let j = 0; j < board.length; j++) {
        //     board.push({'id' : j})
            
        // }
    spliceBacklog(i);
    setItem();
}

function deleteTask(i) {
    spliceBacklog(i);
    setItem();
}

function spliceBacklog(i) {
    titles.splice(i, 1);
    descriptions.splice(i, 1);
    categorys.splice(i, 1);
    dates.splice(i, 1);
    urgencyStatusArr.splice(i, 1);
    taskCategory.splice(i, 1);
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

function startDragging(id){
    currentDraggedElement = id;
}