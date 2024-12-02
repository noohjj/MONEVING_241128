import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 92vh;
  padding: 0 30px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 250px;
`;

const Form = styled.form`
  width: 320px;
  height: 200px;
  border: 2px solid rgba(179, 210, 217, 0.7);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  input {
    padding: 10px;
    width: 300px;
    height: 40px;
    border: 1px solid rgba(122, 122, 122, 0.6);
    border-radius: 20px;
  }
`;

const Text = styled.div`
  font-size: 25px;
  margin-bottom: 20px;
  opacity: 0.6;
  font-weight: 600;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 90px;
  height: 40px;
  color: white;
  background-color: rgba(58, 146, 218, 0.7);
  border-radius: 20px;
  border: 0px solid white;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  margin-top: 10px;
  color: lightgray;
`;

const Back = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
`;

const BackButton = styled.button`
  cursor: pointer;
  width: 35px;
  height: 35px;
  background-color: #76b3e5;
  font-size: 18px;
  line-height: 30px;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  text-align: center;
  border: 0px solid white;
  border-radius: 20px;
`;

const BackText = styled.div`
  margin-left: 10px;
  margin-top: 5px;
  font-size: 20px;
`;

const Money = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const moneyHandler = (data) => {
    localStorage.setItem("balance", data.balance); // localStorage에 저장
    navigate("/detail"); // Detail.js로 이동
  };

  return (
    <Container>
      <Wrap>
        <Form onSubmit={handleSubmit(moneyHandler)}>
          <Text>잔액 입력</Text>
          <input
            {...register("balance", {
              required: "잔액을 입력해주세요",
            })}
            type="number"
            placeholder="잔액을 입력해주세요"
          />
          <ErrorMessage>{errors?.balance?.message}</ErrorMessage>
          <Button type="submit">NEXT</Button>
        </Form>

        <Back>
          <BackButton onClick={() => navigate("/name")}>←</BackButton>
          <BackText>닉네임 입력 페이지로</BackText>
        </Back>
      </Wrap>
    </Container>
  );
};

export default Money;
