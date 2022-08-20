import "./scss/styles.scss";
import { pageLoad } from "./modules/page-load";
import { categories, Todo, Category } from "./modules/todo";
import { listeners } from "./modules/page-dom";


const fetchCategoriesLocal = () => {
    const brainDump = new Category("Brain dump");
    let categoriesFetched = [];
    const parsedObj = JSON.parse(localStorage.getItem("categories")); 
    // set default category into categories
    if(parsedObj == null){return [brainDump]}
    parsedObj.forEach(categoryStored => {
        const categoryTemp = new Category(categoryStored.title);
        categoryStored.store.forEach(todoStored => {
            const temp = new Todo(todoStored.checked, todoStored.title, todoStored.priority, todoStored.dueDate);
            categoryTemp.addTodo(temp);
        });
        categoriesFetched.push(categoryTemp);
     });
     return categoriesFetched
}
categories.setCategories(fetchCategoriesLocal())

pageLoad(categories);
listeners(categories);