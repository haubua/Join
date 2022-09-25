function boardHtmlTemplate() {
    document.getElementById('rightContainer').innerHTML = `
        <div class="board">
            <div class="bgColor" ondrop="moveTo('todo')" ondragover="allowDrop(event)">
                <h2>TO DO</h2>
                <div id="todo"></div>
            </div>

            <div class="bgColor" ondrop="moveTo('inProgress')" ondragover="allowDrop(event)"> 
                <h2>IN PROGRESS</h2>
                <div id="inProgress"></div>
            </div>

            <div class="bgColor" ondrop="moveTo('testing')" ondragover="allowDrop(event)">
                <h2>TESTING</h2>
                <div id="testing"></div>
            </div>

            <div class="bgColor" ondrop="moveTo('done')" ondragover="allowDrop(event)">
                <h2>DONE</h2>
                <div id="done"></div>
            </div>
        </div>`
}

function todoHTMLTemplate() {
    let todoCat = board.filter(t => t['taskCategory'] == 'todo')
    document.getElementById('todo').innerHTML = '';
    for (let i = 0; i < todoCat.length; i++) {
        document.getElementById('todo').innerHTML += `
        <div class="todoBox" draggable="true" ondragstart="startDragging(${todoCat[i]['id']})" >
            <div>Due Date: ${todoCat[i]['dates']}</div>
            <div>${todoCat[i]['titles']}</div>
            <div>Assigned to: ${todoCat[i]['userName']}</div>
        </div>`      
    }
}

function inProgressHTMLTemplate() {
    let todoCat = board.filter(t => t['taskCategory'] == 'inProgress')
    document.getElementById('inProgress').innerHTML = '';
    for (let i = 0; i < todoCat.length; i++) {
        document.getElementById('inProgress').innerHTML += `
        <div class="todoBox" draggable="true" ondragstart="startDragging(${todoCat[i]['id']})" >
            <div>Due Date: ${todoCat[i]['dates']}</div>
            <div>${todoCat[i]['titles']}</div>
            <div>Assigned to: ${todoCat[i]['userName']}</div>
        </div>`      
    }
}

function testingHTMLTemplate() {
    let todoCat = board.filter(t => t['taskCategory'] == 'testing')
    document.getElementById('testing').innerHTML = '';
    for (let i = 0; i < todoCat.length; i++) {
        document.getElementById('testing').innerHTML += `
        <div class="todoBox" draggable="true" ondragstart="startDragging(${todoCat[i]['id']})" >
            <div>Due Date: ${todoCat[i]['dates']}</div>
            <div>${todoCat[i]['titles']}</div>
            <div>Assigned to: ${todoCat[i]['userName']}</div>
        </div>`      
    }
}

function doneHTMLTemplate() {
    let todoCat = board.filter(t => t['taskCategory'] == 'done')
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < todoCat.length; i++) {
        document.getElementById('done').innerHTML += `
        <div class="todoBox" draggable="true" ondragstart="startDragging(${todoCat[i]['id']})" >
            <div>Due Date: ${todoCat[i]['dates']}</div>
            <div>${todoCat[i]['titles']}</div>
            <div>Assigned to: ${todoCat[i]['userName']}</div>
        </div>`      
    }
}

function backlogHtmlTemplate() {
    document.getElementById('rightContainer').innerHTML = `
        <div class="backlog">
            <div class="headBacklog">
                <div><h2>Backlog</h2></div>
                <div class="headBacklog2ndRow">Learning Management System Project</div>
            </div>
            <div class="descriptions">
                <div class="width33">ASSIGNED TO</div>
                <div class="width33">CATEGORY</div>
                <div class="width33">DETAILS</div>
            </div>
            <div class="tasks" id="tasks">                
            </div>
        </div>
    `
}

function loadTasksHtmlTemplate(i){
    document.getElementById('tasks').innerHTML += `
                    <div class="task">
                        <div class="width33 userDiv"id="name">
                            <div class="userName" id="userName${i}">${backlog[i]['userNames']}</div>
                            <div id="userImg${i}"></div>
                            
                        </div>
                        <div class="width33">
                            ${backlog[i]['category']}
                        </div>
                        <div class="width33 backlogImg">
                            ${backlog[i]['description']}
                            <div>
                                <img class="backlogBtn" id="sendTo${i}" onclick="pushToBoardArray(${i})" src="./img/sendTo.jpg">
                                <img class="backlogBtn" id="delete${i}" onclick="deleteTask(${i})" src="./img/trash.jpg">
                            </div>
                        </div>
                    </div>`
                    
}




function addTaskHTMLTemplate() {
    document.getElementById('rightContainer').innerHTML = `
    
    <div class="headAddTask">
        <h2>Add Task</h2>
        <div class="headBacklog2ndRow">Learning Management System Project</div>
    </div>
    <form id="inputContain " onsubmit="createNewTask(); return false " class="inputContain">
            <div class="inputBox">
                <div>
                    <p>TITLE</p>
                    <input class="inputFieldSize" id="inputTitel" required="" type="text" placeholder="Management meeting preparation">
                </div>
                <div>
                    <p>CATEGORY</p>
                    <select id="inputCategory"class="inputFieldSize" required="">
                        <option value="" disabled="" selected="" hidden="">Please select</option>
                        <option value="Sale">Sale</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Product">Product</option>
                        <option value="Distribution">Distribution</option>
                    </select>
                </div>
                <div>
                    <p>DESCRIPTION</p>

                    <textarea class="inputDescriptionField" type="text" id="inputDescription" cols="34" rows="10" required="" placeholder="Note"></textarea>
                </div>
            </div>


            <div class="inputBox">
                <div>
                    <p>DUE DATE</p>
                    <input id="inputDate" class="inputFieldSize" required="" type="date">
                </div>
                <div>
                    <p>URGENCY</p>
                    <select id="inputUrgency" class="inputFieldSize" placeholder="Urgency" required="">
                        <option value="" disabled="" selected="" hidden="">Please select </option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="Important">Important</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <p>ASSIGNED TO</p>
                    <div id="avatarPicker" class="avatarPickerMain">
                        <div id="usersAccount"></div>
                        <img id="addUser" onclick="addUser()" class="addButtonAvatar" src="./img/icon plus.png">
                    </div>
                </div>
                <div class="buttons">
                    <button type="reset" id="cancel">Cancel</button>
                    <button type="submit" id="create">Create Task</button>
                </div>
            </div>
        </form>
    
    `

}

function showHelpHtmlTemplate() {
    document.getElementById('rightContainer').innerHTML = `
    
    
    `
}

function renderUsers() {
    let usersAccount = document.getElementById("usersAccount");
    usersAccount.innerHTML = '';
    for (let i=0; i<users.length; i++){
        const userName = users[i]['firstName'];
        const userImg = users[i]['userImg'];
        usersAccount.innerHTML += `
        <div class="avatarbox">
                <p class="userName">${userName}</p>  
                <img required onclick="selectAvatar(${i})" class="profile profileBorder" id='user${i}' src='${userImg}'>
        </div>`
        
    }
}




