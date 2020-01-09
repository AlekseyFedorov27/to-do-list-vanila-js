// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: '1 Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e6',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      '2 Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: '3 Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      '4 Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elemnts UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group',
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeletehandler);
  listContainer.addEventListener('click', onComplitTasc);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

// 2. В каждый элемент li добавить кнопку которая будет делать задачу 
// выполненной. завершенные задачи должны быть подсвечены любым цветом.
    const checkedBtn = document.createElement('div');
    checkedBtn.classList.add('custom-control', 'custom-switch');
    if(completed){
      checkedBtn.insertAdjacentHTML('afterbegin', `<input type="checkbox" class="custom-control-input" checked id="customSwitch${_id}">
                                                    <label class="custom-control-label" for="customSwitch${_id}">Complite task</label>`);
    li.classList.add('color');      
    }else{
      checkedBtn.insertAdjacentHTML('afterbegin',`<input type="checkbox" class="custom-control-input" id="customSwitch${_id}">
                                                  <label class="custom-control-label" for="customSwitch${_id}">Complite task</label>`)
    } 

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    
    li.appendChild(span);
    li.appendChild(deleteBtn);    
    li.appendChild(article);
    li.appendChild(checkedBtn);

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    message();

    form.reset();

  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeletehandler({ target }) {
    if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      message();
    }
    
  }


// 1. Если массив с задачами пустой то под формой нужно выводить
//  сообщение об этом, также это же сообщение нужно выводить если вы удалите все задачи.
const messageInfo = document.createElement('div');
messageInfo.textContent = 'Массив с задачами пустой';
messageInfo.classList.add('alert', 'alert-danger', 'hidden');
messageInfo.setAttribute('role', 'alert');

let ul = document.querySelector('.list-group');
let container = document.querySelector('.container');
container.insertAdjacentElement('afterend', messageInfo)

function message(){  
  if( Array.from(ul.children).length === 0){
     messageInfo.classList.remove('hidden')
  }  
  else{   
    messageInfo.classList.add('hidden');
  }
}
message();

let showSort = false;

// 2. В каждый элемент li добавить кнопку которая будет делать задачу 
// выполненной. завершенные задачи должны быть подсвечены любым цветом.
function onComplitTasc({ target }) {     
  if (target.classList.contains('custom-control-input')) {
    const parent = target.closest('[data-task-id]');    
    const id = parent.dataset.taskId;
    
    parent.classList.toggle('color');
    if(objOfTasks[id].completed === true ) {
      objOfTasks[id].completed = false 
    }else{
        objOfTasks[id].completed = true;
        if (showSort) {
           compliteTasc()
        }  
    } 
    console.log( "completed "+ id +' = '+ objOfTasks[id].completed);
    sortCompliteTascks();
  }
}

// 3. Добавить функционал отображения незавершенных задач и всех задач. т.е у вас будет две кнопки над таблицей 1-я 
// "показать все задачи" и 2-я "показать незавершенные задачи",
//  определить завершена задача или нет можно по полю completed в объекте задачи.  По умолчанию при загрузке отображаются все задачи. 
const controlsBtn = document.createElement('div');

const btnAllTascks = document.createElement('button');
btnAllTascks.textContent = "All tascks";
btnAllTascks.classList.add('btn', 'btn-primary', 'mt-4')

const btnCompliteTascks = document.createElement('button');
btnCompliteTascks.classList.add('btn', 'btn-primary', 'mt-4', 'ml-4')
btnCompliteTascks.textContent = "NO Complite tascks";

controlsBtn.appendChild(btnAllTascks);
controlsBtn.appendChild(btnCompliteTascks);
let card = document.querySelector('.card');

card.insertAdjacentElement('afterend', controlsBtn);

const listItem = document.getElementsByTagName('ul')

btnAllTascks.addEventListener('click', (e)=>{
  let arr = Array.from(listItem[0].children);
  arr.forEach((item) => {
    item.classList.remove('displayNone')
  })
  showSort = false;
});

btnCompliteTascks.addEventListener('click', compliteTasc);

function compliteTasc (e){
  let arr = Array.from(listItem[0].children);
   let sortList = arr.filter((item) =>  objOfTasks[item.dataset.taskId].completed === true );
  
   sortList.forEach((item)=>{
   item.classList.add('displayNone')
  })
  showSort = true;
} 
// *Задача со звездочкой. При завершении задачи в разделе "незавершенные задачи" она должна от
//  туда пропадать и быть видна в разделе "все задачи" при этом во всех задачах завершенные задачи 
//  могут быть востановленны. Также в разделе "все задачи" завершенные задачи должны быть в самом 
//  низу после открытых задач.  
function sortCompliteTascks(){
  let arr = Array.from(listItem[0].children);
  let sortList = arr.sort((a, b) => objOfTasks[a.dataset.taskId].completed > objOfTasks[b.dataset.taskId].completed ? 1 : -1);

  arr.forEach((item)=>{ item.remove() });
  
  sortList.forEach((item) => { listContainer.appendChild(item) });
}
sortCompliteTascks()

})(tasks);
