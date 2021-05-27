"use strict"

function renderCoffee(coffee) {

    var container = document.createElement("div");
    container.className = "d-flex mx-1"

    var child1 = document.createElement("div");
    child1.innerText = "# " + coffee.id;
    child1.className = "mx-1";
    container.appendChild(child1);

    var child2 = document.createElement("div");
    child2.innerText = coffee.name ;
    child2.className = "mx-1";
    container.appendChild(child2);

    var child3 = document.createElement("div");
    child3.innerText = coffee.roast;
    child3.className = "mx-1";
    container.appendChild(child3);

    return container;

}

function nameSearch(coffees) {

    var input = document.getElementById("searchbar").value.toLowerCase();
    document.getElementById("user-input").innerHTML = "You wrote: " + input;

    var list = [];

    for (var i = 0; i < coffees.length; i++) {
        if (coffees[i].name.toLowerCase().includes(input.toLowerCase()) && (coffees[i].roast === roastSelection.value || roastSelection.value === "all")) {
            list.push(coffees[i]);
        }
    }
    tbody.innerHTML = " ";
    for (let coffee of renderCoffees(list.sort())) {
        tbody.appendChild(coffee);
    }
}

function renderCoffees(coffees) {
    var list = [];
    for (var i = 0; i < coffees.length; i++) {
        list.push(renderCoffee(coffees[i]));
    }
    return list;
}

function updateCoffees(e) {

    if(e) {
        e.preventDefault(); // don't submit the form, we just want to update the data
    }
    var selectedRoast = roastSelection.value;

    var filteredCoffees = [];

    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        }
        if (selectedRoast === "all") {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = " ";
    for (let coffee of renderCoffees(filteredCoffees)) {
        tbody.appendChild(coffee);
    }
}

function addCoffee(e){
    //This function will add coffees that user wish to add
    // to our object array called coffees

    e.preventDefault();
    let coffee = {
        id: coffees.length+1,
        name: newCoffeeName(),
        roast: newRoast(),
    }

    coffees.push(coffee);
    updateCoffees();
}

function newCoffeeName(){
    return document.getElementById("addCoffeeInput").value;
}

function newRoast(){
    return document.getElementById("roast-selection-add").value;
}

function removeCoffee(e){
    // This function will remove coffees that user wish to remove
    // to our object array called coffees

    e.preventDefault();

    let index1 = document.getElementById("addCoffeeInput").value.toLowerCase();
    let index2 = document.getElementById("roast-selection-add").value;

    for(var i = 0; i < coffees.length; i++) {
        if (index1 === coffees[i].name.toLowerCase() && index2 === coffees[i].roast) {
            coffees.splice(i, 1);
        }
    }
    updateCoffees();
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide

var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

var tbody = document.getElementById("coffees");
// var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');

// submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees);

// Create an eventlistener for a new button that will add coffees
var addNew = document.getElementById("add");
addNew.addEventListener('click', addCoffee);

//create a new event listener for a remove button
var removeNew = document.getElementById("remove");
removeNew.addEventListener('click', removeCoffee);

window.addEventListener('DOMContentLoaded', (event) => {
    updateCoffees();
});