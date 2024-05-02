//get all tasks
addEventListener('load',async(e)=>{
    let response=await fetch('http://localhost:5000/api/v1/task')
    response=await response.json();
    for(i of response.alltasks)
    {
        displayTask(i)
    }
})



//add task
const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = form.task.value;
    const completed = form.completed.checked;
    const data = { name: task, completed: completed }
    let response = await addTask(data);
    displayTask(response._doc);
    // console.log(response);

})

const addTask = async (data) => {
    let response = await fetch('http://localhost:5000/api/v1/task', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    response = await response.json();
    return response;
}


const displayelement = document.getElementById('displayTask')
const displayTask = (response) => {
    let check='unchecked';
    if(response.completed)
    {
        check='checked';
    }
    const task = document.createElement('div')
    task.innerHTML +=
        `<div id="${response._id}" class="task">
    <p>${response.name}</p>

    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" ${check} disabled>
        <label class="form-check-label" for="flexCheckDefault2">
          completed
        </label>
      </div>

      <button onclick="getsingletask('${response._id}')" type="button" class="btn btn-primary button">edit</button>

      <button onclick="deletetask('${response._id}')" type="button" class="btn btn-outline-danger button">delete</button>
</div>`;
    displayelement.appendChild(task);
}


//delete task

const deletetask =async(id)=>
{
    let response=await fetch(`http://localhost:5000/api/v1/task/${id}`,{
        method:'delete',
        headers:{
            'Content-Type':'aplication/json'
        }
    })
    response=await response.json();
    // console.log(response);
    document.getElementById(id).remove();
}


//get single task

const getsingletask =async(id)=>
{
    let response=await fetch(`http://localhost:5000/api/v1/task/${id}`)
    response=await response.json();
    console.log(response);

    sessionStorage.setItem('singleTask',JSON.stringify(response));

    window.open('./task.html','_parent')
}