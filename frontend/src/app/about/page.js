"use client";

import { useState } from "react";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState("");

  const generateRecipe = async () => {
    try {
      const response = await fetch("/api/generate_recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredients.split(",").map((item) => item.trim()) }),
      });

      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      setRecipe("Error fetching recipe. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Recipe Generator</h1>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ width: "60%", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button onClick={generateRecipe} style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}>
        Generate Recipe
      </button>
      <h3>Recipe:</h3>
      <p>{recipe}</p>
    </div>
  );
}
