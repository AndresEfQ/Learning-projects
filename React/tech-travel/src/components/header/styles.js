import styled from 'styled-components';

export const Container = styled.header`
  background: #0676D9;
  padding: 30px 20px 20px;
  display: flex;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 958px;

  img {
    width: 248px;
  }
`;

export const Cart = styled.div`
  display: flex;
  align-items: center;

  div {
    background-color: #fff;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 16px;
      font-weight: 600;
      color: #0676D9;
    }
  }
`;
