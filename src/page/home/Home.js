import styled from "styled-components";
import Logos from "../../image/Logo";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 92vh;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 250px;
`;

const Text = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #0f70b7;
`;

const Button = styled.div`
  width: 150px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: rgba(58, 146, 218, 0.7);
  border-radius: 20px;
  color: white;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 900;
`;

const Home = () => {
  return (
    <Container>
      <Wrap>
        <Logos />
        <Text>~ 우리 모두의 절약생활을 위한 수입, 지출 기록 앱 ~</Text>
        <Link to={"/name"}>
          <Button>GO!</Button>
        </Link>
      </Wrap>
    </Container>
  );
};

export default Home;
