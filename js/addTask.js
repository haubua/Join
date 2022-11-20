setURL('https://robert-hahn.developerakademie.net/smallest_backend_ever-master');
let categorys = ['Sales', 'Backoffice', 'Sales', 'Backoffice', 'Sales', 'Backoffice'];
let categoryColor = ['#FC71FF', '#1FD7C1']
let newTaskCategory = [];
let prioStatus = [];
let assignedContacts = [];
let popupAssignedContacts = [];
let popup = false;
let popupPrioStatus = [];
let popupNewTaskCategory = [];

//  category, assignetTo, , prio, subtasks 

async function addTask() {
    let title = document.getElementById('addTaskTitle').value;
    let description = document.getElementById('addTaskDescription').value;
    let category = newTaskCategory;
    // let assignetTo = document.getElementById('addTaskAssignetTo').value;
    let dueDate = document.getElementById('addTaskDueDate').value;
    let prio = prioStatus[0];
    // let subtasks = document.getElementById('addTaskSubtasks').value;
    let newTask = { title, description, dueDate, category, prio }
    tasks.push(newTask)
    await backend.setItem('tasks', JSON.stringify(tasks));
}


function showCategorys() {
    let dropdown = document.getElementById('categoryDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="closeCategorys()" class="dorpdownRow categoryPadding borderBottom">Select task category <img src="/img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div class="categoryPadding category spacebetween">New category <img class="plus" src="/img/boardPlusBtn.svg"></div>
            <div id="savedCategorys"></div>
        </div>
        `
    renderSavedCategorys();
    closeContacts();
}

function renderSavedCategorys() {
    for (let i = 0; i < categorys.length; i++) {
        document.getElementById('savedCategorys').innerHTML += `
        <div onclick="addCategory(${i})" class="categoryPadding category">${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div></div>
    `
    }
}

function closeCategorys() {
    let dropdown = document.getElementById('categoryDropdown');
    if (newTaskCategory.length == 0) {
        dropdown.innerHTML = `
        <div onclick="showCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `} else {
        dropdown.innerHTML = `
        <div onclick="showCategorys()" class="category categoryPadding">${newTaskCategory[0]}<div class="catColor" style="background-color: ${newTaskCategory[1]}"></div></div>
    `
    }

}

function addCategory(i) {
    if (newTaskCategory.indexOf(categorys[i]) >= 0) {
        newTaskCategory.splice(0, 2)
        showSelectedCat();
    } else {
        newTaskCategory.splice(0, 2)
        newTaskCategory.push(categorys[i], categoryColor[i])
        showSelectedCat();
    }
}


function showSelectedCat() {
    let dropdown = document.getElementById('categoryDropdown');
    if (newTaskCategory.length > 0) {
        dropdown.innerHTML = `
        <div onclick="showCategorys()" class="category categoryPadding">${newTaskCategory[0]}<div class="catColor" style="background-color: ${newTaskCategory[1]}"></div></div>
    `
    } else {
        dropdown.innerHTML = `
        <div onclick="showCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `
    }

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

//* assignet to!! *//

function showContacts() {
    let dropdown = document.getElementById('contactsDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="closeContacts()" class="dorpdownRow categoryPadding borderBottom">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div class="categoryPadding category">You</div>
            <div id="contacts"></div>
            <div onclick="addNewContact()" class="categoryPadding category spacebetween">Add new contact <img class="newContactIcon" src="/img/newContactIcon.png"></div>
        </div>
        `
    renderContacts();
    closeCategorys();
}


function renderContacts() {
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                document.getElementById('contacts').innerHTML += `
                    <div onclick="addContact(${j})" class="categoryPadding category spacebetween">
                        ${contacts[j].lastName} ${contacts[j].firstName}
                        <div class="contactsCheckbox" id="contactsCheckbox${j}"></div>
                    </div>
                `
                checkContactsCheckbox(j);
            }
        }
    }
}

function closeContacts() {
    let dropdown = document.getElementById('contactsDropdown');
    dropdown.innerHTML = `
        <div onclick="showContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
     `
    if (popup) {
        document.getElementById('popupContactsDropdown').innerHTML = `
        <div onclick="showPopupContacts()" class="dorpdownRow categoryPadding">Select contacts to assign<img src="/img/downIcon.svg" alt=""></div>
        `
    }
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
        document.getElementById(`contactsCheckbox${i}`).innerHTML = `
        <div id="checkboxChecked${i}" class="checkboxChecked"></div>
    `
    }
}


function uncheckContactsCheckbox(i) {
    document.getElementById(`checkboxChecked${i}`).classList.remove('checkboxChecked')
}

// NEW CONTACT POPUP !!!!!!!!!!!!!

function closePopup() {
    document.getElementById('popup').classList.add('popupD-none')
    setTimeout(() => {
        document.getElementById('cover').classList.add('d-none')
    }, 800)
}

function addNewContact() {
    setNewContactInnerHtml();
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

function setNewContactInnerHtml() {
    document.getElementById('popupContainerRight').innerHTML = `
    <img src="/img/contactImg.svg" class="detailsInitial">
               
                    <form class="editConRightInputfields" onsubmit="saveNewContact(); return false">
                        <img class="closeIcon" src="/img/closeIcon.svg" onclick="closePopup()" alt="">
                        <div class="editContactInputfields">
                            <input type="text" class="editInputfield" id="newName" placeholder="Name" required>
                            <img class="editIcons" src="/img/contactIcon.svg" alt="">
                        </div>
                        <div class="editContactInputfields">
                            <input type="email" class="editInputfield" id="newEmail" placeholder="Email" required >
                            <img class="editIcons" src="/img/emailIcon.svg" alt="">
                        </div>
                        <div class="editContactInputfields">
                            <input type="number" class="editInputfield" id="newPhone" placeholder="Phone" required>
                            <img class="editIcons" src="/img/phoneIcon.svg" alt="">
                        </div>
                        <div class="btnCenter">
                            <button class="saveBtn" type="submit">Save</button>
                        </div>
                    </form>
                
    `
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
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>New contact sucessfull added to your contacts!</h3>
        
    `
    let i = contacts.findIndex(obj => obj.lastName == `${newLastName}`);
    setTimeout(() => {
        closePopup();
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
    dropdown.innerHTML = `
        <div onclick="closeTasks()" class="dorpdownRow categoryPadding borderBottom">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div id="tasks"></div>
            <div onclick="addNewTaskPopup()" class="categoryPadding category spacebetween">Add new Task <img class="plus" src="/img/boardPlusBtn.svg"></div>
        </div>
        `
    renderTasks();
    // closeCategorys();
}

function renderTasks() {
    if (tasks.length == 0) {
        document.getElementById('tasks').innerHTML = `
            <div class="categoryPadding category">No task available</div>
        `
    } else {
        for (let i = 0; i < tasks.length; i++) {

            document.getElementById('tasks').innerHTML += `
            <div onclick="addSubtask(${i})" class="categoryPadding category">${tasks[i].title}</div>
        `
        }
    }

}


function closeTasks() {
    let dropdown = document.getElementById('taskDropdown');
    dropdown.innerHTML = `
        <div onclick="showTasks()" class="dorpdownRow categoryPadding">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
     `
}


function addSubtask(i) {

}

//***** NEW TASK POPUP */


function closeNewTaskPopup() {
    document.getElementById('addTaskPopup').classList.add('popupD-none')
    setTimeout(() => {
        document.getElementById('addTaskPopup').classList.add('d-none')
        document.getElementById('addedToBoard').classList.remove('d-none')
        document.getElementById('addedToBoard').classList.add('addedToBoard')
    }, 800)
    setTimeout(() => {
        document.getElementById('addedToBoard').classList.add('addedToBoardD-none')
        document.getElementById('addedToBoard').classList.remove('addedToBoard')
    }, 1600)
    setTimeout(() => {
        document.getElementById('cover1').classList.add('d-none')
    }, 2000)
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
    // let assignetTo = document.getElementById('addTaskAssignetTo').value;
    let dueDate = document.getElementById('popupAddTaskDueDate').value;
    let prio = popupPrioStatus[0];
    // let subtasks = document.getElementById('addTaskSubtasks').value;
    let newTask = { title, description, dueDate, category, prio }
    tasks.push(newTask)
    await backend.setItem('tasks', JSON.stringify(tasks));
    closeNewTaskPopup();
}


function showPopupCategorys() {
    let dropdown = document.getElementById('popupCategoryDropdown');
    dropdown.removeAttribute("onclick");
    dropdown.innerHTML = `
        <div onclick="closePopupCategorys()" class="dorpdownRow categoryPadding borderBottom">Select task category <img src="/img/downIcon.svg" alt=""></div>
        <div class="popupDropdownContainer">
            <div class="categoryPadding category spacebetween">New category <img class="plus" src="/img/boardPlusBtn.svg"></div>
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

// function closePopup() {
//     document.getElementById('popup').classList.add('popupD-none')
//     setTimeout(() => {
//         document.getElementById('cover').classList.add('d-none')
//     }, 800)
// }

function popupAddNewContact() {
    popup = true;
    setNewContactInnerHtml();
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

// function setNewContactInnerHtml() {
//     document.getElementById('popupContainerRight').innerHTML = `
//     <img src="/img/contactImg.svg" class="detailsInitial">

//                     <form class="editConRightInputfields" onsubmit="saveNewContact(); return false">
//                         <img class="closeIcon" src="/img/closeIcon.svg" onclick="closePopup()" alt="">
//                         <div class="editContactInputfields">
//                             <input type="text" class="editInputfield" id="newName" placeholder="Name" required>
//                             <img class="editIcons" src="/img/contactIcon.svg" alt="">
//                         </div>
//                         <div class="editContactInputfields">
//                             <input type="email" class="editInputfield" id="newEmail" placeholder="Email" required >
//                             <img class="editIcons" src="/img/emailIcon.svg" alt="">
//                         </div>
//                         <div class="editContactInputfields">
//                             <input type="number" class="editInputfield" id="newPhone" placeholder="Phone" required>
//                             <img class="editIcons" src="/img/phoneIcon.svg" alt="">
//                         </div>
//                         <div class="btnCenter">
//                             <button class="saveBtn" type="submit">Save</button>
//                         </div>
//                     </form>

//     `
// }

// function saveNewContact() {
//     let name = document.getElementById('newName');
//     let email = document.getElementById('newEmail').value;
//     let phone = document.getElementById('newPhone').value;
//     let splitName = name.value.split(' ');
//     let newLastName = splitName.shift();
//     let newFirstName = splitName.join(' ');
//     newFirstName = newFirstName.charAt(0).toUpperCase() + newFirstName.slice(1);
//     newLastName = newLastName.charAt(0).toUpperCase() + newLastName.slice(1);
//     contacts.push({
//         'firstName': `${newFirstName}`,
//         'lastName': `${newLastName}`,
//         'email': `${email}`,
//         'phone': `${phone}`
//     })
//     saveContactsBackend();
//     showSavedSucess(newLastName);
// }

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
            <div onclick="popupAddSubtask(${i})" class="categoryPadding category">${tasks[i].title}</div>
        `
        }
    }

}


function popupCloseTasks() {
    let dropdown = document.getElementById('popupTaskDropdown');
    dropdown.innerHTML = `
        <div onclick="popupShowTasks()" class="dorpdownRow categoryPadding">Add Subtask<img src="/img/downIcon.svg" alt=""></div>
     `
}