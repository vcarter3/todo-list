const categories = (() => {
    // module
    let categories = [];
  
    const current = () => categories;
  
    const addNew = (newCategory) => {
        for(let i=0; i<categories.length; i++){
            if(newCategory == categories[i]) return
        }
        categories.push(newCategory);
    };

    const removeCategory = (category) =>{
        categories = categories.filter(element => element != category)
    }

    return {
      current,
      addNew,
      removeCategory
    };
  })();

class Todo {
    constructor(title, description, deadline, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = deadline
        this.priority = priority
    }
    returnTitle() {
        return this.title;
    }
}

let eat = new Todo("eat", "now", "today");
console.log(eat.returnTitle());

//categories.addNew("Food");
//categories.addNew("Work");
//categories.addNew("School");
console.log(categories.current());
//categories.addNew("School");
console.log(categories.current());
categories.removeCategory("Work");
console.log(categories.current());

export {categories}