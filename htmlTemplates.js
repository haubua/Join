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
    
    
    `

}

function showHelpHtmlTemplate() {
    document.getElementById('rightContainer').innerHTML = `
    
    
    `
}