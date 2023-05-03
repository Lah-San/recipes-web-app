import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";

function DynamicRecipes() {
  const [mealTime, setMealTime] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hour = date.getHours();
      let timeOfDay;

      if (hour >= 5 && hour < 11) {
        timeOfDay = "Breakfast";
      } else if (hour >= 11 && hour < 14) {
        timeOfDay = "Maincourse";
      } else if (hour >= 14 && hour < 17) {
        timeOfDay = "Appetizer";
      } else if (hour >= 17 || hour < 5) {
        timeOfDay = "Salad";
      }
      setMealTime(timeOfDay);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getRecipes();
  }, []);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getRecipes = async () => {
    try {
      const check = localStorage.getItem("type");

      if (check) {
        setRecipes(JSON.parse(check));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&type=${mealTime}&number=8&sort=random`
        );
        const data = await api.json();

        localStorage.setItem("type", JSON.stringify(data.recipes));

        setRecipes(data.recipes);
      }
    } catch (e) 
    {
      setError(e)
    }
  };



  return (
    <div>
      <Title>{mealTime} Corner</Title>
      <Wrapper>
        <Splide
          options={{
            perPage: 4,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "3rem",
            breakpoints: {
              1500: {
                perPage: 3,
              },
              768: {
                perPage: 1.5,
              },
              400: {
                perPage: 1,
              },
            },
          }}
        >
          {recipes.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Link to={"/recipe/" + recipe.id}>
                  <Card>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} loading="auto"/>
                    <Gradient />
                  </Card>
                </Link>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Title = styled.h3`
  background: #3131dd7d;
  padding: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-radius: 15px;
`;
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    background-color: rgba(68, 67, 67, 0.65);
    position: absolute;
    z-index: 10;
    top: 72%;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 23%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default DynamicRecipes;
