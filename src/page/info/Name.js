import { styled } from "styled-components";
import { useForm } from "react-hook-form";

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

const Form = styled.form`
  width: 380px;
  height: 200px;
  border: 2px solid rgba(179, 210, 217, 0.7);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Name = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const nameHandler = (username) => {
    localStorage.setItem("username", username);
  };

  return (
    <Container>
      <Wrap>
        <Form onSubmit={handleSubmit(nameHandler)}>
          <Text>닉네임 입력</Text>
          <input
            {...register("username", {
              required: "닉네임을 입력해주세요",
            })}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <ErrorMessage>{errors?.username?.message}</ErrorMessage>
          <Button>NEXT</Button>
        </Form>
      </Wrap>
    </Container>
  );
};

export default Name;
