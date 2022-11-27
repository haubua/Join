setURL('https://robert-hahn.developerakademie.net/smallest_backend_ever-master');
let categorys = ['Sales', 'Backoffice'];
let categoryColor = ['#FC71FF', '#1FD7C1']
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
let taskStatus = ['todo']


async function addTask() {
    let title = document.getElementById('addTaskTitle').value;
    let description = document.getElementById('addTaskDescription').value;
    let category = newTaskCategory;
    let dueDate = document.getElementById('addTaskDueDate').value;
    let prio = prioStatus[0];
    let addedSubtasks = subtasks;
    let newTask = { title, description, category, assignedContacts, dueDate, prio, addedSubtasks, taskStatus}
    tasks.push(newTask)
    await backend.setItem('tasks', JSON.stringify(tasks));
    clearInnerHtml();
    showSucess()
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
        document.getElementById('addedToBoard').classList.add('addedToBoardD-none')
    }, 2300)
    setTimeout(() => {
        document.getElementById('cover1').classList.add('d-none')
        document.getElementById('addedToBoard').classList.remove('addedToBoardD-none')
        document.getElementById('addedToBoard').classList.remove('addedToBoard');
        document.getElementById('addedToBoard').classList.add('d-none');
    }, 3200)
}


function showCategorys() {
    let dropdown = document.getElementById('categoryDropdown');
    dropdown.removeAttribute("onclick");
    showCategorysHtmlTemplate(dropdown)
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
        removeSelectedCat()
    } else {
        changeSelectedCat(i)
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
    document.getElementById('catColorsSelection').classList.remove('d-none')
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
    let newColor = document.getElementById(`catColor${i}`).innerHTML
    if (selectedColor.length == 0) {
        selectCatColor(i);
    } else {
        changeCatColor(i)

    }


    function selectCatColor(i) {
        selectedColor.push(newColor);
        document.getElementById(`addNewCatColor${i}`).classList.add('highlightSelectedColor');
    }


    function changeCatColor(i) {
        selectedColor.splice(0, 1)
        selectedColor.push(newColor)
        removeColorHighlights();
        document.getElementById(`addNewCatColor${i}`).classList.add('highlightSelectedColor');
    }
}


function removeColorHighlights() {
    for (let i = 0; i < 6; i++) {
        document.getElementById(`addNewCatColor${i}`).classList.remove('highlightSelectedColor')
    }
}


function saveNewCat() {
    getNewCatInput();
    getNewCatColor();
    document.getElementById('catColorsSelection').classList.add('d-none');
    addCategory(categorys.length - 1)
}

function getNewCatInput() {
    if (newCatInputEmpty()) {
        newCategory++;
        categorys.push(`new Category ${newCategory}`);
    } else {
        categorys.push(document.getElementById('newCat').value);
    }
}

function getNewCatColor() {
    if (newCatColorNotSelected()) {
        categoryColor.push(document.getElementById('catColor0').innerHTML);
    } else {
        categoryColor.push(selectedColor[0]);
    }
}


function newCatInputEmpty() {
    return !document.getElementById('newCat').value
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
    prioStatus.push('Urgent')
}


function prioMedium() {
    document.getElementById('prioMedium').classList.add('prioMedium');
    document.getElementById('prioMediumIcon').classList.add('prioIconFilter');
    clearPrioLow();
    clearPrioUrgent();
    document.getElementById('prioMedium').onclick = clearPrioMedium;
    prioStatus.push('Medium')
}


function prioLow() {
    document.getElementById('prioLow').classList.add('prioLow');
    document.getElementById('prioLowIcon').classList.add('prioIconFilter');
    clearPrioUrgent();
    clearPrioMedium();
    document.getElementById('prioLow').onclick = clearPrioLow;
    prioStatus.push('Low')
}


function clearPrioUrgent() {
    document.getElementById('prioUrgent').classList.remove('prioUrgent');
    document.getElementById('prioUrgentIcon').classList.remove('prioIconFilter');
    document.getElementById('prioUrgent').onclick = prioUrgent;
    prioStatus.splice(0, 1)
}


function clearPrioMedium() {
    document.getElementById('prioMedium').classList.remove('prioMedium');
    document.getElementById('prioMediumIcon').classList.remove('prioIconFilter');
    document.getElementById('prioMedium').onclick = prioMedium;
    prioStatus.splice(0, 1)
}


function clearPrioLow() {
    document.getElementById('prioLow').classList.remove('prioLow');
    document.getElementById('prioLowIcon').classList.remove('prioIconFilter');
    document.getElementById('prioLow').onclick = prioLow;
    prioStatus.splice(0, 1)
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
    document.getElementById(`checkboxChecked${i}`).classList.remove('checkboxChecked')
}


