"use strict";

const searchBtn = document.getElementById("search");
const searchInput = document.querySelector("input");
const dataContainer = document.getElementById("data");
const modal = document.querySelector(".modal-body");
const error = document.querySelector(".errorrs");

searchBtn.addEventListener("click", function () {
  let text = searchInput.value.trim();
  getMeal(text);
});

async function getMeal(meal = "carrot") {
  try {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    if (response.ok) {
      let result = await response.json();
      let meals = result.recipes;
      if (!meals || meals.length === 0) {
        error.classList.remove("d-none");
        dataContainer.innerHTML = "";
      } else {
        error.classList.add("d-none");
        displayMeals(meals);
      }
    } else {
      error.classList.remove("d-none");
      dataContainer.innerHTML = ""; 
    }
  } catch (error) {
    console.log("errrorr", error);
    error.classList.remove("d-none");
    dataContainer.innerHTML = "";
  }
}

async function getRecipes(index) {
  try {
    let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${index}`);
    if (response.ok) {
      let result = await response.json();
      let recipe = result.recipe;
      modal.innerHTML = `<img src="${recipe.image_url}" class="w-100" alt="${recipe.title}">`;
    }
  } catch (error) {
    console.log("errrorr", error);
  }
}

function displayMeals(meals) {
  let cartona = "";
  for (let i = 0; i < meals.length; i++) {
    cartona += `
      <div class="col-md-6 col-lg-3">
        <div class="card h-100 shadow-sm">
          <img src="${meals[i].image_url}" class="card-img-top object-fit-cover" alt="${meals[i].title}">
          <div class="card-body text-center">
            <h3 class="fs-5 text-truncate">${meals[i].title}</h3>
            <button onclick="getRecipes('${meals[i].recipe_id}')"  
              data-bs-toggle="modal" data-bs-target="#exampleModal" 
              class="btn btn-info text-white w-100 mt-2">
              Show Details
            </button>
          </div>
        </div>
      </div>
    `;
  }
  dataContainer.innerHTML = cartona;
}

getMeal();