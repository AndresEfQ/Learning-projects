import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerList = styled.ul`
  width: 100%;
  background-color: #fff;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  padding: 36px 44px;
  align-items: center;
  margin-top: 45px;
  max-width: 958px;
`;

export const CartHeader = styled.div`
  display: flex;
  padding: 0;
  color: #999;
  font-weight: 600;

  #product {
    margin: 0 auto 0 149px;
  }

  #quantity {
    margin-right: 25px;
  }

  #price {
    margin-right: 70px;
  }
`;

export const TravelItem = styled.li`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #999;
  justify-content: space-between;
  align-items: center;

  img {
    height: 85px;
    border-radius: 5px;
  }
`;

export const Info = styled.div`
  padding-left: 36px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  justify-content: center;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  strong {
    margin-top: 9px;
    font-size: 16px;
  }
`;

export const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 16px;
  color: #999;
  padding-top: auto;
  right: 365px;
  border-radius: 6px;
  width: 40px;
  height: 30px;
  border: 1px solid #0676D9;
`;

export const Subtotal = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  
  p {
    margin-right: 40px;
  }
  
  button {
    display: flex;
    align-items: center;
    border: none;
    background-color: inherit;
  }
`;

export const CartFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #999;
  
  strong {
    margin: 0 35px 0 30px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
  }
`;
