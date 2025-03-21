'use client';

import { useState, useEffect } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import Carousal from '@/app/Carousal';
import Image from 'next/image';
import img1 from '../Assets/1.png';
import img2 from '../Assets/2.png';
import img3 from '../Assets/3.png';
import img4 from '../Assets/4.png';
import img5 from '../Assets/5.png';
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function Main() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const slides = [img1, img2, img3, img4, img5
  ];
  // Auto-change background image every 4 seconds
  // const [liked, setLiked] = useState(false);
  // const [saved, setSaved] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Fetch random recipes
  const fetchRandomRecipes = async () => {
    try {
      const mealRequests = Array.from({ length: 20 }, () =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      );

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

  // Search Meals
  const searchMeals = async (query) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    fetchRandomRecipes();
  }, []);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query === '') {
      fetchRandomRecipes();
    } else {
      searchMeals(query);
    }
  };

  const handleRecipeClick = (id) => {
    router.push(`/meal/${id}`);
  };

  return (
    <div className="flex flex-col">
      {/* Background Image Carousel */}
      <div className="relative w-full h-[350px] overflow-hidden">
        {/* <div className="relative w-full h-[350px] overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentImageIndex].src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }} // Smooth transition
            />
          </AnimatePresence>
        </div> */}
          {/* <Carousal autoSlide autoSlideInterval={5000}>
            {slides.map((src, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  width={800}
                  height={350}
                  className="w-full h-[350px] object-cover"
                />
              </div>
            ))}
          </Carousal> */}
        {/* Overlay */}
        <div className="bg-cont absolute inset-0 bg-black bg-opacity-50 flex flex-col gap-4 justify-center items-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white text-center">
            Healthy Life, Healthy Recipe!
          </h1>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-lg mt-4 px-4 py-2 shadow-lg">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-64 md:w-96 p-2 rounded-lg outline-none"
            />
            <button className="ml-2 text-gray-700">
              <IoSearchSharp className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Section */}
      {loading ? (
        <p className="text-center mt-4">Loading recipes...</p>
      ) : (
        <div className="recipe-container w-[100%] flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl font-bold text-center">Meal Suggestions</h2>
          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-4">
              {recipes.length === 0 ? (
                <p className="text-center col-span-3">No meals found</p>
              ) : (
                recipes.map((recipe) => (
                  <div
                    key={recipe.idMeal}
                    className="bg-white p-4 flex flex-col items-center justify-between rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition"
                    onClick={() => handleRecipeClick(recipe.idMeal)}
                  >
                    <img
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      width={300}
                      height={200}
                      className="w-full  rounded-lg"
                      style={{ objectFit: 'cover' }}
                    />

                    {/* <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => setLiked(!liked)}>
                        {liked ? (
                          <FaHeart className="text-red-500 text-xl" />
                        ) : (
                          <FaRegHeart className="text-white text-xl" />
                        )}
                      </button>
                      <button onClick={() => setSaved(!saved)}>
                        {saved ? (
                          <FaBookmark className="text-yellow-500 text-xl" />
                        ) : (
                          <FaRegBookmark className="text-white text-xl" />
                        )}
                      </button>
                    </div> */}
                    <h3 className="font-bold mt-2">{recipe.strMeal}</h3>
                    <p className="text-sm text-gray-600">{recipe.strCategory} | {recipe.strArea}</p>

                    {/* Watch Video Button */}
                    {recipe.strYoutube && (
                      <button
                        className="bg-green-500 w-full text-white px-4 py-2 rounded-lg mt-2"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click navigation
                          window.open(recipe.strYoutube, '_blank');
                        }}
                      >
                        Watch Video
                      </button>
                    )}
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
