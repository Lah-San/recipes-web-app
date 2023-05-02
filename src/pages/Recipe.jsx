import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import React from "react";
import ImageLoader from "./ImageLoader";

function Recipe() {
  const params = useParams();
  const [details, setRecipeDetails] = useState({});
  const [activeTab, setActvieTab] = useState("instructions");
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const getRecipeDetails = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`
      );
      const recipeInfo = await data.json();
      setRecipeDetails(recipeInfo);
    } catch (e) 
    {
      setError(e);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, [params.name]);

  if (error) {
    return (
      <Error>
        Error: ${error}
      </Error>
    )
  }


  return (
    <DetailWrapper>
      <Content>
        <div>
          <h2>{details.title}</h2>
          <ImageLoader src={details.image} alt={details.title} />
        </div>
      </Content>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActvieTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActvieTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
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

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  gap: 1.5rem;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    font-size: 40px;
    margin-bottom: 2rem;
  }
  img {
    max-width: 600px;
    min-width: 500px;
    width: 100%;
    border: 1px solid black;
    margin-bottom: 2rem;
  }
  h3 {
    font-size: larger;
    text-decoration: none;
    font-size: medium;
  }
  ul {
    margin-top: 2rem;
    padding: 2rem;
    font-size: 1.2rem;
    background: linear-gradient(35deg, rgb(37 37 37), rgb(75, 75, 75));
    border-radius: 25px;
    color: white;
  }
  li {
    padding-bottom: 0.5rem;
  }

  @media (max-width: 1000px) {
    flex-direction: column;

    img {
      max-width: 800px;
      min-width: 500px;
      width: 100%;
      border-radius: 5%;
    }

    h2 {
      font-size: 30px;
    }

    h3 {
      font-size: 16px;
      font-weight: 300;
    }
  }
`;

const Content = styled.div`
  height: 100%;
  padding-top: 10px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;

  @media (max-width: 1700px) {
    position: static;
  }

  @media (max-width: 768px) {
    position: static;

    img {
      max-width: 1000px;
      min-width: 200px;
      width: 100%;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: while;
  border: 2px solid black;
  margin-right: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  border-radius: 5px;

  @media (max-width: 500px) {
    padding: 5px 7px;
    font-weight: 500;
  }
`;

const Info = styled.div`
  margin-left: 10rem;
  @media (max-width: 1700px) {
    margin-left: 0px;
  }
`;

export default Recipe;
