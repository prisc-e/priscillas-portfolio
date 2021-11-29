var drinkButton = document.getElementById('drink');
var drinksContainer = document.getElementById('drinks');
var searchButton = document.getElementById('searchButton');
var input = document.getElementById('input_text');
var modal = document.getElementById('modal-popup');
var button = document.getElementById('yes-btn');
var btn = document.getElementById('no-btn');


/* document.querySelector('#yes-btn').addEventListener('click', function (event) {
    modal.style.display = 'none';
    event.preventDefault();
});
document.querySelector('#no-btn').addEventListener("click", function (event) {
    document.getElementById("output").innerHTML += "Sorry! You must be 21 or older to continue";
    event.preventDefault();
}, false); */

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}


drinkButton.addEventListener('click', function randomDrink() {
     // clear old content
    drinksContainer.textContent = '';
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then(
            function (response) {
                return response.json()
            }
        )
        .then(function (data) {
            console.log(data.drinks);
            let drink = data.drinks[0]
            var drinkChoice = document.createElement('h3');
            drinkChoice.textContent = drink.strDrink;
            drinksContainer.append(drinkChoice);
            for (let i = 1; i < 16; i++) {
                var recipeItems = document.createElement('h3');
                recipeItems.textContent = eval("drink.strMeasure" + i) + " " + eval("drink.strIngredient" + i);
                if (eval("drink.strMeasure" + i) != null) {
                    drinksContainer.append(recipeItems);
                }
            }
            var instructions = document.createElement('h3');
            instructions.textContent = drink.strInstructions;
            drinksContainer.append(instructions);
            
            //buttons to save or clear
            saveDrinkBtn.addEventListener('click', function saveDrink(){

                // set new submission to local storage 
                localStorage.setItem("drink", JSON.stringify(drink));
                console.log(drink)
            
            })
            clearDrinkBtn.addEventListener('click', function clearDrinkStored() {
                localStorage.removeItem('drink');
                location.reload();   
            });
        })
    })

searchButton.addEventListener('click', function randomDrink() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + input.value + '')
        .then(
            function (response) {
                return response.json()
            })
        .then(function (data) {
            console.log(data.drinks);
            var rand = getRandomIntInclusive(0, data.drinks.length)
            console.log(rand)
            let drink = data.drinks[rand]
            var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drink.strDrink;
            fetch(queryURL)
                .then(function (response) {
                    return response.json()
                })
                .then(
                    function (data) {
                        let drink = data.drinks[0]
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

                        //buttons to save or clear
                        saveDrinkBtn.addEventListener('click', function saveDrink(){

                            // set new submission to local storage 
                            localStorage.setItem("drink", JSON.stringify(drink));
                            console.log(drink)
                        
                        })
                        clearDrinkBtn.addEventListener('click', function clearDrinkStored() {
                            localStorage.removeItem('drink');
                            location.reload();   
                        });
                    })
        })
})



