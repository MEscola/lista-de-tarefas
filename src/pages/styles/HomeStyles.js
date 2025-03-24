import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  text-align: center;

animation: fadeIn 1s ease-in-out;

@keyframes fadeIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  width: 100%;
  

  &:focus {
    border-color: #0070f3;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const Label = styled.label`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
`;

export const Button = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 20px;

  &:hover {
    background-color: #005bb5;
  }
`;


export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  
  
  `  ;



  export const Button2 = styled.button`
  background-color:  #333;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: .8rem;
  margin-top: 10px;
  
  &:hover {
    background-color:rgb(68, 70, 71);
  }
`;



