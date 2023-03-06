let charFirstName = [];
let charLastName = [];


function rednerContacts() {
    document.getElementById('contactsContainerLeft').innerHTML = '';
    for (let i = 0; i < alpha.length; i++) {
        for (let j = 0; j < contacts.length; j++) {
            if (alpha[i] == contacts[j].lastName.charAt(0)) {
                charFirstName.push(contacts[j].firstName.charAt(0));
                charLastName.push(contacts[j].lastName.charAt(0));
                renderContactsHtmlTemplate(i, j);
                renderLetters(i);
                setInitial(j);
            }
        }
    }
}


function renderLetters(i) {
    if (document.getElementById('character' + i)) {
        renderLettersHtmlTemplate(i);
    }
}


function setInitial(j) {
    if (document.getElementById('initial' + j)) {
        for (let i = 0; i < charFirstName.length; i++) {
            setInitialHtmlTemplate(i, j)
            document.getElementById('initial' + j).innerHTML = `
            <div class="circleBg" id="circleBg${j}">${charLastName[i]}${charFirstName[i]}</div>
        `
            fillInitialColor(j);
        }
    }

}


function fillInitialColor(j) {
    document.getElementById('circleBg' + j).style.backgroundColor = contacts[j].contactColor;
}


function showContactDetails(j) {
    showContactDetailsHtmlTemplate(j);
    if (w < 950) {
        document.getElementById('contactsContainerRight').classList.remove('d-none');
        document.getElementById('contactsContainerLeft').classList.add('d-none');
        document.getElementById('contactsContainer').classList.add('d-none');
        document.getElementById('detailsBackBtn').classList.remove('d-none');
        currentPage = 'contactDetails'
    }
    setContactsBtn();
    setDetailsInitial(j);
    addBackgroundColor(j);
}


function setContactsBtn() {
    if (w <= 450) {
        document.getElementById('contactsContainerBtn').classList.add('d-none');
        document.getElementById('editContacBtn').classList.add('d-none');
        document.getElementById('mobileEditContacBtn').classList.remove('d-none');
    } else {
        document.getElementById('contactsContainerBtn').classList.remove('d-none');
        document.getElementById('editContacBtn').classList.remove('d-none');
        document.getElementById('mobileEditContacBtn').classList.add('d-none');
    }
}


function closeContactDetails() {
    document.getElementById('detailsBackBtn').classList.add('d-none');
    document.getElementById('contactsContainerRight').classList.add('d-none');
    document.getElementById('contactsContainerLeft').classList.remove('d-none');
    document.getElementById('contactsContainer').classList.remove('d-none');
    currentPage = 'contacts'
}


function setDetailsInitial(j) {
    if (document.getElementById('detailsInitial' + j)) {
        for (let i = 0; i < charFirstName.length; i++) {
            if (contacts[j].firstName.charAt(0) == charFirstName[i]
                && contacts[j].lastName.charAt(0) == charLastName[i]) {
                setDetailsInitialHtmlTemplate(i, j);
            }
        }
    }
}


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
    setEditInnerHtmlTemplate(j);
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('editD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    document.getElementById('editInitial').style.backgroundColor = `${contacts[j].contactColor}`;
    document.getElementById('popupDescription').innerHTML = `Edit contact`;
    setEditInitial(j);
}



function closePopup() {
    document.getElementById('popup').classList.add('editD-none');
    setTimeout(() => {
        document.getElementById('cover').classList.add('d-none');
        document.getElementById('popup').classList.remove('editD-none');
        document.body.classList.remove('overflowHidden');
        if (document.getElementById('contactsContainer')) {
            document.getElementById('contactsContainer').classList.remove('overflowHidden');
        }
    }, 800)
}


function setEditInitial(j) {
    for (let i = 0; i < charFirstName.length; i++) {
        if (contacts[j].firstName.charAt(0) == charFirstName[i]
            && contacts[j].lastName.charAt(0) == charLastName[i]) {
            setEditInitialHtmlTemplate(i);
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
    showSucessContacts(j);
}


function showSucessContacts(j) {
    sucessHtmlTemplate();
    setTimeout(() => {
        closePopup(),
            showContactDetails(j);
    }, 1500)
}


function addNewContact() {
    setNewContactInnerHtmlTemplate();
    document.getElementById('popup').classList.remove('d-none');
    document.getElementById('popup').classList.remove('editD-none');
    document.getElementById('cover').classList.remove('d-none');
    document.getElementById('popup').classList.add('popup');
    document.getElementById('contactsContainer').classList.add('overflowHidden');
    addNewContactPopupDescriptionHtmlTemplate();
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
    getRandomColor(color);
    contacts.push({
        'firstName': `${newFirstName}`,
        'lastName': `${newLastName}`,
        'email': `${email}`,
        'phone': `${phone}`,
        'contactColor': `${color}`
    })
    saveAndRenderContacts();
    showSavedSucess(newLastName);
}


function showSavedSucess(newLastName) {
    contactAddedHtmlTemplate();
    let j = contacts.findIndex(obj => obj.lastName == `${newLastName}`);
    setTimeout(() => {
        closePopup();
        showContactDetails(j);
    }, 1500)
}


function hideRightContainer(w) {
    if (w <= 950) {
        document.getElementById('contactsContainerRight').classList.add('d-none');
        document.getElementById('mobileLeftAddContactBtn').classList.remove('d-none');
    } else {
        document.getElementById('contactsContainerRight').classList.remove('d-none');
        document.getElementById('mobileLeftAddContactBtn').classList.add('d-none');
    }
}


function hideLeftContainer(w) {
    if (w <= 950) {
        document.getElementById('contactsContainerLeft').classList.add('d-none');
        document.getElementById('detailsBackBtn').classList.remove('d-none');
        document.getElementById('contactsContainer').classList.add('d-none');
    } else {
        document.getElementById('contactsContainerLeft').classList.remove('d-none');
        document.getElementById('detailsBackBtn').classList.add('d-none');
        document.getElementById('contactsContainer').classList.remove('d-none');
    }
}