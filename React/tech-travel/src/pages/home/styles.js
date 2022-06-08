import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  margin-top: 45px;
  display: flex;
  justify-content: center;
`;

export const List = styled.ul`
  max-width: 958px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;

  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

export const Unit = styled.li`
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 46px 20px;

  img {
    max-width: 280px;
    border-radius: 5px;
  }

  p {
    font-weight: 600;
    font-size: 14px;
    color: #000;
    margin-top: 25px;
  }

  strong {
    font-size: 16px;
    margin: 21px 0 26px;
  }

  button {
    background-color: #0676d9;
    color: #fff;
    border: 0;
    border-radius: 5px;
    display: flex;
    align-items: center;

    div {
      display: flex;
      align-items: center;
      padding: 8px 13px;
      background-color: rgb(0, 0, 0, 0.2)
    }

    span {
      flex: 1;
      text-align: center;
      font-weight: 600;
    }
  }

`;
