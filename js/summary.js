setURL('https://robert-hahn.developerakademie.net/smallest_backend_ever-master');
let color;
let newDate;
let deadline;
let tasksPrioUrgentAmount = 0;
let tasksDoneAmount = 0;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function renderSummary() {
    getAllTasksAmount()
    getTasksInProgressAmount()
    getTasksAwaitingFbAmount()
    getTasksTodoAmount()
    getTasksDoneAmount()
    getTaskPrioUrgentDeadline();
    getTasksPrioUrgentAmount()
    showUserName()
    greeting()
}

function greeting() {
    let date = new Date();
    let hour = date.getHours()
    let greeting;
    if (hour >= 4 && hour < 10) {
        greeting = 'Good morning,'
    } else if (hour >= 10 && hour < 17) {
        greeting = 'Hello,'
    } else if (hour < 4 || hour >= 17) {
        greeting = 'Good evening,'
    }
    document.getElementById('greeting').innerHTML = `${greeting}`
}

function getAllTasksAmount() {
    let tasksAmount = tasks.length
    document.getElementById('allTasksAmount').innerHTML = `${tasksAmount}`
}

function getTasksInProgressAmount() {
    let inProgressAmount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskStatus == 'inProgress') {
            inProgressAmount++
        }
    }
    document.getElementById('tasksInProgressAmount').innerHTML = `${inProgressAmount}`
}

function getTasksAwaitingFbAmount() {
    let awaitingFbAmount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskStatus == 'awaitingFb') {
            awaitingFbAmount++
        }
    }
    document.getElementById('tasksAwaitingFbAmount').innerHTML = `${awaitingFbAmount}`
}

function getTasksTodoAmount() {
    let tasksTodoAmount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskStatus == 'todo') {
            tasksTodoAmount++
        }
    }
    document.getElementById('tasksTodoAmount').innerHTML = `${tasksTodoAmount}`
}


function getTasksDoneAmount() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskStatus == 'done') {
            tasksDoneAmount++
        }
    }
    document.getElementById('tasksDoneAmount').innerHTML = `${tasksDoneAmount}`
}


function getTasksPrioUrgentAmount() {
    tasksPrioUrgentAmount = 0;
    countUrgentTasks()
    document.getElementById('tasksPrioUrgentAmount').innerHTML = `${tasksPrioUrgentAmount}`
    
}

function countUrgentTasks() {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].prio == 'Urgent' && tasks[i].taskStatus != 'done') {
            tasksPrioUrgentAmount++
        } 
    }
}

function getTaskPrioUrgentDeadline() {
    // getClosestDate()
    let isClosestDate = 0;
    countUrgentTasks();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].prio == 'Urgent' && tasks[i].taskStatus != 'done') {
            if (tasksPrioUrgentAmount == 1) {
                deadline = tasks[i].dueDate;
            } else {
                for (let j = 0; j < tasks.length; j++) {
                    let date1 = tasks[i].dueDate;
                    let date2 = tasks[j].dueDate;
                    if (date1.replace(/[^a-zA-Z0-9 ]/g, '') < date2.replace(/[^a-zA-Z0-9 ]/g, '')) {
                        isClosestDate++
                        if (isClosestDate == tasks.length - 1 -tasksDoneAmount) {
                            deadline = date1;
                        }
                    }
                }
            }
        }
    }
    showDeadlineDate()
}

function showDeadlineDate() {
    if (tasks.length > 0 && tasksPrioUrgentAmount > 0 ) {
        let splitDate = deadline.split('-')
        let day = splitDate[2]
        let month = splitDate[1]
        let monthName = months[month - 1]
        let year = splitDate[0]
        document.getElementById('upcomingUrgentDeadline').innerHTML = `${monthName} ${day}, ${year}`
        checkIfDeadlineIsOver(tasksPrioUrgentAmount)
    } else {
        document.getElementById('upcomingUrgentDeadline').innerHTML = `Currently no urgent task`
        checkIfDeadlineIsOver(tasksPrioUrgentAmount)
    }
}


function checkIfDeadlineIsOver(tasksPrioUrgentAmount) {
    let todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth() + 1;
    if (todayMonth < 10) {
        todayMonth = '0' + todayMonth;
    }
    let todayDay = todayDate.getDate();
    if (todayDay < 10) {
        todayDay = '0' + todayDay
    }
    // let date = todayYear.toString()+todayMonth.toString()+todayDay.toString()
    let date = `${todayYear}-${todayMonth}-${todayDay}`
    if (deadline < date && tasksPrioUrgentAmount > 0) {
        document.getElementById('deadlineText').innerHTML = 'Past Due'
    } else if (tasksPrioUrgentAmount == 0) {
        document.getElementById('deadlineText').innerHTML = ''
    }
}

function showUserName() {
    currentUser = localStorage.getItem('currentUserName');
    document.getElementById('summaryName').innerHTML = currentUser;
}