function closePopup() {
    document.getElementById('popup').classList.add('popupD-none')
    setTimeout(() => {
        document.getElementById('cover').classList.add('d-none')
    }, 800)
}

function addNewContact() {
    setNewContactHtmlTemplate();
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('popupD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    addNewContactHtmlTemplate();
}

function saveNewContact() {
    let name = document.getElementById('newName');
    let email = document.getElementById('newEmail').value;
    let phone = document.getElementById('newPhone').value;
    let splitName = name.value.split(' ');
    let newLastName = splitName.shift();
    let newFirstName = splitName.join(' ');
    newFirstName = newFirstName.charAt(0).toUpperCase() + newFirstName.slice(1);
    newLastName = newLastName.charAt(0).toUpperCase() + newLastName.slice(1);
    contacts.push({
        'firstName': `${newFirstName}`,
        'lastName': `${newLastName}`,
        'email': `${email}`,
        'phone': `${phone}`
    })
    saveContactsBackend();
    showSavedSucess(newLastName);
}

function showSavedSucess(newLastName) {
    showSavedSucessHtmlTemplate();
    let i = contacts.findIndex(obj => obj.lastName == `${newLastName}`);
    setTimeout(() => {
        closePopup();
        closePopupContacts();
        closeContacts();
        if (popup) {
            popupAddContact(i);
        } else {
            addContact(i);
        }
    }, 1500)
}



//*** SUBTASKS */

function showTasks() {
    let dropdown = document.getElementById('taskDropdown');
    dropdown.removeAttribute("onclick");
    showTasksHtmlTemplate(dropdown);
    renderTasks();
}

function renderTasks() {
    if (tasks.length == 0) {
        noTasksVailableHtmlTemplate();
    } else {
        for (let i = 0; i < tasks.length; i++) {
            renderTasksHtmlTemplate(i);
            checkSubtaskCheckbox(i)
        }
    }
}


function closeTasks() {
    let dropdown = document.getElementById('taskDropdown');
    closeTasksHtmlTemplate(dropdown);
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
    document.getElementById(`checkboxSubtaskChecked${i}`).classList.remove('checkboxChecked')
}


function closeNewTaskPopupShowSucess() {
    document.getElementById('addTaskPopup').classList.add('popupD-none')
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoard');
        document.getElementById('addTaskPopup').classList.add('d-none');
        document.getElementById('addedToBoard').classList.remove('d-none');
    }, 800)
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoardD-none')
    }, 2300)
    setTimeout(() => {
        document.getElementById('cover1').classList.add('d-none')
        document.getElementById('addedToBoard').classList.remove('addedToBoardD-none')
        document.getElementById('addedToBoard').classList.remove('addedToBoard');
        document.getElementById('addedToBoard').classList.add('d-none');
    }, 3200)
}

function closeNewTaskPopup() {
    document.getElementById('addTaskPopup').classList.add('popupD-none')
    setTimeout(() => {
        document.getElementById('addTaskPopup').classList.add('d-none');
        document.getElementById('cover1').classList.add('d-none');
    }, 800)
}

function addNewTaskPopup() {
    // setNewTaskPopupInnerHtml();
    document.getElementById('cover1').classList.remove('d-none');
    document.getElementById('addTaskPopup').classList.remove('d-none');
    document.getElementById('addTaskPopup').classList.remove('popupD-none');

    document.getElementById('addTaskPopup').classList.add('addTaskPopup');
}



// function showSavedSucess(newLastName) {
//     document.getElementById('popupContainerRight').innerHTML = `
//         <h3>New contact sucessfull added to your contacts!</h3>

//     `
//     let i = contacts.findIndex(obj => obj.lastName == `${newLastName}`);
//     setTimeout(() => {
//         closePopup();
//         addContact(i);
//         closeContacts();
//     }, 1500)
// }

async function popupAddTask() {
    let title = document.getElementById('popupAddTaskTitle').value;
    let description = document.getElementById('popupAddTaskDescription').value;
    let category = popupNewTaskCategory;
    let dueDate = document.getElementById('popupAddTaskDueDate').value;
    let prio = popupPrioStatus[0];
    let addedSubtasks = popupSubtasks;
    let newTask = { title, description, dueDate, category, prio, addedSubtasks }
    tasks.push(newTask)
    await backend.setItem('tasks', JSON.stringify(tasks));
    clarPopupInnerHtml();
    closeNewTaskPopupShowSucess();
    closeTasks();
    showTasks();
    checkNewTaskCheckbox();
}


