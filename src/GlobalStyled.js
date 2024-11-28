import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const mainStyle = {
  pcPadding: "15%",
  moPadding: "20px",
};

export const GlobalStyled = createGlobalStyle`
${reset}
*{
    box-sizing: border-box;
}

body{
    max-width: 450px;
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    font-family: "Noto Sans KR", sans-serif;
    letter-spacing: -1px;
    color: white;
}

a{
    text-decoration: none;
}

`;
