'use client';

import { useState, useEffect } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';

export default function Main() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchRandomRecipes = async () => {
    try {
      const mealRequests = [];

      for (let i = 0; i < 50; i++) {
        mealRequests.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php'));
      }

      const responses = await Promise.all(mealRequests);
      const data = await Promise.all(responses.map((response) => response.json()));

      const allMeals = data.map((mealData) => mealData.meals[0]);
      const uniqueMeals = allMeals.filter(
        (meal, index, self) => index === self.findIndex((m) => m.idMeal === meal.idMeal)
      );

      setRecipes(uniqueMeals);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchMeals = async (query) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === '') {
      fetchRandomRecipes();
    } else {
      searchMeals(query);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const handleRecipeClick = (id) => {
    router.push(`/meal/${id}`);
  };

  return (
    <div className='flex flex-col'>
      {/* Header Section */}
      <div className='w-[100%] h-[350px] bg-cont bg-cover'>
        <div className='flex flex-col justify-center items-center h-full'>
          <h1 className='text-1xl md:text-3xl font-bold'>Healthy Life, Healthy Recipe!</h1>
          <div className='flex justify-center items-center'>
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-50% md:w-[100%] rounded-lg bg-white border p-2 mt-4"
            />
            <div className='bg-white mt-3 p-2 rounded-lg text-center'>
              <IoSearchSharp className='text-2xl' />
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Section */}
      {loading ? (
        <p className="text-center mt-4">Loading recipes...</p>
      ) : (
        <div className="recipe-container w-[100%] flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl font-bold text-center">Meal Suggestions</h2>
          <div className='w-full flex justify-center items-center'>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-15 mt-4">
              {recipes.length === 0 ? (
                <p className="text-center col-span-3">No meals found</p>
              ) : (
                recipes.map((recipe) => (
                  <div key={recipe.idMeal} className="recipe-card" onClick={() => handleRecipeClick(recipe.idMeal)}>
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <h3>{recipe.strMeal}</h3>
                    <p>{recipe.strCategory}</p>
                    <p>{recipe.strArea}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
