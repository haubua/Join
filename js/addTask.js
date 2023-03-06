setURL('https://hahn-robert.com/smallest_backend_ever-master');
let categorys = [];
let categoryColor = [];
let colorSelection = ['#9B5D27', '#97BD16', '#868CD8', '#223595', '#08CE33', '#F54EBD'];
let color;
let selectedColor = [];
let popupSelectedColor = [];
let newTaskCategory = [];
let newCategory = 0;
let prioStatus = [];
let assignedContacts = [];
let popupAssignedContacts = [];
let popup = false;
let popupPrioStatus = [];
let popupNewTaskCategory = [];
let subtasks = [];
let popupSubtasks = [];
let taskStatus = 'todo';
let id;


async function addTask() {
    let title = document.getElementById('addTaskTitle').value;
    let description = document.getElementById('addTaskDescription').value;
    let category = newTaskCategory;
    let dueDate = document.getElementById('addTaskDueDate').value;
    let prio = prioStatus[0];
    let addedSubtasks = subtasks;
    getTaskID();
    let newTask = { title, description, category, assignedContacts, dueDate, prio, addedSubtasks, taskStatus, id };
    tasks.push(newTask);
    await backend.setItem('tasks', JSON.stringify(tasks));
    await backend.setItem('taskID', JSON.stringify(taskID));
    clearInnerHtml();
    showSucess();
}


function getTaskID() {
    if (taskID.length == 0) {
        id = 0;
        taskID[0] = id;
    } else {
        id = taskID[0];
        id++
        taskID[0] = id;
    }
}


function clearInnerHtml() {
    setTimeout(() => {
        clearValue();
        clearArrays();
        clearPrioUrgent();
        clearPrioMedium();
        clearPrioLow();
        closeCategorys();
        clearCheckboxes();
        closeContacts();
        closeTasks();
    }, 800)
}


function instantClearInnerHtml() {
    clearValue();
    clearArrays();
    clearPrioUrgent();
    clearPrioMedium();
    clearPrioLow();
    closeCategorys();
    clearCheckboxes();
    closeContacts();
    closeTasks();
}


function clearValue() {
    document.getElementById('addTaskTitle').value = '';
    document.getElementById('addTaskDescription').value = '';
    document.getElementById('addTaskDueDate').value = '';
}


function clearArrays() {
    newTaskCategory = [];
    prioStatus = [];
    subtasks = [];
    assignedContacts = [];
}


function clearCheckboxes() {
    for (let i = 0; i < contacts.length; i++) {
        if (document.getElementById(`checkboxChecked${i}`)) {
            uncheckContactsCheckbox(i);
        }
    }
    for (let i = 0; i < tasks.length; i++) {
        if (document.getElementById(`checkboxSubtaskChecked${i}`)) {
            uncheckSubtaskCheckbox(i);
        }
    }
}


function showSucess() {
    document.getElementById('cover1').classList.remove('d-none');
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoard');
        document.getElementById('addedToBoard').classList.remove('d-none');
    }, 300)
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoardD-none');
    }, 2300)
    setTimeout(() => {
        document.getElementById('cover1').classList.add('d-none');
        document.getElementById('addedToBoard').classList.remove('addedToBoardD-none');
        document.getElementById('addedToBoard').classList.remove('addedToBoard');
        document.getElementById('addedToBoard').classList.add('d-none');
    }, 3200)
}


function showCategorys() {
    let dropdown = document.getElementById('categoryDropdown');
    dropdown.removeAttribute("onclick");
    showCategorysHtmlTemplate(dropdown);
    renderSavedCategorys();
    closeContacts();
}


function renderSavedCategorys() {
    for (let i = 0; i < categorys.length; i++) {
        renderSavedCatHtmlTemplate(i);
    }
}


function closeCategorys() {
    let dropdown = document.getElementById('categoryDropdown');
    if (newTaskCategory.length == 0) {
        closeCategorysEmptyHtmlTemplate(dropdown);
    } else {
        closeCategoryHtmlTemplate(dropdown);
    }
}


function addCategory(i) {
    if (newTaskCategory.indexOf(categorys[i]) >= 0) {
        removeSelectedCat();
    } else {
        changeSelectedCat(i);
    }
}


function removeSelectedCat() {
    newTaskCategory.splice(0, 2)
    showSelectedCat();
}


