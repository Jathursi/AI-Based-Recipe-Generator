'use client';

import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
const MealPage = () => {
  // const { query } = useRouter();
  const { id } = useParams();  // Get the meal ID from the URL
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    if (id) {
      fetchMealDetails(id);
    }
  }, [id]);

  const fetchMealDetails = async (id) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setMeal(data.meals[0]);
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  if (!meal) return <p>Loading...</p>;

  return (
    <div className='flex flex-col gap-4 mt-5'>
      <div className='flex justify-center items-center p-3 gap-4'>
        <img className='w-[400px] h-[400px] mt-16' src={meal.strMealThumb} alt={meal.strMeal} />
        <div className='flex flex-col gap-4 mt-5'>
          <h1 className='font-bold text-3xl'>{meal.strMeal}</h1>
          <p className='text-xl px-5 text-justify'>{meal.strInstructions}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-3xl mx-4'>Incredient:</h1>
        <ul className='flex flex-wrap justify-center items-center mb-10 gap-4'>
          {Array.from({ length: 20 }).map((_, index) => {
            const ingredient = meal[`strIngredient${index + 1}`];
            const measure = meal[`strMeasure${index + 1}`];
            // Only render if the ingredient is available
            return ingredient ? (
              <li key={`${meal.idMeal}-${ingredient}-${index}`} className="flex flex-col justify-center items-center p-2">
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.replace(/ /g, '_')}.png`}
                  alt={ingredient}
                  width={20}
                  height={20}
                  className="w-[200px]"
                />
                {ingredient} - {measure}
              </li>
            ) : null;
          })}
        </ul>
      </div>
      
      {/* Render other details about the meal */}
    </div>
  );
};

export default MealPage;
