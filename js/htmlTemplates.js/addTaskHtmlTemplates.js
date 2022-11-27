function showCategorysHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="closeCategorys()" class="dorpdownRow categoryPadding borderBottom">Select task category <img src="/img/downIcon.svg" alt=""></div>
        <div class="dropdownContainer">
            <div class="categoryPadding category spacebetween" onclick="addNewCategory()">New category <img class="plus" src="/img/boardPlusBtn.svg"></div>
            <div id="savedCategorys"></div>
        </div>
        `
}


function renderSavedCatHtmlTemplate(i) {
    document.getElementById('savedCategorys').innerHTML += `
        <div onclick="addCategory(${i})" class="categoryPadding category">${categorys[i]}<div class="catColor" style="background-color: ${categoryColor[i]}"></div></div>
    `
}


function closeCategorysEmptyHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showCategorys()" class="dorpdownRow categoryPadding">Select task category<img src="/img/downIcon.svg" alt=""></div>
    `
}


function closeCategoryHtmlTemplate(dropdown) {
    dropdown.innerHTML = `
        <div onclick="showCategorys()" class="category categoryPadding">${newTaskCategory[0]}<div class="catColor" style="background-color: ${newTaskCategory[1]}"></div></div>
    `
}