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
  margin-top: 2rem;
  padding: .5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  justify-content: center;
  grid-gap: 3rem;
`;

const Card = styled.div`
  margin: 1.5rem 1rem;

  img{
    width: 100%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    text-align: center;
    padding:  1rem;
  }

`;

export default Cuisine;