function changeSelectedCat(i) {
    newTaskCategory.splice(0, 2)
    newTaskCategory.push(categorys[i], categoryColor[i])
    showSelectedCat();
}


function showSelectedCat() {
    let dropdown = document.getElementById('categoryDropdown');
    if (newTaskCategory.length > 0) {
        showSelectedCatHtmlTemplate(dropdown);
    } else {
        noCatSelectedHtmlTemplate(dropdown);
    }
}


function addNewCategory() {
    selectedColor = [];
    addNewCategoryHtmlTemplate();
    document.getElementById('catColorsSelection').classList.remove('d-none');
    document.getElementById('catColorsSelection').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        getRandomCatColor();
        newCategoryColorsHtmlTemplate(i);
    }
}


function getRandomCatColor() {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
}


function addNewCatColor(i) {
    let newColor = document.getElementById(`catColor${i}`).innerHTML;
    if (selectedColor.length == 0) {
        selectCatColor(i, newColor);
    } else {
        changeCatColor(i, newColor);
    }
}


function selectCatColor(i, newColor) {
    selectedColor.push(newColor);
    document.getElementById(`addNewCatColor${i}`).classList.add('highlightSelectedColor');
}


function changeCatColor(i, newColor) {
    selectedColor.splice(0, 1);
    selectedColor.push(newColor);
    removeColorHighlights();
    document.getElementById(`addNewCatColor${i}`).classList.add('highlightSelectedColor');
}


function removeColorHighlights() {
    for (let i = 0; i < 6; i++) {
        document.getElementById(`addNewCatColor${i}`).classList.remove('highlightSelectedColor');
    }
}


async function saveNewCat() {
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    categoryColor = JSON.parse(backend.getItem('categoryColor')) || [];
    newCategory = JSON.parse(backend.getItem('newCategory')) || [];
    getNewCatInput();
    getNewCatColor();
    document.getElementById('catColorsSelection').classList.add('d-none');
    addCategory(categorys.length - 1);
}


function getNewCatInput() {
    if (newCatInputEmpty()) {
        newCategory++;
        categorys.push(`new Category ${newCategory}`);
    } else {
        categorys.push(document.getElementById('newCat').value);
    }
    saveCatBackend();
}


async function saveCatBackend() {
    await backend.setItem('categorys', JSON.stringify(categorys));
    await backend.setItem('categoryColor', JSON.stringify(categoryColor));
    await backend.setItem('newCategory', JSON.stringify(newCategory));
}


function getNewCatColor() {
    if (newCatColorNotSelected()) {
        categoryColor.push(document.getElementById('catColor0').innerHTML);
    } else {
        categoryColor.push(selectedColor[0]);
    }
}


function newCatInputEmpty() {
    return !document.getElementById('newCat').value;
}


function newCatColorNotSelected() {
    return selectedColor.length == 0;
}


function closeNewCat() {
    showSelectedCat();
    document.getElementById('catColorsSelection').classList.add('d-none');
}


function prioUrgent() {
    document.getElementById('prioUrgent').classList.add('prioUrgent');
    document.getElementById('prioUrgentIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioMedium();
    document.getElementById('prioUrgent').onclick = clearPrioUrgent;
    prioStatus.push('Urgent');
}


function prioMedium() {
    document.getElementById('prioMedium').classList.add('prioMedium');
    document.getElementById('prioMediumIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioUrgent();
    document.getElementById('prioMedium').onclick = clearPrioMedium;
    prioStatus.push('Medium');
}


function prioLow() {
    document.getElementById('prioLow').classList.add('prioLow');
    document.getElementById('prioLowIcon').classList.add('prioIconFilter');
    clearPrioUrgent();
    clearPrioMedium();
    document.getElementById('prioLow').onclick = clearPrioLow;
    prioStatus.push('Low');
}


function clearPrioUrgent() {
    document.getElementById('prioUrgent').classList.remove('prioUrgent');
    document.getElementById('prioUrgentIcon').classList.remove('prioIconFilter');
    document.getElementById('prioUrgent').onclick = prioUrgent;
    prioStatus.splice(0, 1);
}


function clearPrioMedium() {
    document.getElementById('prioMedium').classList.remove('prioMedium');
    document.getElementById('prioMediumIcon').classList.remove('prioIconFilter');
    document.getElementById('prioMedium').onclick = prioMedium;
    prioStatus.splice(0, 1);
}


function clearPrioLow() {
    document.getElementById('prioLow').classList.remove('prioLow');
    document.getElementById('prioLowIcon').classList.remove('prioIconFilter');
    document.getElementById('prioLow').onclick = prioLow;
    prioStatus.splice(0, 1);
}


function showContacts() {
    let dropdown = document.getElementById('contactsDropdown');
    dropdown.removeAttribute("onclick");
    showContactsHtmlTemplate(dropdown);
    renderContacts();
    closeCategorys();
}


function renderContacts() {
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                renderContactsHtmlTemplate(j);
                checkContactsCheckbox(j);
                checkCurrentUserCheckbox();
            }
        }
    }
}


