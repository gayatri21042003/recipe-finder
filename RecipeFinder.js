import React, { useState } from "react";

const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch recipe data
  const searchRecipes = async () => {
    if (query.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (error) {
      console.log("API Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>🍲 Recipe Finder</h1>

      {/* Search Bar */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search recipes like pizza, pasta..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={searchRecipes} style={styles.button}>Search</button>
      </div>

      {/* Loader */}
      {loading && <h2>Loading recipes...</h2>}

      {/* Recipe Cards */}
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <img src={recipe.image} alt={recipe.name} style={styles.image} />
             
            <h2>{recipe.name}</h2>

            <p><strong>Ingredients:</strong></p>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p><strong>Instructions:</strong> {recipe.instructions.join(", ")}</p>

            <p style={styles.info}>⏱ {recipe.cookTimeMinutes} mins | 🔥 {recipe.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    maxWidth: "700px",
    margin: "20px auto",
    fontFamily: "Arial",
    padding: "20px",
  },
  heading: {
    textAlign: "center",
  },
  searchBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    background: "rgba(71, 99, 255, 1)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  info: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default RecipeFinder;
