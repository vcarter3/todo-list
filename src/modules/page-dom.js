import { Category, Todo } from "./todo";
import { renderCategories, createTodo } from "./page-load";

const listeners = (categories) => {

    const getActive = () => {
        // gets selected active category title
        let active = "";
        const list = document.querySelector("#content > div > card:nth-child(1) > ul");
        [...list.children].forEach(element => {
            if (element.className == "list-group-item active") {
                active = element.firstChild.textContent;
            }
        });
        return active
    }

    const getActiveCategory = () => {
        // gets category from selected active title
        let active = '';
        categories.current().forEach(element => {
            if (getActive() == element.title) {
                active = element // category
            }
        });
        return active
    }
    const removeTodo = () => {
        const buttons = document.querySelectorAll("#content > div > card:nth-child(2) > table > tbody > tr > td > button");
        buttons.forEach(button => {
            button.addEventListener("click", (e) => {
                let todoTitle = [...e.target.parentElement.parentElement.children][1].textContent;
                getActiveCategory().removeTodoFromTitle(todoTitle);
                e.target.parentElement.parentElement.remove()
                saveCategoriesLocal(categories);
            })
        });
    }

    const updateCheckers = () => {
        const checkers = document.querySelectorAll("#checkbox");
        checkers.forEach(checker => {
            checker.addEventListener("click", (e) => {
                let todoTitle = [...e.target.parentElement.parentElement.children][1].textContent;
                getActiveCategory().findTodo(todoTitle).flipChecker();
                renderActiveTodos();
                saveCategoriesLocal(categories);
            })
        })
    };

    const renderActiveTodos = () => {
        const tbody = document.querySelector("#content > div > card:nth-child(2) > table > tbody");
        [...tbody.children].forEach(element => {
            element.remove();
        });
        let activeCategory = getActiveCategory();
        activeCategory.store.forEach(todo => {
            tbody.appendChild(createTodo(todo));
            
        });
        
        removeTodo();
        updateCheckers();
        saveCategoriesLocal(categories);

    }
    renderActiveTodos();


    const activateCategories = () => {
        const categoriesDisplay = document.querySelectorAll("#content > div > card:nth-child(1) > ul li div");
        categoriesDisplay.forEach(category => {
            category.addEventListener("click", (e) => {
                let selected = e.target.parentElement;
                selected.className = "list-group-item active";
                let siblings = [...selected.parentElement.children].filter(ele => ele != selected);
                siblings.forEach(sibling => {
                    sibling.className = "list-group-item";
                })
                renderActiveTodos();
            }
            )
        });
    }
    activateCategories();



    const removeCategory = document.querySelector("#content > div > card:nth-child(1) > div > button.btn.btn-danger");
    removeCategory.addEventListener("click", (e) => {
        let selected = document.querySelector("#content > div > card:nth-child(1) > ul > li.list-group-item.active>div");
        if (selected.textContent == "Brain dump") {
            alert("Cannot remove the default category")
            return
        } else if (confirm("Are you sure you want to delete " + selected.textContent + " you will lose all you todos from this category")) {
            selected.parentElement.remove();
            categories.removeCategory(selected.textContent);
            const newSelected = document.querySelector("#content > div > card:nth-child(1) > ul > li.list-group-item");
            newSelected.className = "list-group-item active";
            renderActiveTodos();
        }
    })

    const addCategory = document.querySelector("#content > div > card:nth-child(1) > div > button.btn.btn-primary");
    const categoryInput = document.querySelector("#categoryInput");
    addCategory.addEventListener("click", (e) => {

        if (categoryInput.value == "") return
        const newCategory = new Category(categoryInput.value);
        categories.addNew(newCategory);
        categoryInput.value = "";

        const list = document.querySelector("#content > div > card:nth-child(1) > ul");
        [...list.children].forEach(element => {
            element.remove();
        });
        renderCategories(list, categories.current());
        activateCategories();
        saveCategoriesLocal(categories);
    })

    const addNewTodo = document.querySelector("#content > div > card:nth-child(2) > div.d-flex.flex-column > div > button");
    addNewTodo.addEventListener("click", () => {
        // collect user info
        let title = document.querySelector("#next\\ todo");
        let dueDate = document.querySelector("#date");
        if (title.value == "") { return }
        let priority = document.querySelector("#select-priority");
        

        let newTodo = new Todo(false, title.value, priority.value, dateFormat(dueDate))
        console.log(dueDate.value)
        getActiveCategory().addTodo(newTodo);
        renderActiveTodos();
        title.value = ""
        priority.value = ""
        dueDate.value = ""
    })
}

const saveCategoriesLocal = (categories) => {
    localStorage.clear();
    const jsonCategories = JSON.stringify(categories.current());
    localStorage.setItem("categories", jsonCategories);
    console.log(localStorage.getItem("categories"));
}

const dateFormat = (date) => {
    if (date.value != "") {
        return date.valueAsDate.toString().substring(0, 15);
    } else {
        return date.value
    }
}


export { listeners }