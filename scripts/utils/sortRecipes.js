/* eslint-disable */
const searchBar = document.querySelector(".search-bar");
const controlText = document.querySelector(".control-text");
const listTitleRecipes = document.querySelectorAll(".recipe-card__content h2");
const listCardRecipes = document.querySelectorAll(".recipe-card");
const listIngrRecipes = document.querySelectorAll(".recipe-card__content__ingredients__ingredient h4");
const totRecipes = document.querySelector(".count-recipes");
let resultEvent;
let searchRecipe;
let indexRecipe;
const accent = [
    /[\300-\306]/g, /[\340-\346]/g, 
    /[\310-\313]/g, /[\350-\353]/g, 
    /[\314-\317]/g, /[\354-\357]/g, 
    /[\322-\330]/g, /[\362-\370]/g, 
    /[\331-\334]/g, /[\371-\374]/g,
    /[\321]/g, /[\361]/g, 
    /[\307]/g, /[\347]/g, 
];
const noAccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

let valueOption;
let arrTag = [];
let indexTag;

const headerRecipeTag = document.querySelectorAll(".recipes-filter__header");
const tagFilterRecipes = document.querySelector(".recipes-filter__tag");
const iconRecipeTag = document.querySelectorAll(".recipes-filter__header i");
const searchTag = document.querySelectorAll(".search-tag");
const controlTextRecipeTag = document.querySelectorAll(".search-tag__input");
const optionsTag = document.querySelectorAll(".list-options-tag");
const arrOptionsTag = Array.from(optionsTag);
const listOptionsTag = document.querySelectorAll(".list-options-tag span");
const noRecipeFound = document.querySelector(".no-recipe-found");



controlText.addEventListener("input", () => {
    displayRecipes();
});

headerRecipeTag.forEach((header, index) => header.addEventListener("click", () => {
    indexTag = index;
    displayHideOptionsOfTag(indexTag)
})); 
listOptionsTag.forEach((option) => option.addEventListener("click", (event) => {

    indexTag = arrOptionsTag.indexOf(option.parentElement);
    valueOption = event.target.textContent;

    if (arrTag.length == 0) {
        createTag(valueOption);
        arrTag.push(valueOption);
        displayRecipes();
        displayHideOptionsOfTag(indexTag);
    }
    else {
        let countTag = 0;
        for (let tag of arrTag) {
            if (tag == valueOption) {
                countTag += 1;
            }
        }
        if (countTag == 0) {
            createTag(valueOption);
            arrTag.push(valueOption);
            displayRecipes();
            displayHideOptionsOfTag(indexTag);
        }
    }

}));
controlTextRecipeTag.forEach((text, index) => text.addEventListener("input", () => {
    displayOptions(index);
}));