function closeContacts() {
    let dropdown = document.getElementById('contactsDropdown');
    closeContactsHtmlTemplate(dropdown);
}


function addContact(i) {
    let indexOf = assignedContacts.indexOf(contacts[i])
    if (indexOf >= 0) {
        assignedContacts.splice(indexOf, 1)
        uncheckContactsCheckbox(i);
    } else {
        assignedContacts.push(contacts[i]);
        checkContactsCheckbox(i);
    }
}


function checkContactsCheckbox(i) {
    let indexOf = assignedContacts.indexOf(contacts[i])
    if (indexOf >= 0 && document.getElementById(`contactsCheckbox${i}`)) {
        checkContactsCheckboxHtmlTemplate(i);
    }
}


function uncheckContactsCheckbox(i) {
    document.getElementById(`checkboxChecked${i}`).classList.remove('checkboxChecked');
}


function addCurrentUser() {
    let indexOf = -1;
    let currentUserName = localStorage.getItem('currentUserName');
    let currentUserEmail = localStorage.getItem('currentUserEmail');
    let currentUserColor = localStorage.getItem('currentUserColor');
    let splitName = currentUserName.split(' ');
    let curretUserFirstName = splitName.shift();
    let curretUserLastName = splitName.join(' ');
    curretUserFirstName = curretUserFirstName.charAt(0).toUpperCase() + curretUserFirstName.slice(1);
    curretUserLastName = curretUserLastName.charAt(0).toUpperCase() + curretUserLastName.slice(1);
    currentUser = { firstName: curretUserFirstName, lastName: curretUserLastName, email: currentUserEmail, 'phone': '', 'contactColor': currentUserColor }
    for (let i = 0; i < assignedContacts.length; i++) {
        if (JSON.stringify(assignedContacts[i]) == JSON.stringify(currentUser)) {
            indexOf = i;
        }
    }
    if (indexOf >= 0) {
        assignedContacts.splice(indexOf, 1)
        uncheckCurrentUserCheckbox();
    } else {
        assignedContacts.push(currentUser);
        checkCurrentUserCheckbox();
    }
}


function checkCurrentUserCheckbox() {
    let indexOf = assignedContacts.indexOf(currentUser)
    if (indexOf >= 0) {
        document.getElementById('currentUserCheckbox').innerHTML = `
        <div id="checkboxChecked" class="checkboxChecked"></div>
    `
    }
}


function uncheckCurrentUserCheckbox() {
    document.getElementById(`checkboxChecked`).classList.remove('checkboxChecked');
}


function taskClosePopup() {
    document.getElementById('popup').classList.add('popupD-none');
    setTimeout(() => {
        document.getElementById('cover').classList.add('d-none');
    }, 800)
}


