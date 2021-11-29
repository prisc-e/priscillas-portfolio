//get saved Drink
document.addEventListener('DOMContentLoaded', function getDinner() {
    var userD = JSON.parse(localStorage.getItem('drink'));
    if (userD != null) {
        var drinksContainer = document.getElementById('recipe-containerD');
        console.log(userD)
        var data = JSON.parse(localStorage.getItem('drink')) || []
        let drink = data
                        var drinkChoice = document.createElement('h3');
                        drinkChoice.textContent = drink.strDrink;
                        drinksContainer.append(drinkChoice);
                        for (let i = 1; i < 16; i++) {
                            var recipeItems = document.createElement('h3');
                            recipeItems.textContent = eval("drink.strMeasure" + i) + " " + eval("drink.strIngredient" + i);
                            if (eval("drink.strMeasure" + i) !== null) {
                                drinksContainer.append(recipeItems);
                            }
                        }
        var instructions = document.createElement('h3');
        instructions.textContent = drink.strInstructions;
        drinksContainer.append(instructions);
    }


//get saved Meal
    var userM = JSON.parse(localStorage.getItem('meal'));
    if (userM != null) {


        var mealsContainer = document.getElementById('recipe-containerM');
        console.log(userM)
        var data = JSON.parse(localStorage.getItem('meal')) || []
        let meal = data
                        var mealChoice = document.createElement('h3');
                        mealChoice.textContent = meal.strMeal;
                        mealsContainer.append(mealChoice);
                        for (let i = 1; i < 16; i++) {
                            var recipeItems = document.createElement('h3');
                            recipeItems.textContent = eval("meal.strMeasure" + i) + " " + eval("meal.strIngredient" + i);
                            if (eval("meal.strMeasure" + i) !== null) {
                                mealsContainer.append(recipeItems);
                            }
                        }
        var instructions = document.createElement('h3');
        instructions.textContent = meal.strInstructions;
        mealsContainer.append(instructions);
    } 

    
}, false);

//"clear selection" buttons
clearDrinkBtn.addEventListener('click', function clearDrinkStored() {
    localStorage.removeItem('drink');  
    location.reload();
});

clearMealBtn.addEventListener('click', function clearMealStored() {
    localStorage.removeItem('meal'); 
    location.reload();
});

