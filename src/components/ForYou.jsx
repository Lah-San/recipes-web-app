import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import ImageLoader from "../pages/ImageLoader";

function ForYou() {
  const [popular, setPopular] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const check = localStorage.getItem("popular");

      if (check) {
        setPopular(JSON.parse(check));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.REACT_APP_API_KEY}&number=8&cuisine=Japanese`
        );
        const data = await api.json();

        localStorage.setItem("popular", JSON.stringify(data.recipes));

        setPopular(data.recipes);
      }
    } catch (e) {
      setError(e);
    }

    if (error) {
      return <Error>Error: ${error}</Error>;
    }
  };
  return (
    <div>
      <Wrapper>
        <h3>For You</h3>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
            breakpoints: {
              1500: {
                perPage: 3,
              },
              768: {
                perPage: 2.5,
              },
              400: {
                perPage: 1,
              },
            },
          }}
        >
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
                    <p>{recipe.title}</p>
                    <ImageLoader src={recipe.image} alt={recipe.title} />
                  </Link>
                  <Gradient />
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}

const Error = styled.h2`
text-align: center;
  background: #f81717a8;
  padding: 10px;
  margin: 2rem;
  border: 1px solid black;
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

export default ForYou;