function clarPopupInnerHtml() {
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
        closePopupCategorys()
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

function showPopupCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="closePopupCategorys()" class="dorpdownRow categoryPadding borderBottom">Select task category <img src="/img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div onclick="popupAddNewCategory()" class="categoryPadding category spacebetween">New category <img class="plus" src="/img/boardPlusBtn.svg"></div>
            <div id="popupSavedCategorys"></div>
        </div>
        `
    renderPopupSavedCategorys();
    closePopupContacts();
}

function renderPopupSavedCategorys() {
    for (let i = 0; i < categorys.length; i++) {
        document.getElementById('popupSavedCategorys').innerHTML += `
        <div onclick="addPopupCategory(${i})" class="categoryPadding category">${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div></div>
    `
    }
}

function closePopupCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    if (popupNewTaskCategory.length == 0) {
        dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `} else {
        dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="category categoryPadding">${popupNewTaskCategory[0]}<div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div></div>
    `
    }

}

function addPopupCategory(i) {
    if (popupNewTaskCategory.indexOf(categorys[i]) >= 0) {
        popupNewTaskCategory.splice(0, 2)
        showSelectedPopupCat();
    } else {
        popupNewTaskCategory.splice(0, 2)
        popupNewTaskCategory.push(categorys[i], categoryColor[i])
        showSelectedPopupCat();
    }
}


function showSelectedPopupCat() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    if (popupNewTaskCategory.length > 0) {
        dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="category categoryPadding">${popupNewTaskCategory[0]}<div class="catColor" style="background-color: ${popupNewTaskCategory[1]}"></div></div>
    `
    } else {
        dropdown.innerHTML = `
        <div onclick="showPopupCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `
    }
}

function popupAddNewCategory() {
    document.getElementById('popupCategoryDropdown').innerHTML = `<div class="spacebetween newCat"><input id="popupNewCat" class="catInput"><div class="newCatBtn"><img class="clearBtn" src="/img/closeIcon.svg"><div class="greyLine"></div><img onclick="popupSaveNewCat()"class="checkBtn" src="/img/checkMark.ico"></div></div>`
    document.getElementById('popupCatColorsSelection').classList.remove('d-none');
    document.getElementById('popupCatColorsSelection').innerHTML = '';
    for (let i = 0; i < 6; i++) {
        getRandomCatColor();
        document.getElementById('popupCatColorsSelection').innerHTML += `<div onclick="popupAddNewCatColor(${i})" class="catColor" id="popupAddNewCatColor${i}" style="background-color: ${color}"><div class="d-none" id="popupCatColor${i}">${color}</div></div>`
    }
}


function popupAddNewCatColor(i) {
    let newColor = document.getElementById(`popupCatColor${i}`).innerHTML
    if (popupSelectedColor.length == 0) {
        popupSelectedColor.push(newColor)
        document.getElementById(`popupAddNewCatColor${i}`).classList.add('highlightSelectedColor')
    } else {
        popupSelectedColor.splice(0, 1)
        popupSelectedColor.push(newColor)
        for (let i = 0; i < 6; i++) {
            document.getElementById(`popupAddNewCatColor${i}`).classList.remove('highlightSelectedColor')
        }
        document.getElementById(`popupAddNewCatColor${i}`).classList.add('highlightSelectedColor')
    }
}


function popupSaveNewCat() {
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
}




function popupPrioUrgent() {
    document.getElementById('popupPrioUrgent').classList.add('prioUrgent');
    document.getElementById('popupPrioUrgentIcon').classList.add('prioIconFilter');
    clearPopupPrioLow();
    clearPopupPrioMedium();
    document.getElementById('popupPrioUrgent').onclick = clearPopupPrioUrgent;
    popupPrioStatus.push('Urgent')
}


function popupPrioMedium() {
    document.getElementById('popupPrioMedium').classList.add('prioMedium');
    document.getElementById('popupPrioMediumIcon').classList.add('prioIconFilter');
    clearPopupPrioLow();
    clearPopupPrioUrgent();
    document.getElementById('popupPrioMedium').onclick = clearPopupPrioMedium;
    popupPrioStatus.push('Medium')
}


function popupPrioLow() {
    document.getElementById('popupPrioLow').classList.add('prioLow');
    document.getElementById('popupPrioLowIcon').classList.add('prioIconFilter');
    clearPopupPrioUrgent();
    clearPopupPrioMedium();
    document.getElementById('popupPrioLow').onclick = clearPopupPrioLow;
    popupPrioStatus.push('Low')
}


function clearPopupPrioUrgent() {
    document.getElementById('popupPrioUrgent').classList.remove('prioUrgent');
    document.getElementById('popupPrioUrgentIcon').classList.remove('prioIconFilter');
    document.getElementById('popupPrioUrgent').onclick = popupPrioUrgent;
    popupPrioStatus.splice(0, 1)
}


