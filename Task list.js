// Define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ol');
let clearBtn = document.querySelector('#clear_task');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup',filtertask);
document.addEventListener('DOMContentLoaded', getTasks);

// Define functions
// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task!');
    } else {
        // Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        //add cross sign to li
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);

        //locally store korar bebostha kora lagbe
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value='';//form input e value ta clear na korle kharap dekhay


    }
    e.preventDefault();//Unnecessary load stop kore

}

//Remove Task
function removeTask(e){
    if(e.target.hasAttribute('href')){//****MUST READ*****karon dekha jay tasklist je var ta ase eta pura ul ke hisheb kore, so dekha jay x chara jekono jaygay click korleo kete jay, eta prevent korar jonno ami ul er bhitor href wala att ke khujbo, tokhon it'll work, ekhon amar e.target <a> ke point kortese
    if (confirm("Are you sure?")){
        let ele = e.target.parentElement;
        ele.remove();
        removefromlocalstorage(ele);
    }
    
    }
    
}


//Clear Task
function clearTask(e){
   if(confirm('Are you sure? You will be deleting all of your tasks. Press OK to continue')){
    //taskList.innerHTML = '';

    //Faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
   }
}



//Filter task function
function filtertask(e){
    let text = e.target.value.toLowerCase();//mane ami ja filter sectione e type korbo sheta text e uthte thakbe
    document.querySelectorAll('li').forEach(task =>{//task hocche parameter, jeta ek ekta li element ke bujhay shob list er moddhe
        let item = task.firstChild.textContent.toLowerCase();//mane task(li) er fchild hocche <a>, <a> er textcontent er lower case ta nibo
        if(item.indexOf(text)!=-1){//mane item er content jodi text e available hoi taile display korbe. !=-1 mane index ase, mane content ase match koranor moto 
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    })
}


//Store at Local Storage
function storeTaskInLocalStorage(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(e);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Get stored datas on screen even after reloading the page
function getTasks(){
let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach( e => {
        // Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(e + " "));

        //add cross sign to li
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = "x";
        li.appendChild(link);
        taskList.appendChild(li);
    })
}

//Remove data from ls permanently
function removefromlocalstorage(e){
    let tasks
    if(localStorage.getItem('tasks') === null){
        tasks= [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li =e;
    //li.remove(li.lastchild); //<a>x</a> cross ta remove kore dibo, porer line er comparison ta easier korar jonno
    tasks.forEach((task, index) =>{
        if(li.firstChild.textContent.trim()===task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}