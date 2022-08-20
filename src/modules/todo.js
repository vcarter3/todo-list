const categories = (() => {
    let categories = [];
    const current = () => categories;
    const addNew = (newCategory) => {
        categories.forEach(category => {
            if (newCategory.returnTitle() == category.returnTitle()){
                return
            }
        });
        categories.push(newCategory);
    };
    const removeCategory = (categoryName) => {
        categories = categories.filter(element => element.returnTitle() != categoryName);
    }
    const setCategories = (array) => {
        categories = array;
    }

    return {
        current,
        addNew,
        removeCategory,
        setCategories
    };
})();

class Category {
    constructor(title) {
        this.title = title;
        this.store = [];
    }

    findTodo(todoTitle){
        return this.store.filter(element => element.title == todoTitle)[0]
    }

    returnTitle(){
        return this.title;
    }
    returnTodos() {
        return this.store;
    }

    addTodo(todo) {
        for (let i = 0; i < this.store.length; i++) {
            if (todo.title == this.store[i].title){ return}
        }
        this.store.push(todo);
    }

    removeTodo(todo) {
        this.store = this.store.filter(element => element != todo)
    }

    removeTodoFromTitle(todoTitle) {
        this.store = this.store.filter(element => element.title != todoTitle)
    }
}

class Todo {
    constructor(checked, title, priority, deadline) {
        this.checked = checked;
        this.title = title;
        this.dueDate = deadline
        this.priority = priority
    }
    returnTitle() {
        return this.title;
    }

    flipChecker(){
        this.checked = !this.checked;
    }
}

export {categories , Todo, Category}