function displayHideOptionsOfTag(index) {

    if (searchTag[index].style.display == "block" && optionsTag[index].style.display == "flex") {
        searchTag[index].style.display = "none";
        optionsTag[index].style.display = "none";
        iconRecipeTag[index].classList.remove("fa-rotate-180");
        controlTextRecipeTag[index].value = "";
        for (let option of optionsTag[index].childNodes) {
            option.style.display = "block";
        }
    }
    else {
        searchTag[index].style.display = "block";
        controlTextRecipeTag[index].focus();
        optionsTag[index].style.display = "flex";
        iconRecipeTag[index].classList.add("fa-rotate-180");
        controlTextRecipeTag[index].value = "";
        for (let option of optionsTag[index].childNodes) {
            option.style.display = "block";
        }
    }
}
function displayOptions(index) {

    let textSearchUser = removeAccentText(controlTextRecipeTag[index].value);
    let regexSearch = new RegExp(textSearchUser);;
    let resultSearch = [];
    let optionTag;

    
    for (let option of optionsTag[index].childNodes) {

        optionTag = removeAccentText(option.textContent);

        if (optionTag.match(regexSearch) !== null) {
            resultSearch.push(option);
        }

    }
    
    for (let option of optionsTag[index].childNodes) {
        option.style.display = "none";
        for (let result of resultSearch) {
            if (option === result) {
                option.style.display = "block";
            }
        }
    }

}
function controlSearchBar() {

    if (controlText.value == "") {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "";
        resultEvent = "false";
    }
    else if (controlText.value.length < 3) {
        searchBar.dataset.errorVisible = "true";
        searchBar.dataset.error = "Veuillez saisir au moins plus de 3 caractères.";
        resultEvent = "false";
    }
    else {
        searchBar.dataset.errorVisible = "false";
        searchBar.dataset.error = "";
        resultEvent = "true";
        searchRecipe = controlText.value;
    }
    return { resultEvent, searchRecipe };
}
function removeAccentText(text) {
    strText = text.toLowerCase(); 
    for (let i = 0; i < accent.length; i++) {
        strText = strText.replace(accent[i], noAccent[i]);
    }

    return strText;
}
function filterBySearchBar() { 

    if (controlSearchBar().resultEvent == "true") {

        let textSearchUser = removeAccentText(controlSearchBar().searchRecipe);
        let arrTextSearchUser = textSearchUser.split(' '); 
        let regexSearch;
        let resultSearch = [];

       
        for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

            for (let searchUser of arrTextSearchUser) {
                regexSearch = new RegExp(searchUser);

                
                let titRecipe = removeAccentText(recipes[indexRecipe].name);

                if (titRecipe.match(regexSearch) !== null && titRecipe.match(regexSearch)[0].length > 2) {
                   
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }

                
                const listIngredientsRecipe = recipes[indexRecipe].ingredients;
                for (let ingredient of listIngredientsRecipe) {
                    let ingrRecipe = removeAccentText(ingredient.ingredient);

                    if (ingrRecipe.match(regexSearch) !== null && ingrRecipe.match(regexSearch)[0].length > 2) {
                       
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
        
               
                let appliRecipe = removeAccentText(recipes[indexRecipe].appliance);

                if (appliRecipe.match(regexSearch) !== null && appliRecipe.match(regexSearch)[0].length > 2) {
                   
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }
        
               
                const listUstensilsRecipe = recipes[indexRecipe].ustensils;
                for (let ustensils of listUstensilsRecipe) {
                    let ustenRecipe = removeAccentText(ustensils);

                    if (ustenRecipe.match(regexSearch) !== null && ustenRecipe.match(regexSearch)[0].length > 2) {
                       
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
            }
        }
        return { resultSearch, textSearchUser };
    }
    else {
        controlSearchBar();
    }
}
function createTag(value) {
    if (value !== undefined) {
        
        const divTagOption = document.createElement('div');
        divTagOption.className = "recipes-filter__tag__option";
        const icon_Close = document.createElement('i');
        icon_Close.className = "fa-solid fa-xmark";
        const tag_Option = document.createElement('span');
        tag_Option.textContent = value;
        tagFilterRecipes.appendChild(divTagOption);
        divTagOption.appendChild(tag_Option);
        divTagOption.appendChild(icon_Close);

        
        icon_Close.addEventListener("click", () => {
            icon_Close.parentElement.remove();
            let valueOptionOfIcon = removeAccentText(icon_Close.parentElement.querySelector('.recipes-filter__tag__option span').textContent);
            arrTag = arrTag.filter((tag) => removeAccentText(tag) !== valueOptionOfIcon);
            displayRecipes();
        });
    }
}
function filterByTag() {
    if (arrTag !== undefined) {
        let resultSearch = [];

        for (let tag of arrTag) {

            let valueTag = removeAccentText(tag);

            
            for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

                
                const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                for (let ingredient of listIngredientsRecipe) {
                    let ingrRecipe = removeAccentText(ingredient["ingredient"]);

                    if (ingrRecipe === valueTag) {
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }

                
                const applianceRecipe = removeAccentText(recipes[indexRecipe].appliance);
                if (applianceRecipe === valueTag) {
                    resultSearch.push(listCardRecipes[indexRecipe]);
                }

                
                const listUstensilsRecipe = recipes[indexRecipe].ustensils;
                for (ustensil of listUstensilsRecipe) {
                    let ustensilRecipe = removeAccentText(ustensil);

                    if (ustensilRecipe === valueTag) {
                        resultSearch.push(listCardRecipes[indexRecipe]);
                    }
                }
            }
        }
        return { resultSearch };
    }
}
function resultSearchUser() {
    
    let resultSearchBar;
    if (filterBySearchBar() !== undefined) {
        resultSearchBar = filterBySearchBar().resultSearch;
    }

    
    let filterResultTag;
    let resultTags = [];
    if (filterByTag() !== undefined) {
        filterResultTag = filterByTag().resultSearch;
        
        for (let indexRecipe = 0; indexRecipe < recipes.length; indexRecipe++) {

            let convertIdRecipeToStr = recipes[indexRecipe].id + "";

            for (let result of filterResultTag) {
                if (convertIdRecipeToStr === result.id) {

                    let countTag = 0;

                    const listIngredientsRecipe = recipes[indexRecipe]["ingredients"];
                    const applianceRecipe = removeAccentText(recipes[indexRecipe].appliance);
                    const listUstensilsRecipe = recipes[indexRecipe].ustensils;

                    for (let tag of arrTag) {

                        
                        for (let ingredient of listIngredientsRecipe) {
                            let ingr = removeAccentText(ingredient["ingredient"]);

                            if (ingr === removeAccentText(tag)) {
                                countTag += 1;
                            }
                        }

                        
                        if (applianceRecipe === removeAccentText(tag)) {
                            countTag += 1;
                        }

                     
                        for (ustensil of listUstensilsRecipe) {
                            let ustensilRecipe = removeAccentText(ustensil);

                            if (ustensilRecipe === removeAccentText(tag)) {
                                countTag += 1;
                            }
                        }
                    }

                 
                    if (countTag == arrTag.length && arrTag.length !== 0) {
                        resultTags.push(result);
                    }
                }
            }
        }
    }
    let resultGlobal = [];
    if (filterByTag() !== undefined && filterBySearchBar() !== undefined) {

        for (let result1 of resultSearchBar) {
            for (let result2 of resultTags) {

                if (result1 === result2) {
                    resultGlobal.push(result1);
                }
            }
        }
    }

    return { resultSearchBar, resultTags, resultGlobal };
}
function displayRecipes() { 

    let countRecipes = new Number();

    
    if (controlText.value !== "" && arrTag.length == 0) {

        let resultSearchBar = [...new Set(resultSearchUser().resultSearchBar)];
        let baseDelay = 0.4;

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            recipe.classList.remove("fade-in-recipe"); 

            for (let i = 0; i < resultSearchBar.length; i++) {
                if (recipe === resultSearchBar[i]) {
                    recipe.style.display = "block";
                    resultSearchBar[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth;
                    recipe.classList.add("fade-in-recipe"); 
                }
            }
        }
         
        countRecipes = [...new Set(resultSearchBar)].length;
    }
    else if (arrTag.length !== 0 && controlText.value == "") { 

        let resultTags = [...new Set(resultSearchUser().resultTags)];
        let baseDelay = 0.2;

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            recipe.classList.remove("fade-in-recipe");

            for (let i = 0; i < resultTags.length; i++) {
                if (recipe === resultTags[i]) {
                    recipe.style.display = "block";
                    resultTags[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth; 
                    recipe.classList.add("fade-in-recipe");  
                }
            }
        }
         
        countRecipes = [...new Set(resultTags)].length;
    }
    else if (arrTag.length !== 0 && controlText.value !== "") { 

        let resultGlobal = [...new Set(resultSearchUser().resultGlobal)];
        let baseDelay = 0.2;

        for (let recipe of listCardRecipes) {
            recipe.style.display = "none";
            recipe.classList.remove("fade-in-recipe"); 

            for (let i = 0; i < resultGlobal.length; i++) {
                if (recipe === resultGlobal[i]) {
                    recipe.style.display = "block";
                    resultGlobal[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
                    recipe.offsetWidth; 
                    recipe.classList.add("fade-in-recipe");  
                }
            }
        }
         
        countRecipes = [...new Set(resultGlobal)].length;
    }
    else {
        let baseDelay = 0.2;

        for (let i = 0; i < listCardRecipes.length; i++) {
            listCardRecipes[i].classList.remove("fade-in-recipe"); 
            listCardRecipes[i].style.display = "block";
            listCardRecipes[i].style.setProperty("--fadeinDelayRecipe", baseDelay + ((i + 1) / 5) + "s");
            listCardRecipes[i].offsetWidth;  
            listCardRecipes[i].classList.add("fade-in-recipe");  
        }
         
        countRecipes = listCardRecipes.length;
    }
     
    totRecipes.textContent = countRecipes + " recettes";

     
    if (countRecipes == 0) {
        noRecipeFound.style.display = "block";
    }
    else {
        noRecipeFound.style.display = "none";
    }

}