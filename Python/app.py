from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
import pandas as pd

app = Flask(__name__)

# Load dataset
df = pd.read_csv("cleaned_meals.csv")
df["ingredients_str"] = df["ingredients"].apply(lambda x: " ".join(eval(x)))

# Feature extraction
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["ingredients_str"])

# Train a Nearest Neighbors model
model = NearestNeighbors(n_neighbors=1, metric="cosine")
model.fit(X)

@app.route("/generate_recipe", methods=["POST"])
def generate_recipe():
    data = request.json
    user_ingredients = data.get("ingredients", [])
    
    input_vec = vectorizer.transform([" ".join(user_ingredients)])
    _, indices = model.kneighbors(input_vec)
    
    recipe = df.iloc[indices[0][0]]["recipe"]
    return jsonify({"recipe": recipe})

if __name__ == "__main__":
    app.run(debug=True)