function taskAddNewContact() {
    setNewContactHtmlTemplate();
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('popupD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    document.body.classList.add('overflowHidden');
    addNewContactHtmlTemplate();
    closeContacts();
}


function taskSaveNewContact() {
    let name = document.getElementById('newName');
    let email = document.getElementById('newEmail').value;
    let phone = document.getElementById('newPhone').value;
    let splitName = name.value.split(' ');
    let newLastName = splitName.shift();
    let newFirstName = splitName.join(' ');
    newFirstName = newFirstName.charAt(0).toUpperCase() + newFirstName.slice(1);
    newLastName = newLastName.charAt(0).toUpperCase() + newLastName.slice(1);
    getRandomColor(color);
    contacts.push({
        'firstName': `${newFirstName}`,
        'lastName': `${newLastName}`,
        'email': `${email}`,
        'phone': `${phone}`,
        'contactColor': `${color}`
    })
    saveContactsBackend();
    taskShowSavedSucess(newLastName);
}


function taskShowSavedSucess(newLastName) {
    showSavedSucessHtmlTemplate();
    let i = contacts.findIndex(obj => obj.lastName == `${newLastName}`);
    setTimeout(() => {
        taskClosePopup();
        closePopupContacts();
        if (popup) {
            popupAddContact(i);
        } else {
            addContact(i);
        }
    }, 1500)
}


//*** SUBTASKS */

function showTasks() {
    if (document.getElementById('taskDropdown')) {
        let dropdown = document.getElementById('taskDropdown');
        dropdown.removeAttribute("onclick");
        showTasksHtmlTemplate(dropdown);
        renderTasks();
        document.getElementById('taskBottomRow').classList.remove('margin231')
    } else {
        boardRenderTasks();
    }
}


function renderTasks() {
    if (tasks.length == 0) {
        noTasksVailableHtmlTemplate();
    } else {
        for (let i = 0; i < tasks.length; i++) {
            renderSubtasksHtmlTemplate(i);
            checkSubtaskCheckbox(i)
        }
    }
}


function closeTasks() {
    if (document.getElementById('taskDropdown')) {
        let dropdown = document.getElementById('taskDropdown');
        closeTasksHtmlTemplate(dropdown);
        document.getElementById('taskBottomRow').classList.add('margin231')
    }
}


function checkNewTaskCheckbox() {
    let lastTask = tasks.length - 1
    addSubtask(lastTask);
}


function addSubtask(i) {
    let indexOf = subtasks.indexOf(tasks[i])
    if (indexOf >= 0) {
        subtasks.splice(indexOf, 1)
        uncheckSubtaskCheckbox(i);
    } else {
        subtasks.push(tasks[i]);
        checkSubtaskCheckbox(i);
    }
}


function checkSubtaskCheckbox(i) {
    let indexOf = subtasks.indexOf(tasks[i])
    if (indexOf >= 0 && document.getElementById(`subtaskCheckbox${i}`)) {
        checkSubtaskCheckboxHtmlTemplate(i);
    }
}


function uncheckSubtaskCheckbox(i) {
    document.getElementById(`checkboxSubtaskChecked${i}`).classList.remove('checkboxChecked');
}


function closeNewTaskPopupShowSucess() {
    document.getElementById('addTaskPopup').classList.add('popupD-none');
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoard');
        document.getElementById('addTaskPopup').classList.add('d-none');
        document.getElementById('addedToBoard').classList.remove('d-none');
    }, 800)
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoardD-none');
    }, 2300)
    setTimeout(() => {
        document.getElementById('cover1').classList.add('d-none');
        document.getElementById('addedToBoard').classList.remove('addedToBoardD-none');
        document.getElementById('addedToBoard').classList.remove('addedToBoard');
        document.getElementById('addedToBoard').classList.add('d-none');
        document.body.classList.remove('overflowHidden');
    }, 3200)
}


function closeNewTaskPopup() {
    document.getElementById('addTaskPopup').classList.add('popupD-none');
    if (document.getElementById('contactsDropdown')) {
        closeContacts();
    };
    setTimeout(() => {
        document.getElementById('addTaskPopup').classList.add('d-none');
        document.getElementById('cover1').classList.add('d-none');
        document.body.classList.remove('overflowHidden');
    }, 800)
}


function addNewTaskPopup(status) {
    taskStatus = status;
    document.getElementById('cover1').classList.remove('d-none');
    document.getElementById('addTaskPopup').classList.remove('d-none');
    document.getElementById('addTaskPopup').classList.remove('popupD-none');
    document.getElementById('addTaskPopup').classList.add('addTaskPopup');
    if (w <= 835) {
        document.body.classList.add('overflowHidden');
        window.scrollTo(0, 0);
    }
}


