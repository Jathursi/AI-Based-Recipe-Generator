from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import numpy as np
import pandas as pd

# Load cleaned dataset
df = pd.read_csv("cleaned_meals.csv")

# Convert ingredients to a string format
df["ingredients_str"] = df["ingredients"].apply(lambda x: " ".join(eval(x)))  # Convert list to string

# Feature extraction
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["ingredients_str"])

# Train a Nearest Neighbors model
model = NearestNeighbors(n_neighbors=1, metric="cosine")
model.fit(X)

# Function to generate a recipe
def generate_recipe(user_ingredients):
    """Find the closest recipe based on user ingredients."""
    input_vec = vectorizer.transform([" ".join(user_ingredients)])
    _, indices = model.kneighbors(input_vec)
    return df.iloc[indices[0][0]]["recipe"]

# Example usage
user_input = ["flour", "sugar", "egg", "butter"]
recipe = generate_recipe(user_input)
print("Generated Recipe:\n", recipe)
