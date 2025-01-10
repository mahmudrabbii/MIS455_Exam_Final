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



