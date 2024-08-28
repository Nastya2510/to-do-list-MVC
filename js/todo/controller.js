import Model from "./model.js"
import View from './view.js'

//Создадим объект на основе класса, который мы импортировали
const model = new Model()
const view = new View(model.tasks)

//Прослушка submit. Добавление задачи
view.elements.form.addEventListener('submit', function(e){
    //При отправке формы страница не изменяется
    e.preventDefault()
    const newTask = model.addTask(view.elements.input.value)
    view.renderTask(newTask)
    view.clearInput()
})

//Нажатие на чек бокс. Нажали на чек бокс или кнопку УДАЛИТЬ
view.elements.taskList.addEventListener('click', function(e){
    //Находим id задачи на которую кликнули
    if (e.target.getAttribute('type') === 'checkbox'){
        const id = e.target.closest('.todo-item').dataset.id
        const task = model.findTask(id)
        model.doneTask(task)
        view.changeStatus(task)
    }

    //Клик по кнопке УДАЛИТЬ
    if (e.target.hasAttribute('data-delete')){
        //Поднимаемся до родительского элемента
        const id = e.target.closest('.todo-item').dataset.id
        //Находим задачу по индексу
        const task = model.findTask(id)
        model.removeTask(task)
        view.removeTask(task)
    }

})