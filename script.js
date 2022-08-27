let titles = [];
let descriptions = [];
let categorys = [];
let dates = [];
let urgencyStatusArr = [];
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

setURL('https://gruppe-298.developerakademie.net/smallest_backend_ever/smallest_backend_ever-master');

async function init() {
    await downloadFromServer();
    titles = JSON.parse(backend.getItem('titles')) || [];
    descriptions = JSON.parse(backend.getItem('descriptions')) || [];
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    dates = JSON.parse(backend.getItem('dates')) || [];
    urgencyStatusArr = JSON.parse(backend.getItem('urgencyStatusArr')) || [];
    boardHtmlTemplate();
}

function loadBoard() {
    boardHtmlTemplate();
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

async function createNewTask() {
    pushNewTask();
    await backend.setItem('titles', JSON.stringify(titles));
    await backend.setItem('descriptions', JSON.stringify(descriptions));
    await backend.setItem('categorys', JSON.stringify(categorys));
    await backend.setItem('dates', JSON.stringify(dates));
    await backend.setItem('urgencyStatusArr', JSON.stringify(urgencyStatusArr));
}

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
    title.value = '';
    description.value = '';
    category.value = '';
    date.value = '';
    urgencyStatus.value = '';
}

function sendToBoard() {

}

function deleteTask(i) {


}

async function deleteAllArrays() {
    await backend.deleteItem('titles');
    await backend.deleteItem('descriptions');
    await backend.deleteItem('categorys');
    await backend.deleteItem('dates');
    await backend.deleteItem('urgencyStatusArr');
}