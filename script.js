let todoTitle = document.querySelector('#todoTitle'),
todoText = document.querySelector('#todoText'),
todoSubmit = document.querySelector('#todoSubmit'),
todoList = document.querySelector('#todoList'),
todoSorter = document.querySelector("#todoSorter"),
todoItems = JSON.parse(localStorage.getItem('todo')) || [];


function getItems(){
    todoList.innerHTML ='';

    for(let i=0;i<todoItems.length;i++){
        let textTag = '',sortTag = '';

        if(todoItems[i].status === 0 ){
            textTag = "notDone";
            iconTag = "fa-circle";
        }else{
            textTag = "done";
            iconTag = "fa-check-circle";
        }

        if(todoItems[i].sortTag === 1){
            sortTag = "noShow";
        }else{
            sortTag= "";
        }

        let sentence = `
            <li class="${sortTag} ${textTag}">
                <div class="listText" data-idx='${i}'>
                    ${todoItems[i].title}
                    <p class="listContent">
                        ${todoItems[i].text}
                    </p>
                </div>    
                <div class="timeStamps">
                    <span class="timeStamp">${todoItems[i].creatTime}</span>
                    <span class="timeStamp">${todoItems[i].finishTime}</span>
                </div>
                <div class="todoAct">
                    <span type="button" class="todoDel far fa-trash-alt" data-idx='${i}'></span>
                    <span type="button" class="todoFinish far ${iconTag}" data-idx='${i}'></span>
                </div>
            </li>
            <form class="editForm">
                <input type="text" class="editTitle" value="">
                <br>
                <input type="text" class="editText" value="">
                <input type="button" class="editSubmit" value=">>">
            </form>
            `;
        todoList.innerHTML += sentence;
    }

}



function addItem(e){
    e.preventDefault();
    if(todoTitle.value == ''){alert('請輸入內容!'); return}
    let creatTime = new Date().toLocaleDateString();
    let todo = {
        title:todoTitle.value,
        text:todoText.value,
        status:0,
        sortTag:0,
        creatTime:creatTime,
        finishTime:""
    }
    todoItems.push(todo);
    localStorage.setItem('todo',JSON.stringify(todoItems));
    todoTitle.value = '';
    todoText.value = '';
    getItems();
}



function removeItem(e){
    if(e.target.classList[0] !== 'todoDel'){return};
    let idx = parseInt(e.target.dataset.idx);
    todoItems.splice(idx,1);
    localStorage.setItem('todo',JSON.stringify(todoItems));
    getItems();
}



function finishItem(e){
    if(e.target.classList[0] !== 'todoFinish'){return};
    let idx = parseInt(e.target.dataset.idx);
    let finishTime = new Date().toLocaleDateString();

    if(todoItems[idx].status == 0){
        todoItems[idx].status = 1;
        todoItems[idx].finishTime = finishTime;
    }else{
        todoItems[idx].status = 0;
        todoItems[idx].finishTime = "";
    }
    
    localStorage.setItem('todo',JSON.stringify(todoItems));
    getItems();
}



function editItem(e){
    if(e.target.className !== "listText"){return};
    e.target.parentNode.nextSibling.nextSibling.style.display = "block";

    let idx = e.target.dataset.idx,
    editTitle = document.querySelectorAll(".editTitle"),
    editText = document.querySelectorAll(".editText");
    
    editTitle[idx].value = todoItems[idx].title;
    editText[idx].value = todoItems[idx].text;

    
    let editSubmit = document.querySelectorAll(".editSubmit");
    editSubmit.forEach((el)=>{
        el.addEventListener('click',function(){
            todoItems[idx].title = editTitle[idx].value;
            todoItems[idx].text = editText[idx].value;
            
            localStorage.setItem('todo',JSON.stringify(todoItems));
            getItems();
        });
    });

}



function sorting(e){
    if(e.target.nodeName == 'INPUT'){
        switch (e.target.defaultValue){
            
            
            case "1":
            // console.log(todoList.childNodes);
            todoList.childNodes.forEach(el => {
                if(el.className == " done"){
                    el.style.display = " none";
                }else if(el.className == " notDone" || el.className == "editForm"){
                    el.style.display = "";
                };
            });
            break;
            
            
            case "2":
            todoList.childNodes.forEach(el => {
                if(el.className == " notDone"){
                    el.style.display = " none";
                }else if(el.className == " done" || el.className == "editForm"){
                    el.style.display = "";
                };
            });
            break;
            
            
            default:
                todoList.childNodes.forEach(el => {
                    if(el.className){
                        el.style.display = "";
                    };
                });

        };
    };
}

todoSubmit.addEventListener('click',addItem,false);
todoList.addEventListener('click',removeItem,false);
todoList.addEventListener('click',finishItem,false);
todoList.addEventListener('click',editItem,false);
todoSorter.addEventListener('click',sorting,false);

getItems();