import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 92vh;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NameWrap = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    margin-top: 10px;
    font-size: 20px;
  }
`;

const Balance = styled.div`
  font-size: 32px;
  color: #1b5096;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Input = styled.input`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ResetButton = styled.button`
  width: 130px;
  height: 40px;
  background-color: #3a92da;
  color: white;
  display: flex;
  font-weight: 900;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0px solid white;
  border-radius: 20px;
  cursor: pointer;
`;

const InputWrap = styled.div`
  margin-top: 20px;
  width: 100%;
  margin: 0 auto;
`;

const ButtonWrap = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 30%;
  padding: 10px;
  background-color: ${(props) =>
    props.type === "income"
      ? "#3a92da"
      : props.type === "expense"
      ? "#f44336"
      : "#999"};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Transactions = styled.div`
  margin-top: 20px;
`;

const TransactionWrapper = styled.div`
  line-height: 30px;
  letter-spacing: 1px;
  background-color: ${(props) =>
    props.type === "income" ? "#3a92da" : "#ff0004"};
  opacity: 0.6;
  padding: 5px;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 20px;
  color: white;
  font-weight: 500;
  display: flex;
  justify-content: space-between;

  input {
    width: 70%;
    height: 25px;
    border: 2px solid white;
    border-radius: 10px;
    margin-left: 10px;
  }
`;

const WButton = styled.button`
  all: unset;
  color: white;
  font-size: 17px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: -5px;

  &:hover {
    opacity: 0.8;
  }
`;
const DeleteButton = styled.button`
  all: unset;
  color: white;
  font-size: 17px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const Transaction = ({ transaction, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    description: transaction.description,
    amount: transaction.amount,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedTransaction = {
      ...transaction,
      description: editData.description,
      amount: parseInt(editData.amount) || 0,
    };
    onUpdate(updatedTransaction);
    setIsEditing(false);
  };

  return (
    <TransactionWrapper type={transaction.type}>
      {isEditing ? (
        <div>
          <input
            name="description"
            value={editData.description}
            onChange={handleEditChange}
          />
          <input
            name="amount"
            value={editData.amount}
            onChange={handleEditChange}
          />
        </div>
      ) : (
        <div>
          {transaction.description}
          <br />
          {transaction.type === "income" ? "+" : "-"}
          {transaction.amount.toLocaleString()}원
        </div>
      )}
      <div>
        {isEditing ? (
          <WButton onClick={handleSave}>저장</WButton>
        ) : (
          <WButton onClick={() => setIsEditing(true)}>수정</WButton>
        )}
        <DeleteButton onClick={onDelete}>삭제</DeleteButton>
      </div>
    </TransactionWrapper>
  );
};

const Detail = () => {
  const [nickname, setNickname] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({ description: "", amount: "" });

  useEffect(() => {
    const savedNickname = localStorage.getItem("username") || "닉네임 없음";
    const initialBalance = localStorage.getItem("balance") || 0;
    setNickname(savedNickname);
    setBalance(parseInt(initialBalance));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransaction = (type) => {
    const amount = parseInt(formData.amount);
    if (isNaN(amount)) return alert("금액을 입력해주세요!");

    const newBalance = type === "income" ? balance + amount : balance - amount;
    setBalance(newBalance);
    localStorage.setItem("balance", newBalance);

    const newTransaction = {
      id: Date.now(),
      description: formData.description,
      amount,
      type,
    };
    setTransactions([newTransaction, ...transactions]);
    setFormData({ description: "", amount: "" });
  };

  const handleDeleteTransaction = (id, amount, type) => {
    const filteredTransactions = transactions.filter((tx) => tx.id !== id);
    const updatedBalance =
      type === "income" ? balance - amount : balance + amount;
    setTransactions(filteredTransactions);
    setBalance(updatedBalance);
    localStorage.setItem("balance", updatedBalance);
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    const updatedTransactions = transactions.map((tx) =>
      tx.id === updatedTransaction.id ? updatedTransaction : tx
    );
    const updatedBalance = updatedTransactions.reduce((acc, tx) => {
      return tx.type === "income" ? acc + tx.amount : acc - tx.amount;
    }, 0);

    setTransactions(updatedTransactions);
    setBalance(updatedBalance);
    localStorage.setItem("balance", updatedBalance);
  };

  const handleReset = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("balance");
    setNickname("");
    setBalance(0);
    setTransactions([]);
  };

  return (
    <Container>
      <NameWrap>
        <div>닉네임: {nickname}</div>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <ResetButton onClick={handleReset}>RESET</ResetButton>
        </Link>
      </NameWrap>

      <Header>
        <Balance>잔액: {balance.toLocaleString()}원</Balance>
      </Header>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <InputWrap>
          <Input
            name="description"
            placeholder="적요를 입력해주세요(ex:월급, 식비)"
            value={formData.description}
            onChange={handleInputChange}
          />
          <Input
            name="amount"
            placeholder="금액을 입력해주세요"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </InputWrap>

        <ButtonWrap>
          <Button type="income" onClick={() => handleTransaction("income")}>
            수입
          </Button>
          <Button type="expense" onClick={() => handleTransaction("expense")}>
            지출
          </Button>
        </ButtonWrap>
      </Form>
      <Transactions>
        {transactions.map((tx) => (
          <Transaction
            key={tx.id}
            transaction={tx}
            onDelete={() => handleDeleteTransaction(tx.id, tx.amount, tx.type)}
            onUpdate={handleUpdateTransaction}
          />
        ))}
      </Transactions>
    </Container>
  );
};

export default Detail;