function clearPopupPrioMedium() {
    document.getElementById('popupPrioMedium').classList.remove('prioMedium');
    document.getElementById('popupPrioMediumIcon').classList.remove('prioIconFilter');
    document.getElementById('popupPrioMedium').onclick = popupPrioMedium;
    popupPrioStatus.splice(0, 1)
}


function clearPopupPrioLow() {
    document.getElementById('popupPrioLow').classList.remove('prioLow');
    document.getElementById('popupPrioLowIcon').classList.remove('prioIconFilter');
    document.getElementById('popupPrioLow').onclick = popupPrioLow;
    popupPrioStatus.splice(0, 1)
}

//* assignet to!! *//

function showPopupContacts() {
    let dropdown = document.getElementById('popupContactsDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="closePopupContacts()" class="dorpdownRow categoryPadding borderBottom">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div class="categoryPadding category">You</div>
            <div id="popupContacts"></div>
            <div onclick="popupAddNewContact()" class="categoryPadding category spacebetween">Add new contact <img class="newContactIcon" src="/img/newContactIcon.png"></div>
        </div>
        `
    renderPopupContacts();
    closePopupCategorys();
}


function renderPopupContacts() {
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                document.getElementById('popupContacts').innerHTML += `
                    <div onclick="popupAddContact(${j})" class="categoryPadding category spacebetween">
                        ${contacts[j].lastName} ${contacts[j].firstName}
                        <div class="contactsCheckbox" id="popupContactsCheckbox${j}"></div>
                    </div>
                `
                checkPopupContactsCheckbox(j);
            }
        }
    }
}

function closePopupContacts() {
    let dropdown = document.getElementById('popupContactsDropdown');
    dropdown.innerHTML = `
        <div onclick="showPopupContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
     `
}

// function popupCloseContacts() {
//     document.getElementById('popupContactsDropdown').innerHTML = `
//         <div onclick="showPopupContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
//         `
// }

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
        document.getElementById(`popupContactsCheckbox${i}`).innerHTML = `
        <div id="popupCheckboxChecked${i}" class="checkboxChecked"></div>
    `
    }
}


function uncheckPopupContactsCheckbox(i) {
    document.getElementById(`popupCheckboxChecked${i}`).classList.remove('checkboxChecked')
}

// NEW CONTACT POPUP !!!!!!!!!!!!!


function popupAddNewContact() {
    popup = true;
    setNewContactHtmlTemplate();
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('popupD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    document.getElementById('popupDescription').innerHTML = `
        <div>                                
            <div>Add Contacts</div>
            <div class="popupSubtitle">Tasks are better with a team!</div>   
        </div>
    `
}

//*** SUBTASKS */

function popupShowTasks() {
    let dropdown = document.getElementById('popupTaskDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="popupCloseTasks()" class="dorpdownRow categoryPadding borderBottom">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div id="popupTasks"></div>
        </div>
        `
    popupRenderTasks();
    // closeCategorys();
}

function popupRenderTasks() {
    if (tasks.length == 0) {
        document.getElementById('popupTasks').innerHTML = `
            <div class="categoryPadding category">No task available</div>
        `
    } else {
        for (let i = 0; i < tasks.length; i++) {
            document.getElementById('popupTasks').innerHTML += `
            <div onclick="popupAddSubtask(${i})" class="categoryPadding category spacebetween">${tasks[i].title} <div class="contactsCheckbox" id="popupSubtaskCheckbox${i}"></div></div>
            
        `
            checkPopupSubtaskCheckbox(i)
        }
    }

}


function popupCloseTasks() {
    let dropdown = document.getElementById('popupTaskDropdown');
    dropdown.innerHTML = `
        <div onclick="popupShowTasks()" class="dorpdownRow categoryPadding">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
     `
}

///***** POPUP SUBTASKS */


function popupAddSubtask(i) {
    let indexOf = popupSubtasks.indexOf(tasks[i])
    if (indexOf >= 0) {
        popupSubtasks.splice(indexOf, 1)
        uncheckPopupSubtaskCheckbox(i);
    } else {
        popupSubtasks.push(tasks[i]);
        checkPopupSubtaskCheckbox(i);
    }
}

function checkPopupSubtaskCheckbox(i) {
    let indexOf = popupSubtasks.indexOf(tasks[i])
    if (indexOf >= 0 && document.getElementById(`popupSubtaskCheckbox${i}`)) {
        document.getElementById(`popupSubtaskCheckbox${i}`).innerHTML = `
        <div id="popupCheckboxSubtaskChecked${i}" class="checkboxChecked"></div>
    `
    }
}

function uncheckPopupSubtaskCheckbox(i) {
    document.getElementById(`popupCheckboxSubtaskChecked${i}`).classList.remove('checkboxChecked')
}