async function popupAddTask() {
    let title = document.getElementById('popupAddTaskTitle').value;
    let description = document.getElementById('popupAddTaskDescription').value;
    let category = popupNewTaskCategory;
    let dueDate = document.getElementById('popupAddTaskDueDate').value;
    let prio = popupPrioStatus[0];
    let addedSubtasks = popupSubtasks;
    let assignedContacts = popupAssignedContacts;
    getTaskID();
    let newTask = { title, description, assignedContacts, dueDate, category, prio, addedSubtasks, taskStatus, id }
    tasks.push(newTask)
    await backend.setItem('tasks', JSON.stringify(tasks));
    await backend.setItem('taskID', JSON.stringify(taskID));
    clearPopupInnerHtml();
    closeNewTaskPopupShowSucess();
    closeTasks();
    showTasks();
    checkNewTaskCheckbox();
    taskStatus = 'todo';
}


function clearPopupInnerHtml() {
    setTimeout(() => {
        document.getElementById('popupAddTaskTitle').value = '';
        document.getElementById('popupAddTaskDescription').value = '';
        popupNewTaskCategory = [];
        document.getElementById('popupAddTaskDueDate').value = '';
        popupPrioStatus = [];
        popupSubtasks = [];
        clearPopupPrioUrgent();
        clearPopupPrioMedium();
        clearPopupPrioLow();
        closePopupCategorys();
        popupAssignedContacts = [];
        for (let i = 0; i < contacts.length; i++) {
            if (document.getElementById(`popupCheckboxChecked${i}`)) {
                uncheckPopupContactsCheckbox(i);
            }
        }
        for (let i = 0; i < contacts.length; i++) {
            if (document.getElementById(`popupSubtaskCheckboxChecked${i}`)) {
                uncheckPopupSubtaskCheckbox(i);
            }
        }
        closePopupContacts();
        popupCloseTasks();
    }, 800)
}


function instantClearPopup() {
    document.getElementById('popupAddTaskTitle').value = '';
    document.getElementById('popupAddTaskDescription').value = '';
    popupNewTaskCategory = [];
    document.getElementById('popupAddTaskDueDate').value = '';
    popupPrioStatus = [];
    popupSubtasks = [];
    clearPopupPrioUrgent();
    clearPopupPrioMedium();
    clearPopupPrioLow();
    closePopupCategorys();
    popupAssignedContacts = [];
    for (let i = 0; i < contacts.length; i++) {
        if (document.getElementById(`popupCheckboxChecked${i}`)) {
            uncheckPopupContactsCheckbox(i);
        }
    }
    for (let i = 0; i < contacts.length; i++) {
        if (document.getElementById(`popupSubtaskCheckboxChecked${i}`)) {
            uncheckPopupSubtaskCheckbox(i);
        }
    }
    closePopupContacts();
    popupCloseTasks();
}


function showPopupCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    dropdown.removeAttribute("onclick");
    showPopupCatDropdownTemplate(dropdown);
    renderPopupSavedCategorys();
    closePopupContacts();
}


function renderPopupSavedCategorys() {
    for (let i = 0; i < categorys.length; i++) {
        renderSavedCatTemplate(i);
    }
}


function closePopupCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    if (popupNewTaskCategory.length == 0) {
        renderPopupEmptyCatTemplate(dropdown);
    } else {
        renderPopupCatTemplate(dropdown);
    }
}


function addPopupCategory(i) {
    if (popupNewTaskCategory.indexOf(categorys[i]) >= 0) {
        popupNewTaskCategory.splice(0, 2);
        showSelectedPopupCat();
    } else {
        popupNewTaskCategory.splice(0, 2);
        popupNewTaskCategory.push(categorys[i], categoryColor[i]);
        showSelectedPopupCat();
    }
}


function showSelectedPopupCat() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    if (popupNewTaskCategory.length > 0) {
        renderPopupEmptyCatDropdownTemplate(dropdown);
    } else {
        renderPopupCatDropdownTemplate(dropdown);
    }
}

function popupAddNewCategory() {
    renderPopupAddCatDropdownTemplate();
    document.getElementById('popupCatColorsSelection').classList.remove('d-none');
    document.getElementById('popupCatColorsSelection').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        getRandomCatColor();
        renderPopupCatColorTemplate(i);
    }
}


