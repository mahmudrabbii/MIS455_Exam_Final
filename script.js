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
    oldContent.innerHTML = ""; // Clear previous results

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

    // Add "SHOW ALL" button if more than 5 meals are available
    if (allMeals.length > 5) {
        var showAllBtn = document.createElement("button");
        showAllBtn.textContent = "SHOW ALL";
        showAllBtn.onclick = function() {
            oldContent.innerHTML = ""; // Clear previous results
            allMeals.forEach((meal) => {
                var newDiv = document.createElement("div");
                newDiv.classList.add("meal-card");
                newDiv.innerHTML = `
                    <strong>Meal Title:</strong> ${meal.strMeal} <br>
                    <strong>ID:</strong> ${meal.idMeal} <br>
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> <br>
                    <strong>Cooking Instructions:</strong> <br>
                    <div class="meal-instructions">
                        ${meal.strInstructions}
                    </div>
                `;
                oldContent.appendChild(newDiv);
            });
        };
        oldContent.appendChild(showAllBtn);
    }
}
