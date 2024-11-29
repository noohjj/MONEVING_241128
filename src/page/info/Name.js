import { styled } from "styled-components";
import { useForm } from "react-hook-form";

const Container = styled.div``;

const Wrap = styled.div``;

const Form = styled.form``;

const ErrorMessage = styled.div``;

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
          <input
            {...register("username", {
              required: "닉네임을 입력해주세요",
            })}
            type="text"
            placeholder="닉네임을 입력해주세요"
          />
          <ErrorMessage>{errors?.username?.message}</ErrorMessage>
        </Form>
      </Wrap>
    </Container>
  );
};

export default Name;