function popupAddNewCatColor(i) {
    let newColor = document.getElementById(`popupCatColor${i}`).innerHTML;
    if (popupSelectedColor.length == 0) {
        popupSelectedColor.push(newColor)
        document.getElementById(`popupAddNewCatColor${i}`).classList.add('highlightSelectedColor');
    } else {
        popupSelectedColor.splice(0, 1)
        popupSelectedColor.push(newColor);
        for (let i = 0; i < 6; i++) {
            document.getElementById(`popupAddNewCatColor${i}`).classList.remove('highlightSelectedColor');
        }
        document.getElementById(`popupAddNewCatColor${i}`).classList.add('highlightSelectedColor');
    }
}


async function popupSaveNewCat() {
    await downloadFromServer();
    categorys = JSON.parse(backend.getItem('categorys')) || [];
    categoryColor = JSON.parse(backend.getItem('categoryColor')) || [];
    newCategory = JSON.parse(backend.getItem('newCategory')) || [];
    if (document.getElementById('popupNewCat').value) {
        categorys.push(document.getElementById('popupNewCat').value);
    } else {
        newCategory++;
        categorys.push(`new Category ${newCategory}`);
    }
    if (popupSelectedColor.length > 0) {
        categoryColor.push(popupSelectedColor[0]);
    } else {
        categoryColor.push(document.getElementById('popupCatColor0').innerHTML)
    }
    document.getElementById('popupCatColorsSelection').classList.add('d-none');
    addPopupCategory(categorys.length - 1);
    saveCatBackend();
}


function popupCloseNewCat() {
    showSelectedPopupCat();
    document.getElementById('popupCatColorsSelection').classList.add('d-none');
}


function popupPrioUrgent() {
    document.getElementById('popupPrioUrgent').classList.add('prioUrgent');
    document.getElementById('popupPrioUrgentIcon').classList.add('prioIconFilter');
    clearPopupPrioLow();
    clearPopupPrioMedium();
    document.getElementById('popupPrioUrgent').onclick = clearPopupPrioUrgent;
    popupPrioStatus.push('Urgent');
}


function popupPrioMedium() {
    document.getElementById('popupPrioMedium').classList.add('prioMedium');
    document.getElementById('popupPrioMediumIcon').classList.add('prioIconFilter');
    clearPopupPrioLow();
    clearPopupPrioUrgent();
    document.getElementById('popupPrioMedium').onclick = clearPopupPrioMedium;
    popupPrioStatus.push('Medium');
}


function popupPrioLow() {
    document.getElementById('popupPrioLow').classList.add('prioLow');
    document.getElementById('popupPrioLowIcon').classList.add('prioIconFilter');
    clearPopupPrioUrgent();
    clearPopupPrioMedium();
    document.getElementById('popupPrioLow').onclick = clearPopupPrioLow;
    popupPrioStatus.push('Low');
}


function clearPopupPrioUrgent() {
    document.getElementById('popupPrioUrgent').classList.remove('prioUrgent');
    document.getElementById('popupPrioUrgentIcon').classList.remove('prioIconFilter');
    document.getElementById('popupPrioUrgent').onclick = popupPrioUrgent;
    popupPrioStatus.splice(0, 1);
}


function clearPopupPrioMedium() {
    document.getElementById('popupPrioMedium').classList.remove('prioMedium');
    document.getElementById('popupPrioMediumIcon').classList.remove('prioIconFilter');
    document.getElementById('popupPrioMedium').onclick = popupPrioMedium;
    popupPrioStatus.splice(0, 1);
}


function clearPopupPrioLow() {
    document.getElementById('popupPrioLow').classList.remove('prioLow');
    document.getElementById('popupPrioLowIcon').classList.remove('prioIconFilter');
    document.getElementById('popupPrioLow').onclick = popupPrioLow;
    popupPrioStatus.splice(0, 1);
}


function showPopupContacts() {
    let dropdown = document.getElementById('popupContactsDropdown');
    dropdown.removeAttribute("onclick");
    renderPopupContactsDropdownTemplate(dropdown);
    renderPopupContacts();
    closePopupCategorys();
}


function renderPopupContacts() {
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                renderPopupContactsTemplate(j);
                checkPopupContactsCheckbox(j);
                checkPopupCurrentUserCheckbox();
            }
        }
    }
}


function closePopupContacts() {
    let dropdown = document.getElementById('popupContactsDropdown');
    renderClosePopupContactsTemplate(dropdown);
}


