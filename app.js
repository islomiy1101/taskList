let formCreate=document.getElementById('form-create');
let formEdit=document.getElementById('form-edit');
let inputeCreate=document.getElementById('input-create');
let ulContainer=document.getElementById('ulContainer');
let messageText=document.getElementById('message-text');
let addBtn=document.getElementById('addBtn');
let clearAllBtn=document.getElementById('clearAllBtn');
let search=document.getElementById('search');
let editElementId;
let editStatus=false;
window.addEventListener('DOMContentLoaded',()=>{
    check()
})
let tasks=JSON.parse(localStorage.getItem('lists')) ? JSON.parse(localStorage.getItem('lists')):[];
function check(){
    if(tasks.length){
        showTasks()
    }else{
        ulContainer.innerHTML='<span class="text-center fs-5 py-2 text-primary">Hozircha hech qanday topshiriq yoq 😏</span>'
    }
}
// console.log(tasks);
function setTime(){
    let date=new Date();
    let h=date.getHours();
    let m=date.getMinutes();
    let sana=date.toLocaleDateString();
    return `${h}:${m}, ${sana}`;
}
setTime()
function showTasks(){
    const tasks=JSON.parse(localStorage.getItem('lists'));
    ulContainer.innerHTML=''
    tasks.forEach((task,id)=>{
        ulContainer.innerHTML+=`
        <li class="list-group-item d-flex justify-content-between 
        align-items-center ${task.completed?'text-danger text-decoration-line-through':''}">${task.text}
            <div>
                <span>${task.time}</span>
                <span onclick="completeTask(${id})"><i class="fa-solid fs-5 fa-circle-check text-success"></i></span>
                <span onclick="editTask(${id})"><i class="fa-solid fs-5 fa-pen-to-square text-warning"></i></span>
                <span onclick="deleteTask(${id})"><i class="fa-solid fa-trash-can text-danger fs-5"></i></span>
            </div>
        </li>
        `
    })

}

function setTasks(){
    localStorage.setItem('lists',JSON.stringify(tasks))
}

formCreate.addEventListener('submit',(e)=>{
    e.preventDefault();
    let taskText=inputeCreate.value.trim();
    if (editStatus){
        if(taskText.length){
            tasks.splice(editElementId,1,
                {text:taskText,time:setTime(),
                    completed:false})
            // console.log(tasks);
            setTasks()
            showTasks()
            formCreate.reset()
            editStatus=false
            addBtn.textContent="Topshiriq Qo'shish";
        }else{
            messageText.textContent='Iltimos biror bir task kiriting!';
            setTimeout(()=>{
                messageText.textContent=''
            },2500)
        }
    }
    else{
        let taskText=formCreate['input-create'].value.trim();
        formCreate.reset()
        if(taskText.length){
            tasks.push({text:taskText,time:setTime(),completed:false})
            // console.log(tasks);
            setTasks()
            showTasks()
        }else{
            messageText.textContent='Iltimos biror bir task kiriting!';
            setTimeout(()=>{
                messageText.textContent=''
            },2500)
        }
    }
    
})

function deleteTask(id){
    const deletedTasks=tasks.filter((task,i)=>{
        return i!=id
    })
    console.log(deletedTasks);
    tasks=deletedTasks;
    setTasks()
    showTasks()
    check()
}

function completeTask(id){
    const completedTask=tasks.map((task,i)=>{
        if(id==i){
            return {...task,completed:task.completed=!task.completed}
        }else{
            return {...task}
        }   
    })
    tasks=completedTask
    setTasks()
    showTasks()
    check()
}
function editTask(id){
    // console.log(id);
    editElementId=id;
    console.log(editElementId);
    editStatus=true
    let editElement=tasks.filter((task,i)=>i==id)[0]['text'];
    inputeCreate.value=editElement;
    addBtn.textContent="O'zgarishlarni saqlash";
}

clearAllBtn.addEventListener('click',()=>{
    tasks=[];
    setTasks()
    showTasks()
    check()
})


search.addEventListener('input',()=>{
    let allLi=document.querySelectorAll('li');
    Array.from(allLi).forEach(item=>{
        console.log(item);
        let searchText=item.innerText;
        let searchValue=search.value;
        let re=new RegExp(searchValue,'gi');
        if(searchText.match(re)){
            item.classList.remove('dblock');
        }else{
            item.classList.add('dblock');
        }
        // if(item.innerHTML.includes(searchValue)){
        //     item.classList.remove('dblock');
        // }else{
        //     item.classList.add('dblock');
        // }
    })
})