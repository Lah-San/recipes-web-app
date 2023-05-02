import {FaPizzaSlice, FaHamburger} from 'react-icons/fa';
import {GiNoodles, GiChopsticks} from 'react-icons/gi';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


function Category() {
  return(
    <List>
      <Slink to={'/cuisine/Italian'}>
        <FaPizzaSlice/>
        <h4>Italian</h4>
      </Slink>
      <Slink to={'/cuisine/American'}>
        <FaHamburger/>
        <h4>American</h4>
      </Slink>
      <Slink to={'/cuisine/Thai'}>
        <GiNoodles/>
        <h4>Thai</h4>
      </Slink>
      <Slink to={'/cuisine/Japanese'}>
        <GiChopsticks/>
        <h4>Japanese</h4>
      </Slink>
    </List>
  );
}

const List = styled.div`
  display:flex;
  justify-content: center;
  margin: 1rem, 0rem;
  padding-top: 1rem;
`;

const Slink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-right: 2%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.8);
  transition: background 2s ease 0s;

  h4 {
    color: white;
    font-size: 0.8rem;
    margin-top: 0.35rem;
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }
  &.active {
    background: linear-gradient(16deg, #08ad08, #0000003d);

    svg{
      color: white;
    }
    h4{
      color: white; 
    }
  }

  @media (max-width: 500px) {
    width: 4rem;
    height: 4rem;
    margin-right: 1%;
    h4{
      font-size: .5rem;
    }

    svg{
      font-size: 1rem;
    }
  }
`;





export default Category;