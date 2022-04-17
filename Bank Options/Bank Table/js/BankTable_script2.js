const banksSelectedAdd = (trID) => {
    banks_selection.push(banks.find( (element) => element.id === trID));
    /* console.log(banks_selection); */
}

const banksSelectedDelete = (trID) => {
    let index = banks_selection.indexOf(banks.find( (element) => element.id === trID));
    banks_selection.splice(index, 1);
    /* console.log(banks_selection); */
}

const addRowClickFunction = e => {
    e.preventDefault ();

    if(e.target.classList.contains('add')) {
        let parent_target = e.target.parentElement;
        addRowFunction(parent_target);
    }
    else if(e.target.classList.contains('delete')) {
        let parent_target = e.target.parentElement;
        deleteRowFunction(parent_target);
    }
}

const addRowFunction = (parent_target) => {
    let tr_Element = parent_target.parentElement;
    let class_target = tr_Element.getAttribute('class');
    let id_target = tr_Element.getAttribute('id');

    let trID = parseInt(id_target);
    banksSelectedAdd(trID);

    let table_row = document.createElement("tr");
    table_row.className = class_target;
    table_row.id = id_target;

    let HTMLclone = tr_Element.innerHTML;
    table_row.innerHTML = HTMLclone;

    table_row.querySelector(".add").remove();   /* Important */
    table_row.querySelector(".delete").classList.add("bstable");

    let add_bank_selected = document.getElementById("banks_selected");
    add_bank_selected.appendChild(table_row);
}

const deleteRowFunction = (parent_target) => {
    let tr_Element = parent_target.parentElement;

    if(tr_Element.querySelector(".delete").classList.contains('bstable')){
        let id_target = parseInt(tr_Element.getAttribute('id'));
        banksSelectedDelete(id_target);
    }
    tr_Element.remove();
}

tbody1.addEventListener("click", (e) => addRowClickFunction(e) );
tbody2.addEventListener("click", (e) => addRowClickFunction(e) );

