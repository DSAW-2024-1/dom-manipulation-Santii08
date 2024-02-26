let tasks = [];

function agregarTarea() {
  const nuevaTarea = document.getElementById('newTask').value;
  const fechaTarea = document.getElementById('dueDate').value;

  // Verificar si el nombre y la fecha no están vacíos
  if (nuevaTarea.trim() === '' || fechaTarea === '') {
    alert('Por favor, completa el nombre y la fecha de la tarea.');
    return;
  }

  tasks.push({ name: nuevaTarea, dueDate: fechaTarea, completed: false });

  document.getElementById('taskForm').reset();
  actualizarListaTareas();
}
function actualizarListaTareas() {
  const diaSeleccionado = document.getElementById('selectDay').value;
  const tareasFiltradas = (diaSeleccionado === 'all') ? tasks : tasks.filter(tarea => obtenerDiaSemana(tarea.dueDate) == diaSeleccionado);

  const listaTareas = document.getElementById('taskList');
  listaTareas.innerHTML = '';

  if (tareasFiltradas.length === 0) {
    listaTareas.innerHTML = '<p>There are no tasks assigned for this day.</p>';
  } else {
    tareasFiltradas.forEach((tarea, index) => {
      const elementoLista = document.createElement('li');
      elementoLista.className = 'list-group-item d-flex justify-content-between align-items-center';

      // Agregar casilla de verificación
      elementoLista.innerHTML = `
        <div>
          <input type="checkbox" id="checkbox-${index}" onchange="marcarComoCompletada(${index})" ${tarea.completed ? 'checked' : ''}>
          <label for="checkbox-${index}" class="ms-2 ${tarea.completed ? 'tachado' : ''}">${tarea.name} - ${tarea.dueDate}</label>
        </div>
        <button class="btn btn-danger btn-sm" onclick="eliminarTarea(${index})">Delete</button>
      `;

      listaTareas.appendChild(elementoLista);
    });
  }
}

  

  function filterTasks() {
    actualizarListaTareas();
  }

  function obtenerDiaSemana(fecha) {
    const diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const fechaSeleccionada = new Date(fecha);
    return fechaSeleccionada.getDay();
  }

  function mostrarContenidoTarea(tarea) {
    const contenidoPrincipal = document.querySelector('.main-content');
    contenidoPrincipal.innerHTML = `<h1>${tarea.name}</h1><p>Fecha de entrega: ${tarea.dueDate}</p>`;
  }

  function mostrarContenido(dia) {
    // Mostrar contenido específico según el día
    const contenidoPrincipal = document.querySelector('.main-content');
    contenidoPrincipal.innerHTML = `<h1>Contenido para ${dia}</h1>`;
  }
  function eliminarTarea(index) {
    tasks.splice(index, 1);
    actualizarListaTareas();
  }
  
  function marcarComoCompletada(index) {
    
    tasks[index].completed = !tasks[index].completed;
    actualizarListaTareas();
  }