function popupAddContact(i) {
    let indexOf = popupAssignedContacts.indexOf(contacts[i])
    if (indexOf >= 0) {
        popupAssignedContacts.splice(indexOf, 1)
        uncheckPopupContactsCheckbox(i);
    } else {
        popupAssignedContacts.push(contacts[i]);
        checkPopupContactsCheckbox(i);
    }
}


function checkPopupContactsCheckbox(i) {
    let indexOf = popupAssignedContacts.indexOf(contacts[i])
    if (indexOf >= 0 && document.getElementById(`popupContactsCheckbox${i}`)) {
        checkpopupContactsCheckboxTemplate(i);
    }
}


function uncheckPopupContactsCheckbox(i) {
    document.getElementById(`popupCheckboxChecked${i}`).classList.remove('checkboxChecked');
}


function popupAddCurrentUser() {
    let indexOf = -1;
    let currentUserName = localStorage.getItem('currentUserName');
    let currentUserEmail = localStorage.getItem('currentUserEmail');
    let currentUserColor = localStorage.getItem('currentUserColor');
    let splitName = currentUserName.split(' ');
    let curretUserFirstName = splitName.shift();
    let curretUserLastName = splitName.join(' ');
    curretUserFirstName = curretUserFirstName.charAt(0).toUpperCase() + curretUserFirstName.slice(1);
    curretUserLastName = curretUserLastName.charAt(0).toUpperCase() + curretUserLastName.slice(1);
    currentUser = { firstName: curretUserFirstName, lastName: curretUserLastName, email: currentUserEmail, 'phone': '', 'contactColor': currentUserColor };
    for (let i = 0; i < popupAssignedContacts.length; i++) {
        if (JSON.stringify(popupAssignedContacts[i]) == JSON.stringify(currentUser)) {
            indexOf = i;
        }
    }
    if (indexOf >= 0) {
        popupAssignedContacts.splice(indexOf, 1)
        uncheckPopupCurrentUserCheckbox();
    } else {
        popupAssignedContacts.push(currentUser);
        checkPopupCurrentUserCheckbox();
    }
}


function checkPopupCurrentUserCheckbox() {
    let indexOf = popupAssignedContacts.indexOf(currentUser)
    if (indexOf >= 0) {
        document.getElementById('popupCurrentUserCheckbox').innerHTML = `
        <div id="checkboxChecked" class="checkboxChecked"></div>
    `}
}


function uncheckPopupCurrentUserCheckbox() {
    document.getElementById(`checkboxChecked`).classList.remove('checkboxChecked');
}


function popupAddNewContact() {
    popup = true;
    setNewContactHtmlTemplate();
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('popupD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    popupDescriptionTemplate();
}


function popupShowTasks() {
    let dropdown = document.getElementById('popupTaskDropdown');
    dropdown.removeAttribute("onclick");
    renderPopupTasksTemplate(dropdown);
    popupRenderTasks();
    document.getElementById('popupTaskBottomRow').classList.remove('margin231')
}


function popupRenderTasks() {
    if (tasks.length == 0) {
        popupRenderEmptyTaskTemplate();
    } else {
        for (let i = 0; i < tasks.length; i++) {
            popupRenderTasksTemplate(i);
            checkPopupSubtaskCheckbox(i);
        }
    }
}


function popupCloseTasks() {
    let dropdown = document.getElementById('popupTaskDropdown');
    popupCloseTasksTemplate(dropdown);
    document.getElementById('popupTaskBottomRow').classList.add('margin231')
}


function popupAddSubtask(i) {
    let indexOf = popupSubtasks.indexOf(tasks[i])
    if (indexOf >= 0) {
        popupSubtasks.splice(indexOf, 1);
        uncheckPopupSubtaskCheckbox(i);
    } else {
        popupSubtasks.push(tasks[i]);
        checkPopupSubtaskCheckbox(i);
    }
}


function checkPopupSubtaskCheckbox(i) {
    let indexOf = popupSubtasks.indexOf(tasks[i])
    if (indexOf >= 0 && document.getElementById(`popupSubtaskCheckbox${i}`)) {
        renderPopupSubtasksCheckboxTemplate(i);
    }
}


function uncheckPopupSubtaskCheckbox(i) {
    document.getElementById(`popupCheckboxSubtaskChecked${i}`).classList.remove('checkboxChecked');
}