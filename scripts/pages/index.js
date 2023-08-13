/* eslint-disable */
async function displayData(dataRecipes) {
  const recipesSection = document.getElementById("section");

  dataRecipes.forEach((recipe) => {
      const recipeModel = recipeFactory(recipe);
      const recipeCardDOM = recipeModel.getRecipeCardDOM();
      recipesSection.appendChild(recipeCardDOM);
  });

  
  const listCardRecipes = document.querySelectorAll(".recipe-card");
  const totRecipes = document.querySelector(".count-recipes");
  let countRecipes = listCardRecipes.length;
  totRecipes.textContent = countRecipes + " recettes";
  
  let baseDelay = 0.4;
  for (let i = 0; i < countRecipes; i++) {
      listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
      listCardRecipes[i].classList.add("fade-in-recipe"); 
  }

  
  const listOptionsTag = document.querySelectorAll(".list-options-tag");
  for (let optionTag of listOptionsTag) {
      if (optionTag.parentElement.id === "ingrTag") {
          
          let arrListOptionsIngr = new Array();

          for (let recipe of dataRecipes) {
              const listIngredientsRecipe = recipe["ingredients"];
              for (let ingredient of listIngredientsRecipe) {
                  arrListOptionsIngr.push(ingredient["ingredient"]);
              }
          }
          let uniqueOptionsIngr = [...new Set(arrListOptionsIngr)];    
          uniqueOptionsIngr.sort();

          for (let uniqueOp of uniqueOptionsIngr) {
              
              const spanOption = document.createElement('span');
              spanOption.textContent = uniqueOp;
              optionTag.appendChild(spanOption);
          }
      }
      else if (optionTag.parentElement.id === "applTag") {
           
          let arrListOptionsAppl = new Array();

          for (let recipe of dataRecipes) {
              const applianceRecipe = recipe["appliance"];
              arrListOptionsAppl.push(applianceRecipe);
          }
          let uniqueOptionsAppl = [...new Set(arrListOptionsAppl)];     
          uniqueOptionsAppl.sort();

          for (let uniqueOp of uniqueOptionsAppl) {

              const spanOption = document.createElement('span');
              spanOption.textContent = uniqueOp;
              optionTag.appendChild(spanOption);
          }
      }
      else if (optionTag.parentElement.id === "ustenTag") {
         
          let arrListOptionsUst = new Array();

          for (let recipe of dataRecipes) {
              const listUstensilsRecipe = recipe["ustensils"];
              for (let ustensil of listUstensilsRecipe) {
                  arrListOptionsUst.push(ustensil);
              }
          }
          let uniqueOptionsUst = [...new Set(arrListOptionsUst)];     
          uniqueOptionsUst.sort();

          for (let uniqueOp of uniqueOptionsUst) {
              const spanOption = document.createElement('span');
              spanOption.textContent = uniqueOp;
              optionTag.appendChild(spanOption);
          }
      }
  }
}
async function init() { 
  displayData(recipes);
}
init();