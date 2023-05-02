import styled from "styled-components";
import { useState } from "react";
import {FaSearch} from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function Search() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
   
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch/>
          <input onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input} />

      </div>
    </FormStyle>
  )
}

const FormStyle = styled.form`
  margin: 0rem ;
  div{
    width: 100%;
    position: relative;
  }
  input{
    border: none;
    background: linear-gradient(5deg, rgb(0 0 0), rgb(36 34 34 / 70%));
    font-size: 1.5rem;
    color: white;
    padding: 1rem, 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width:100%;
    padding: .8rem .8rem .8rem 3.5rem;

  }
  svg{
    position: absolute;
    top: 50%;
    left: .5rem;
    transform: translate(100%, -50%);
    color: white;
  }
  input:focus{
    background: linear-gradient(1deg, rgb(0 0 0), rgb(36 34 34 / 70%));;
  }
`;

export default Search;