import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import CartContext from '../../context/cart';
import {
  Container, ContainerList, CartHeader, TravelItem, Info, Quantity, Subtotal, CartFooter,
} from './styles';

function Cart() {
  const { state, setState } = useContext(CartContext);
  const totalPrice = state.cart.reduce((acc, travel) => acc + travel.price * travel.quantity, 0);

  function handleDelete(travel) {
    let copyCart = [...state.cart];
    const travelIndex = copyCart.findIndex((el) => el.id === travel.id);

    if (travel.quantity > 1) {
      copyCart[travelIndex].quantity -= 1;
    } else {
      copyCart = copyCart.filter((el, i) => (i !== travelIndex));
    }
    setState({
      cart: copyCart,
    });
  }

  return (
    <Container>
      <ContainerList>
        <CartHeader>
          <span id="product">PRODUCTO</span>
          <span id="quantity">CANTIDAD</span>
          <span id="price">PRECIO</span>
        </CartHeader>
        {state.cart.map((el) => (
          <TravelItem key={el.id}>
            <img src={el.photo} alt={el.title} />
            <Info>
              <p>{el.title}</p>
              <strong>{`R$ ${el.price}`}</strong>
            </Info>
            <Quantity>{el.quantity}</Quantity>
            <Subtotal>
              <p>{`$ ${el.price * el.quantity}.00`}</p>
              <button type="button" onClick={() => (handleDelete(el))}>
                <FaTrashAlt size={24} color="#0676D9" />
              </button>
            </Subtotal>
          </TravelItem>
        ))}
        <CartFooter>
          <div>
            TOTAL
            <strong>$ {totalPrice}.00</strong>
          </div>
        </CartFooter>
      </ContainerList>
    </Container>
  );
}

export default Cart;
