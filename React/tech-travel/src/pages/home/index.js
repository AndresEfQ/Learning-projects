import React, { useEffect, useState, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import CartContext from '../../context/cart';
import api from '../../services/api';
import { Container, List, Unit } from './styles';

function Home() {
  const [travelList, setTravelList] = useState([]);
  const { state, setState } = useContext(CartContext);

  useEffect(() => {
    async function getTravelList() {
      const { data } = await api.get('/');
      setTravelList(data);
    }
    getTravelList();
  }, []);

  function handleAddToCart(travel) {
    const copyCart = [...state.cart];
    const travelIndex = copyCart.findIndex((el) => el.id === travel.id);
    if (travelIndex >= 0) {
      copyCart[travelIndex].quantity += 1;
    } else {
      copyCart.push({ ...travel, quantity: 1 });
    }

    setState({
      cart: copyCart,
    });
  }

  return (
    <Container>
      <List>
        {travelList.map((el) => (
          <Unit key={el.id}>
            <img src={el.photo} alt={el.title} />
            <p>{el.title}</p>
            <strong>$ {el.price}</strong>
            <button type="button" onClick={() => handleAddToCart(el)}>
              <div>
                <FaShoppingCart size={20} color="#fff" />
              </div>
              <span>Agregar al carrito</span>
            </button>
          </Unit>
        ))}
      </List>
    </Container>
  );
}

export default Home;
