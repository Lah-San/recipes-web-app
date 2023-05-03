import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import ImageLoader from "../pages/ImageLoader";

function Veggie() {
  const [vegetarian, setVegetarian] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getVegetarian();
  }, []);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getVegetarian = async () => {
    try {
      const check = localStorage.getItem("veggie");

      if (check) {
        setVegetarian(JSON.parse(check));
      } else {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=8&tags=vegetarian`
        );
        const data = await api.json();

        localStorage.setItem("veggie", JSON.stringify(data.recipes));

        setVegetarian(data.recipes);
      }
    } catch (e) 
    {
      setError(e);
    }
  };



  return (
    <div>
      <Title>Vegetarian Corner</Title>
      <Wrapper>
        <Splide
          options={{
            perPage: 5,
            arrows: true,
            pagination: false,
            drag: "free",
            gap: "2rem",
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
          {vegetarian.map((item) => {
            return (
              <SplideSlide key={item.id}>
                <Card>
                  <Link to={"/recipe/" + item.id}>
                    <p>{item.title}</p>
                    <img src={item.image} alt={item.title} loading="lazy"/>
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}


const Title = styled.h3`
  background: #66ff2e7c;
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

export default Veggie;
