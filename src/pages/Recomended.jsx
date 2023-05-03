import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";

function Recomended() {
  const [recomended, setRecomended] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecomended();
  }, []);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getRecomended = async () => {
    try {
      const check = localStorage.getItem("recomended");

      if (check) {
        setRecomended(JSON.parse(check));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=8`
        );
        const data = await api.json();

        localStorage.setItem("recomended", JSON.stringify(data.recipes));

        setRecomended(data.recipes);
      }
    } catch (e) {
      setError(e);
    }
  };

  return (
    <div>
      <Title>Recomended For You</Title>
      <Wrapper>
        {recomended.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Link to={"/recipe/" + recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <ImageLoader src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Card>
              </Link>
            </SplideSlide>
          );
        })}
      </Wrapper>
    </div>
  );
}

const Title = styled.h3`
  background: #00bbf97e;
  padding: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-radius: 15px;
  
  @media only screen and (max-width: 400px) {
    text-align: center;   
  }
`;

const Wrapper = styled.div`
  margin: 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 4rem;
  justify-content: center;
`;

const Card = styled.div`
  min-height: 20rem;
  border-radius: 2rem;
  margin: 0rem 1rem;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  :hover {
    transform: scale(1.05);
    box-shadow: 1px 2px 50px #bdbdbd;
  }

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
    font-size: 1.1rem;
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
export default Recomended;
