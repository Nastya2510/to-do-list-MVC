//Модель - это источник данных, единственный
export default class Model {
    constructor (){
        this.tasks = [];
        this.loadFromLocalStorage()
    }

    saveToLocalStorage(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }

    loadFromLocalStorage(){
        //Получили JSON строчку под ключом tasks
        const data = localStorage.getItem('tasks')
        if (data){
            this.tasks = JSON.parse(data)
        }
    }

    //Добавление задачи
    addTask(text){
        let id = 1
        if (this.tasks.length > 0) {
            id = this.tasks[this.tasks.length - 1]['id'] + 1
        }
        //Создали объект с задачей
        const newTask = {
            id: id,
            status: 'active',
            text: text,
        }
        //Записываем объект с задачей в список tasks
        this.tasks.push(newTask)
        this.saveToLocalStorage()

        return newTask
    }
    
    //Задача выполнена
    doneTask(task){
        if (task.status === "active"){
            task.status = "done"
        } else {
            task.status = "active"
        }

        this.saveToLocalStorage()
    }

    //Удаление задачи
    removeTask(task){
        const index = this.tasks.indexOf(task)
        this.tasks.splice(index, 1)
        this.saveToLocalStorage()
    }

    //Метод поиска задачи по id
    findTask(id){
        const task = this.tasks.find(function(task){
            if (task.id === parseInt(id)){
                return true
            }
        })
        return task
    }

}