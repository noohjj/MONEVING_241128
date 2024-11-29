import { styled } from "styled-components";
import { Link } from "react-router-dom";

const MainLogo = styled.div`
  width: 100%;
  height: 80px;
  background-color: #1b5096;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Audiowide", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
  color: white;
`;

const Header = () => {
  return (
    <>
      <Link to={"/"}>
        <MainLogo>MONEVING</MainLogo>
      </Link>
    </>
  );
};

export default Header;
