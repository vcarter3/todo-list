const pageLoad = (categories) => {
    createContainer();
    const main = document.querySelector("#content > div");

    const createCategoryCard = () => {
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

    const createList = () => {
        const ul = document.createElement("ul");
        ul.className = "list-group";
        renderCategories(ul, categories.current());
        return ul
    }

    const createTodoCard = () => {
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
        selector.appendChild(createDueDate());
        card.appendChild(selector);
        card.appendChild(createTable());

        return card;
    }

    const createTable = () => {
        const table = document.createElement("table");
        table.className = "table table";
        const thead = document.createElement("thead");

        const tr = document.createElement("tr");
        tr.appendChild(createTh("Complete"));
        tr.appendChild(createTh("Todo"));
        tr.appendChild(createTh("Priority"));
        tr.appendChild(createTh("Due"));
        tr.appendChild(createTh("Remove"));

        const tbody = document.createElement("tbody");
        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        return table
    }

    const createTh = (text) => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = text;
        return th
    }

    const createPriority = () => {
        const div = createDiv("d-flex flex-column");
        div.appendChild(createLabel("select-priority", "Priority"));
        const select = document.createElement("select");
        //aria-label="Select from Categories"
        select.className = "form-select";
        select.id = "select-priority";

        select.appendChild(createOption("", "select"));
        select.appendChild(createOption("3", "low"));
        select.appendChild(createOption("2", "medium"));
        select.appendChild(createOption("1", "high"));
        div.appendChild(select);
        return div
    }

    main.appendChild(createCategoryCard());
    main.appendChild(createTodoCard());
}

const createContainer = () => {
    const div = document.createElement("div");
    div.className = "d-flex flex-row justify-content-center align-items-start";
    content.appendChild(div);
}

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

const createInput = (id, placeholder) => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control form-control-lg";
    input.id = id;
    input.placeholder = placeholder;
    return input
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

const createDueDate = () => {
    const div = createDiv("d-flex flex-column");
    div.appendChild(createLabel("date", "Due date:"));
    const input = document.createElement("input");
    input.type = "date";
    input.id = "date";
    input.name = "due date"
    input.value = "";
    div.appendChild(input);
    return div
}

const renderCategories = (ul, names) => {
    names.forEach(category => {
        ul.appendChild(createLi(category.returnTitle()));
    });
}

const createLi = (categoryName) => {
    const li = document.createElement("li");
    if (categoryName == "Brain dump") {
        li.className = "list-group-item active";
    } else { li.className = "list-group-item"; }
    const div = document.createElement("div");
    div.className = "d-flex flex-row justify-content-between";
    div.textContent = categoryName;
    li.appendChild(div);
    return li;
}

const createCheckbox = (checked) => {
    const input = document.createElement("input");
    input.className = "form-check-input me-3";
    input.id = "checkbox"
    input.type = "checkbox"
    input.value = ""
    input.checked = checked;
    return input
}

const degree = (number) => {
    if (number == 1) {
        return "High"
    } else if (number == 2) {
        return "Medium"
    } else {
        return "Low"
    }
}

const badge = (number) => {
    if (number == 1) {
        return "danger"
    } else if (number == 2) {
        return "warning"
    } else {
        return "success"
    }
}

const priorityLogo = (number) => {
    // 1 2 3
    const priority = document.createElement("td");
    priority.className = "todo-priority";
    if (number == "") { return priority }
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

const dateLogo = (deadline) => {
    const date = document.createElement("td");
    if (deadline == "") { return date }
    const div = createDiv("py-2 px-3 me-2 border border-warning rounded-3 d-flex align-items-center bg-light");
    const p = document.createElement("p");
    p.className = "small mb-0";
    const i = document.createElement("i");
    i.className = "bi bi-hourglass-bottom";
    i.textContent = deadline;
    p.appendChild(i);
    div.appendChild(p);
    date.appendChild(div);
    return date
}

const createDiv = (flex) => {
    const div = document.createElement("div");
    div.className = flex;
    return div
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

const createTodo = (todoObj) => {
    const tr = document.createElement("tr");
    const complete = document.createElement("td");
    complete.append(createCheckbox(todoObj.checked));
    if(todoObj.checked){
        tr.id = "strike";
    }else{
        tr.id = "none";
    }
    tr.appendChild(complete);
    const title = document.createElement("td");
    title.className = "todo-title";
    title.textContent = todoObj.title; //todoTitle;
    tr.appendChild(title);
    tr.appendChild(priorityLogo(todoObj.priority));
    tr.appendChild(dateLogo(todoObj.dueDate));
    const remove = document.createElement("td");
    remove.append(createButton("", "bi bi-trash3-fill", "btn btn-danger"))
    tr.appendChild(remove);
    return tr
}


export { pageLoad, renderCategories, createLi, createTodo }