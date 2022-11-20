let colors = ['#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#EE00D6', '#007CEE', '#4E963D'];
let charFirstName = [];
let charLastName = [];
let contactColor = [];
let color;

function rednerContacts() {
    document.getElementById('contactsContainerLeft').innerHTML = '';
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                charFirstName.push(contacts[j].firstName.charAt(0))
                charLastName.push(contacts[j].lastName.charAt(0))
                document.getElementById('contactsContainerLeft').innerHTML += `
                <div id="character${i}"></div>
                <div class="contactsRow" id="selectContact${j}" onclick="showContactDetails(${j})">
                    <div class="initial" id="initial${j}"></div>
                    <div>
                        <div class="contactName">${contacts[j].lastName} ${contacts[j].firstName}</div>
                        <a class="email" href="mailto:${contacts[j].email}">${contacts[j].email}</a>
                    </div>
                </div>
                `
                renderLetters(i);
                setInitial(j);

            }
        }
    }
    getRandomColor();
    fillColor();
}

function renderLetters(i) {
    if (document.getElementById('character' + i)) {
        document.getElementById('character' + i).innerHTML = `
        <div class="contactsCharacter">${alpha[i]}</div>
    `
    }
}


function setInitial(j) {
    if (document.getElementById('initial' + j)) {
        for (let i = 0; i < charFirstName.length; i++) {
            document.getElementById('initial' + j).innerHTML = `
            <div class="circleBg" id="circleBg${j}">${charLastName[i]}${charFirstName[i]}</div>
        `
        }
    }

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    // saveContactColor(color);
}

function fillColor() {
    for (let j = 0; j < contacts.length; j++) {
        document.getElementById('circleBg' + j).style.backgroundColor = color;
        contactColor.push(color);
        getRandomColor();
    }
}
// detailsInitial

// function saveContactColor(color) {
//     contactColor.push(color)
// }

function showContactDetails(j) {
    document.getElementById('contactDetails').innerHTML = `
        <div class="detailsFirstRow">
            <div id="detailsInitial${j}" class="detailsInitial" style="background-color: ${contactColor[j]}";></div>
            <div class="detailsName">${contacts[j].lastName} ${contacts[j].firstName}</div>
        </div>
        <div class="detailsSecondRow">
            <div style="font-size: 21px;">Contact Information</div>
            <div onclick="editContact(${j})" class="editContactRow"><img src="/img/pencil.svg" class="pencilImg"> Edit Contact</div>    
        </div>
        <div class="detailsThirdRow">
            <div class="emailDetails">Email</div>
            <a class="email" href="mailto:${contacts[j].email}">${contacts[j].email}</a>
        </div>
        <div class="detailsFourthRow">
            <div class="phoneDetails">Phone</div>
            <div>${contacts[j].phone}</div>
        </div>
            `
    setDetailsInitial(j);
    addBackgroundColor(j);
}

function setDetailsInitial(j) {
    if (document.getElementById('detailsInitial' + j)) {
        for (let i = 0; i < charFirstName.length; i++) {
            if (contacts[j].firstName.charAt(0) == charFirstName[i]
                && contacts[j].lastName.charAt(0) == charLastName[i]) {
                document.getElementById('detailsInitial' + j).innerHTML = `
                    <div>${charLastName[i]}${charFirstName[i]}</div>
                     `
            }
        }
    }
}


// function fillDetailColor(j) {
//     if (document.getElementById('detailsInitial' + j)) {
//         for (let i = 0; i < contacts.length; i++) {
//             document.getElementById('detailsInitial' + j).style.backgroundColor = contactColor[i];
//         }
//     }
// }

function addBackgroundColor(j) {
    setToNormal();
    document.getElementById('selectContact' + j).classList.add('selectedContact');
    document.getElementById('selectContact' + j).classList.remove('contactsRow');

}


function setToNormal() {
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('selectContact' + i).classList.remove('selectedContact');
        document.getElementById('selectContact' + i).classList.add('contactsRow');
    }
}


function editContact(j) {
    setEditInnerHtml(j);

    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('editD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    document.getElementById('editInitial').style.backgroundColor = `${contactColor[j]}`;
    document.getElementById('popupDescription').innerHTML = `Edit contact`
    setEditInitial(j);
}


function setEditInnerHtml(j) {
    document.getElementById('popupContainerRight').innerHTML = `
    <div id="editInitial" class="detailsInitial"></div>
               
                    <form class="editConRightInputfields" onsubmit="saveChanges(${j}); return false">
                        <img class="closeIcon" src="/img/closeIcon.svg" onclick="closePopup()" alt="">
                        <div class="editContactInputfields">
                            <input required type="text" class="editInputfield" id="editName" value="${contacts[j].lastName} ${contacts[j].firstName}">
                            <img class="editIcons" src="/img/contactIcon.svg" alt="">
                        </div>
                        <div class="editContactInputfields">
                            <input required type="email" class="editInputfield" id="editEmail" value="${contacts[j].email}">
                            <img class="editIcons" src="/img/emailIcon.svg" alt="">
                        </div>
                        <div class="editContactInputfields">
                            <input type="number" class="editInputfield" id="editPhone" value="${contacts[j].phone}" required>
                            <img class="editIcons" src="/img/phoneIcon.svg" alt="">
                        </div>
                        <div class="btnCenter">
                            <button class="saveBtn" type="submit">Save</button>
                        </div>
                    </form>
                
    
    `
}

function closePopup() {
    document.getElementById('popup').classList.add('editD-none')
    setTimeout(() => {
        document.getElementById('cover').classList.add('d-none')
    }, 800)
}


function setEditInitial(j) {
    for (let i = 0; i < charFirstName.length; i++) {
        if (contacts[j].firstName.charAt(0) == charFirstName[i]
            && contacts[j].lastName.charAt(0) == charLastName[i]) {
            document.getElementById('editInitial').innerHTML = `
                    <div>${charLastName[i]}${charFirstName[i]}</div>
                     `
        }
    }
}


function saveChanges(j) {
    let name = document.getElementById('editName');
    let email = document.getElementById('editEmail');
    let phone = document.getElementById('editPhone');
    let splitName = name.value.split(' ');
    let editLastName = splitName.shift();
    let editFirstName = splitName.join(' ');
    contacts[j].firstName = editFirstName.charAt(0).toUpperCase() + editFirstName.slice(1);
    contacts[j].lastName = editLastName.charAt(0).toUpperCase() + editLastName.slice(1);
    contacts[j].email = email.value;
    contacts[j].phone = phone.value;
    saveAndRenderContacts();
    showSucess(j);
}


function showSucess(j) {
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>Your Changes has been saved!</h3>
    `
    setTimeout(() => {
        closePopup(),
            showContactDetails(j)
    }, 1500)
}

function addNewContact() {
    setNewContactInnerHtml();
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('editD-none');
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

    // contacts[j].firstName = editFirstName.charAt(0).toUpperCase() + editFirstName.slice(1);
    // contacts[j].lastName = editLastName.
    // contacts[j].email = email.value;
    // contacts[j].phone = phone.value;
    saveAndRenderContacts();
    // closeEditContact(); besser mit show sucess 
    showSavedSucess(newLastName);
}

function showSavedSucess(newLastName) {
    document.getElementById('popupContainerRight').innerHTML = `
        <h3>New contact sucessfull added to your contacts!</h3>
        
    `
    let j = contacts.findIndex(obj => obj.lastName == `${newLastName}`);
    setTimeout(() => {
        closePopup()
        showContactDetails(j)
    }, 1500)
}