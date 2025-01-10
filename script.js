function connect() {
    var searchTerm = document.getElementById("searchBox").value.trim(); 
    document.getElementById("searchBox").value = "";

    if (!searchTerm) {
        alert("Please enter a meal name to search.");
        return;
    }

    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => process(data));
}

function process(data) {
    var allMeals = data.meals; 
    var oldContent = document.getElementById("displayArea");
    oldContent.innerHTML = ""; 

    if (!allMeals) {
        oldContent.innerHTML = `<p>No meals found for the given search term. Please try again.</p>`;
        return;
    }

    var mealsToShow = allMeals.slice(0, 5); // Show only the first 5 meals initially
    for (var i = 0; i < mealsToShow.length; i++) {
        var newDiv = document.createElement("div");
        newDiv.classList.add("meal-card");
        newDiv.innerHTML = `
            <strong>Meal Title:</strong> ${mealsToShow[i].strMeal} <br>
            <strong>ID:</strong> ${mealsToShow[i].idMeal} <br>
            <img src="${mealsToShow[i].strMealThumb}" alt="${mealsToShow[i].strMeal}"> <br>
            <strong>Cooking Instructions:</strong> <br>
            <div class="meal-instructions">
                ${mealsToShow[i].strInstructions}
            </div>
        `;
        oldContent.appendChild(newDiv);
    }

}