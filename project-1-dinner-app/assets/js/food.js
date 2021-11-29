var mealButton = document.getElementById('mealBtn');
var mealsContainer = document.getElementById('meals');
var searchButton = document.getElementById('searchButton');
var input = document.getElementById('foodChoice');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

mealButton.addEventListener('click', function randomMeal() {
    // clear old content
    mealsContainer.textContent = '';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(
            function (response) {
                return response.json();
            }
        )
        .then(function (data) {
            console.log(data.meals);
            let meal = data.meals[0]
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
       
            //save and clear buttons
            saveMealBtn.addEventListener('click', function saveMeal(){

                // set new submission to local storage 
                localStorage.setItem("meal", JSON.stringify(meal));
                console.log(meal)
                
            })
            clearMealBtn.addEventListener('click', function clearMealStored() {
                localStorage.removeItem('meal');
                location.reload();
                
            });
    })
});
        


searchButton.addEventListener('click', function randomDrink() {

     // clear old content
     mealsContainer.textContent = '';
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + input.value + '')
        .then(
            function (response) {
                return response.json()
            })
        .then(function (data) {
            console.log(data.meals);
            var rand = getRandomIntInclusive(0, data.meals.length)
            console.log(rand)
            let meal = data.meals[rand]
            var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + meal.strMeal;
            fetch(queryURL)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data.meals);
                    let meal = data.meals[0]
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

                    
                    //save and clear buttons
                saveMealBtn.addEventListener('click', function saveMeal(){

                    // set new submission to local storage 
                    localStorage.setItem("meal", JSON.stringify(meal));
                    console.log(meal)
                    
                })
                clearMealBtn.addEventListener('click', function clearMealStored() {
                    localStorage.removeItem('meal');
                    location.reload();
                    
                });
                })
        })

    });
