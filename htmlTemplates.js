function boardHtmlTemplate() {
    document.getElementById('rightContainer').innerHTML = `
        <div class="board">

            <div class="bgColor">
                <h2>TO DO</h2>
            </div>

            <div class="bgColor">
                <h2>IN PROGRESS</h2>
            </div>

            <div class="bgColor">
                <h2>TESTING</h2>
            </div>

            <div class="bgColor">
                <h2>DONE</h2>
            </div>
        </div>`
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
                <div class="task">
                    <div class="width33"id="name">
                        <div>NAME</div>
                        <div>E-MAIL</div>
                    </div>
                    <div class="width33">
                        CATEGORY
                    </div>
                    <div class="width33">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quam culpa rerum sint
                    </div>
                </div>
                <div class="task">
                    <div class="width33"id="name">
                        <div>NAME</div>
                        <div>E-MAIL</div>
                    </div>
                    <div class="width33">
                        CATEGORY
                    </div>
                    <div class="width33">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quam culpa rerum sint
                    </div>
                </div>
                <div class="task">
                    <div class="width33"id="name">
                        <div>NAME</div>
                        <div>E-MAIL</div>
                    </div>
                    <div class="width33">
                        CATEGORY
                    </div>
                    <div class="width33">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quam culpa rerum sint
                    </div>
                </div>
                <div class="task">
                    <div class="width33"id="name">
                        <div>NAME</div>
                        <div>E-MAIL</div>
                    </div>
                    <div class="width33">
                        CATEGORY
                    </div>
                    <div class="width33">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quam culpa rerum sint
                    </div>
                </div>
                <div class="task">
                    <div class="width33"id="name">
                        <div>NAME</div>
                        <div>E-MAIL</div>
                    </div>
                    <div class="width33">
                        CATEGORY
                    </div>
                    <div class="width33">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quam culpa rerum sint
                    </div>
                </div>
                <div class="task">
                    <div class="width33"id="name">
                        <div>NAME</div>
                        <div>E-MAIL</div>
                    </div>
                    <div class="width33">
                        CATEGORY
                    </div>
                    <div class="width33">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quam culpa rerum sint
                    </div>
                </div>
                
            </div>
        </div>
    `



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
                        <option value="Higt">High</option>
                    </select>
                </div>
                <div>
                    <p>ASSIGNED TO</p>
                    <div id="avatarPicker">
                        <img class="avatarPicker" src="./img/profile.png">
                        <img src="./img/icon plus.png">
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