  //Variáveis
  const inputAddTask = document.querySelector("#input-add-task");
  const buttonAddTask = document.querySelector("#button-add-task");
  const listTodo = document.querySelector(".list-todo");
  const selectOptions = document.querySelector('select');
  const searchBox = document.querySelector('.searchBox')
  const oldValue = [];

  // Funções
  // ↓ Função para criar os elementos Todo
  function createTodo(text) {
    // cria uma div, para anexar os demais elementos nela
    const div = document.createElement("div");
    div.classList.add("todo");
    listTodo.appendChild(div);

    // cria um titulo e adiciona o nome que o usuário colocou pelo argumento text
    const h3 = document.createElement("h3");
    h3.classList.add("list-title");
    h3.innerText = text.trim();

    // cria um botão e adicina o icone de checkagem e logo adicona ela numa classe 
    const buttonCheck = document.createElement("button");
    buttonCheck.innerHTML = '<i class="fa-solid fa-check"></i>';
    buttonCheck.classList.add("list-buttons-margin-left", "buttonCheck");
    buttonCheck.type = "button";

    // cria um botão e adicina o icone de editar e logo adicona ela numa classe 
    const buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    buttonEdit.classList.add("list-buttons", "buttonEdit");
    buttonEdit.type = "button"

    // cria um botão e adicina o icone de delete e logo adicona ela numa classe 
    const buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = '<i class="fa-solid fa-delete-left"></i>';
    buttonDelete.classList.add("list-buttons", "buttonDelete" );
    buttonDelete.type = "button";

    div.append(h3, buttonCheck, buttonEdit, buttonDelete);
    //BOTÃO DE CHECK
    buttonCheck.addEventListener("click", () => {
      // caso clique no botão, coloca o elemento em uma classe done, na qual risca a palavra do elemento
      h3.classList.toggle("done");
      
    });

    const h3BeforeValue = h3.innerText;
    // BOTÃO DE EDITAR
    buttonEdit.addEventListener("click", (e) => {
    
      const eTarget = e.target.closest('div');
      const inputButtonFromEdit = document.createElement('button');
      inputButtonFromEdit.setAttribute('class', 'button-input-edit');
      inputButtonFromEdit.innerHTML = '<i class="fa-solid fa-check"></i>';
      eTarget.appendChild(inputButtonFromEdit);

      const input = document.createElement('input');
      input.setAttribute('class', 'edit-input');

      const todoButtons = [buttonCheck, buttonDelete, buttonEdit];

      todoButtons.forEach(function (value) {
        value.classList.add('display-none');
        value.classList.remove('display-block');
      });

      input.setAttribute('placeholder', 'Editar...');
      h3.replaceWith(input);

     
      //BOTAO DE EDITAR
      inputButtonFromEdit.addEventListener('click', () => {
       
        if (input.value === '' || oldValue.includes(input.value)) {
          window.alert('Sua lista está vazia ou possui o mesmo nome que estava!');
        } else {
          const index = oldValue.indexOf(h3BeforeValue);
          if (index !== -1) {
            oldValue.splice(index, 1);  
          }

          h3.innerHTML = input.value;
          oldValue.push(input.value);
          input.replaceWith(h3);
          inputButtonFromEdit.remove();
          h3.classList.remove('done');
          todoButtons.forEach(function (value) {
            value.classList.add('display-block');
            value.classList.remove('display-none');
          });
        }
      });

    });

    // BOTÃOD DE APAGAR
    buttonDelete.addEventListener('click', (e) => {
      // Botão de apagar, seleciona o elemento e ao clicar no botão apaga a div do mesmo
      const eTarget = e.target.closest('div');
      const h3Value = eTarget.querySelector('h3').innerText;
      const indexOldValue = oldValue.indexOf(h3Value);
     
      oldValue.splice(indexOldValue, 1);
      eTarget.remove();
    });

  }

  // Eventos
  buttonAddTask.addEventListener("click", () => {
     
    const valueInputAddTask = inputAddTask.value.trim();
    if (valueInputAddTask === "" || oldValue.includes(valueInputAddTask)) {
      window.alert('Já existe uma a fazer igual, ou o espaço está vazio');
      return;
    } else {
      createTodo(valueInputAddTask);
      oldValue.push(valueInputAddTask);
    }
  })
  
  selectOptions.addEventListener('change', ()=>{
    const todoDivsListTitle = listTodo.querySelectorAll('.list-title');
    let tempVariable;
    // nova feaure aqui
    
    switch(selectOptions.value){
      case 'all':
        todoDivsListTitle.forEach(function(value){
          tempVariable = value.closest('div');
          tempVariable.classList.remove('display-none');
        
        });
        break;
        case 'Todo':
          todoDivsListTitle.forEach(function(value){
            tempVariable = value.closest('div');
            tempVariable.classList.remove('display-none');
            value.classList.contains('done') ? tempVariable.classList.add('display-none') : null;
          });
          break;
        case 'done':
          todoDivsListTitle.forEach(function(value){
            tempVariable = value.closest('div');
            tempVariable.classList.remove('display-none');
            !value.classList.contains('done')  ? tempVariable.classList.add('display-none') : null; 
          })
          break;
    }
  })

  searchBox.addEventListener('input', ()=>{
    const searchBoxValue = searchBox.value;
    const alldivs = listTodo.querySelectorAll('h3');

    console.log(alldivs)

    alldivs.forEach(element=>{
      const elementText = element.textContent.trim().toLowerCase();
      const closestElementDiv = element.closest('div');

        if(!elementText.startsWith(searchBoxValue.trim())){
          closestElementDiv.style.display = 'none'
        }

        else{
          closestElementDiv.style.removeProperty('display');
        }
    })
  })




 // ULTIMA FEATURE

