//Отображение того, что есть в модели
export default class View {
    constructor(tasks){
        tasks.forEach((task) => this.renderTask(task))
    }

    //Элементы с которыми работаем
    elements = {
        input: document.getElementById('newTask'),
        form: document.getElementById('form'),
        taskList: document.getElementById('tasksList')
    }

    renderTask(taskObject){
        let completeClass = " "
        let checked = " "

        if (taskObject.status === 'done') {
            completeClass = "completed"
            checked = 'checked'
        }

        const taskHTML = `
                <li class="todo-item" data-id="${taskObject.id}" >
					<label class="todo-item-label">
						<input class="checkbox" type="checkbox" ${checked}/>
						<span class="${completeClass}">${taskObject.text}</span>
						<button class="btn btn-secondary btn-sm" data-delete>Удалить</button>
					</label>
				</li>`

        this.elements.taskList.insertAdjacentHTML('beforeend', taskHTML)
    }

    clearInput(){
        this.elements.input.value = " "
    }

    changeStatus(taskObject){
        //Находим элемент по которому кликнули. тег li
        const taskElement = this.elements.taskList.querySelector(`[data-id="${taskObject.id}"]`)
        const taskTextEl = taskElement.querySelector('span')

        if (taskObject.status === "done") {
            taskTextEl.classList.add('completed')
        } else {
            taskTextEl.classList.remove('completed')
        }
    }

    removeTask(taskObject){
        const taskElement = this.elements.taskList.querySelector(`[data-id="${taskObject.id}"]`)
        taskElement.remove()
    }
}