import "./scss/styles.scss";
import * as bootstrap from 'bootstrap';
import { pageLoad } from "./modules/page-load";
import { categories } from "./modules/todo";

const content = document.querySelector("#content");
pageLoad(content);


//categories.addNew("Food");
//categories.addNew("Work");
//categories.addNew("School");
//console.log(categories.current());
//categories.addNew("School");
//console.log(categories.current());
//categories.removeCategory("Work");
//console.log(categories.current());