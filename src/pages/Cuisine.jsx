import React from 'react'
import { useEffect, useState } from 'react';
import {Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ImageLoader from './ImageLoader';

function Cuisine() {

  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;

  const getCuisine = async (name) => {
    const data = await fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`);
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return <Grid
  animate={{ opacity: 1 }}
  initial={{ opacity: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.5 }}
  >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <ImageLoader src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>;
}

const Grid = styled(motion.div)`
  display: grid;
  margin-top: 2rem;
  padding: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  grid-gap: 3rem;
  justify-content: center;
  align-items: center;
  justify-items: center;
`;

const Card = styled.div`
  border-radius: 15px;
  max-width: 20rem;
  margin: 0rem 1rem;
  transition: all .15s;

  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    white-space: pre-wrap;
  }

  :hover{
    scale: 1.1;   
  }
`;

export default Cuisine;