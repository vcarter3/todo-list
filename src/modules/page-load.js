const pageLoad = (content) => {
    const todaysDate = () => {
        // format Today is the __ st/nd/th of __ 
        var today = new Date();
        var dd = today.getDate();
        if (dd == "1" || dd == "21" || dd == "31") {
            dd = dd + "st";
        } else if (dd == "2" || dd == "22") {
            dd = dd + "nd"
        } else if (dd == "3" || dd == "23") {
            dd = dd + "rd"
        } else {
            dd = dd + "th"
        }
        var mm = today.getMonth() // Jan is 0
        const months = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        return "Today is the " + dd + " of " + months[mm];
    }
    const createContainer = () => {
        const div = document.createElement("div");
        div.className = "d-flex flex-row justify-content-center align-items-start";
        content.appendChild(div);
    }
    createContainer();
    const main = document.querySelector("#content > div");

    const createCategoryCard = (title) => {
        const card = document.createElement("card");
        card.className = "card";
        card.style = "padding: 1em";
        const cardTitle = document.createElement("h3");
        cardTitle.textContent = "Categories";
        card.appendChild(cardTitle);
        card.appendChild(createList());

        const div = createDiv("d-flex flex-column");
        div.appendChild(createButton("Remove category ", "bi bi-folder-minus", "btn btn-danger"));
        div.appendChild(createInput("categoryInput", "My next project..."));
        div.appendChild(createButton("Add category ", "bi bi-folder-plus", "btn btn-primary"));
        card.appendChild(div);
        return card;
    }

    const createLi = (categoryName) => {

        //default not active
        //active use 
        //  class="list-group-item active" aria-current="true"
        const li = document.createElement("li");
        li.className = "list-group-item";
        const div = document.createElement("div");
        div.className = "d-flex flex-row justify-content-between";
        div.textContent = categoryName;
        li.appendChild(div);
        return li;
    }

    const createList = () => {
        const ul = document.createElement("ul");
        ul.className = "list-group";
        ul.appendChild(createLi("Brain dump"));
        ul.appendChild(createLi("Home"));
        ul.appendChild(createLi("Work"));
        return ul
    }

    const createButton = (description, icon, style) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = description;
        button.className = style;
        const i = document.createElement("i");
        i.className = icon;
        button.appendChild(i);
        return button
    }

    const createInput = (id, placeholder) => {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "form-control form-control-lg";
        input.id = id;
        input.placeholder = placeholder;
        return input
    }

    const createDiv = (flex) => {
        const div = document.createElement("div");
        div.className = flex;
        return div
    }

    const createTodoCard = (title) => {
        const card = document.createElement("card");
        card.className = "card";
        card.style = "padding: 1em";
        const cardTitle = document.createElement("h3");
        cardTitle.textContent = todaysDate();
        card.appendChild(cardTitle);
        const div = createDiv("d-flex flex-column");
        div.appendChild(createLabel("next todo", "My next todo"));
        const divInner = createDiv("d-flex flex-row");
        divInner.appendChild(createInput("next todo", "Walk my cat"));
        divInner.appendChild(createButton("Add", "bi bi-file-earmark-plus", "btn btn-primary"))
        div.appendChild(divInner);
        card.appendChild(div);

        const selector = createDiv("d-flex flex-row");
        selector.appendChild(createPriority());
        selector.appendChild(createCategory());
        selector.appendChild(createDueDate());
        card.appendChild(selector);

        card.appendChild(createTable());

        return card;
    }

    const createTable = ()=>{
        const table = document.createElement("table");
        table.className = "table table";
        const thead = document.createElement("thead");

        const tr = document.createElement("tr");
        tr.appendChild(createTh("Complete"));
        tr.appendChild(createTh("Todo"));
        tr.appendChild(createTh("Priority"));
        tr.appendChild(createTh("Due"));
        tr.appendChild(createTh("Remove"));

        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(createTbody());

        return table
    }

    const createTh = (text)=>{
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = text;
        return th
    }

    const createTbody = () => {
        const tbody = document.createElement("tbody");
        tbody.appendChild(createTodo("Water plants", 1 , "28th Jun 2020"));
        tbody.appendChild(createTodo("Smile at sky", 2 , "50th Jun 2020"));
        tbody.appendChild(createTodo("Feed fish", 3 , "5th Feb 2090"));
        return tbody
    }

    const createTodo = (todoTitle,priority, todoDate) => {
        const tr = document.createElement("tr");

        const complete = document.createElement("td");
        complete.append(createButton("","bi bi-check-lg", "btn btn-success"));
        tr.appendChild(complete);

        const title = document.createElement("td");
        title.className = "todo-title";
        title.textContent = todoTitle;
        tr.appendChild(title);

        tr.appendChild(priorityLogo(priority));

        const date = document.createElement("td");
        const div = createDiv("py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light");
        const p = document.createElement("p");
        p.className = "small mb-0";
        const i = document.createElement("i");
        i.className = "bi bi-hourglass-bottom";
        i.textContent = todoDate;
        p.appendChild(i);
        div.appendChild(p);
        date.appendChild(div);
        tr.appendChild(date);

        const remove = document.createElement("td");
        remove.append(createButton("","bi bi-trash3-fill", "btn btn-danger"));
        tr.appendChild(remove);
        
       return tr
    }

    
    const degree = (number) => {
        if(number == 1){
            return "High"
        } else if(number == 2){
            return "Medium"
        }else{
            return "Low"
        }
    }

    const badge = (number) =>{
        if(number == 1){
            return "danger"
        } else if(number == 2){
            return "warning"
        }else{
            return "success"
        }
    }
    
    const priorityLogo = (number) => {
        // 1 2 3
        const priority = document.createElement("td");
        priority.className = "todo-priority";
        const mb = document.createElement("h6");
        mb.className = "mb-0";
        const span = document.createElement("span");
        // danger,  warning,  success
        span.className = "badge bg-" + badge(number);
        span.textContent = degree(number);
        mb.appendChild(span);
        priority.appendChild(mb);
        return priority
    }



    const createPriority = () => {
        const div = createDiv("d-flex flex-column");
        div.appendChild(createLabel("select-priority", "Priority"));
        const select = document.createElement("select");
        //aria-label="Select from Categories"
        select.className = "form-select";
        select.id = "select-priority";

        select.appendChild(createOption("selected", "select"));
        select.appendChild(createOption("1", "low"));
        select.appendChild(createOption("2", "medium"));
        select.appendChild(createOption("3", "high"));
        div.appendChild(select);
        return div
    }
    const createCategory = () => {
        const div = createDiv("d-flex flex-column");
        div.appendChild(createLabel("select-category", "Category"));
        const select = document.createElement("select");
        //aria-label="Select from Categories"
        select.className = "form-select";
        select.id = "select-category";

        select.appendChild(createOption("selected", "Brain dump"));
        select.appendChild(createOption("1", "Home"));
        select.appendChild(createOption("2", "Work"));
        select.appendChild(createOption("3", "School"));
        div.appendChild(select);
        return div
    }

    const createDueDate = () => {
        const div = createDiv("d-flex flex-column");
        div.appendChild(createLabel("date", "Due date:"));
        //<input type="date" id="date" name="due date" value="" min="2022-17-08"></input>
        const input = document.createElement("input");
        input.type = "date";
        input.id = "date";
        input.name = "due date"
        input.value = "";
        input.min = "2022-17-08"; // change to todays date

        div.appendChild(input);
        return div
    }

    

    const createOption = (value, text) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = text;
        return option
    }

    const createLabel = (id, name) => {
        const label = document.createElement("label");
        label.htmlFor = id;
        label.className = "form-label";
        label.textContent = name;
        return label
    }

    main.appendChild(createCategoryCard());
    main.appendChild(createTodoCard());

}
export { pageLoad }