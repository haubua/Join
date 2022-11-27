setURL('https://robert-hahn.developerakademie.net/smallest_backend_ever-master');
let color;


function initSummary() {
    getRandomColor();
    fillColor();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    color = '#';
    for (var j = 0; j < 6; j++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
}

function fillColor() {
    for (let j = 0; j < contacts.length; j++) {
        if (!contacts[j].contactColor) {
            contacts[j].contactColor = color;
            getRandomColor();
        }
    }
}