import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

function Searched() {

  const [searched, setSearched] = useState([]);
  let params = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;

  const getSearched  = async (name) => {
    const data = await fetch (`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${name}`);
    console.log(name);
    const recipes = await data.json();
    setSearched(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
    console.log(params.search);
  },[params.search]);

  return <Grid>
    {searched.map((item) => {
      return(
        <Card key={item.id}>
          <Link to={'/recipe/' + item.id} >
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Link>
        </Card>
      );
    })}
  </Grid>;                   
}

const Grid = styled(motion.div)`
  display: grid;
  margin-top:  2rem;
  padding: .5rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
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

export default Searched;