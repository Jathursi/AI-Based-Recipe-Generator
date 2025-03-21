import requests
import json
import pandas as pd

def fetch_meal_details(meal_id):
    """Fetch detailed meal info using ID."""
    url = f"https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}"
    response = requests.get(url)
    return response.json()["meals"][0] if response.json()["meals"] else None

def fetch_meals_by_letter(letter):
    """Fetch meals by first letter."""
    url = f"https://www.themealdb.com/api/json/v1/1/search.php?f={letter}"
    response = requests.get(url)
    return response.json()["meals"] if response.json()["meals"] else []

# Collect data
all_meals = []
for letter in "abcdefghijklmnopqrstuvwxyz":
    meals = fetch_meals_by_letter(letter)
    for meal in meals:
        details = fetch_meal_details(meal["idMeal"])
        all_meals.append(details)

# Save as JSON
with open("meals_dataset.json", "w") as f:
    json.dump(all_meals, f, indent=4)

# Save as CSV
df = pd.DataFrame(all_meals)
df.to_csv("meals_dataset.csv", index=False)

print("Dataset saved successfully!")

import json
import pandas as pd

# Load dataset
with open("meals_dataset.json", "r") as f:
    meals = json.load(f)

# Function to clean data
def clean_meal_data(meal):
    """Extract relevant ingredients and instructions, removing empty values."""
    ingredients = [meal[f"strIngredient{i}"] for i in range(1, 21) if meal[f"strIngredient{i}"]]
    instructions = meal["strInstructions"] if meal["strInstructions"] else ""
    
    return {"ingredients": ingredients, "recipe": instructions}

# Process meals
cleaned_data = [clean_meal_data(meal) for meal in meals if "strInstructions" in meal and meal["strInstructions"]]

# Convert to DataFrame
df = pd.DataFrame(cleaned_data)

# Save cleaned data
df.to_csv("cleaned_meals.csv", index=False)
print("Cleaned dataset saved!")


