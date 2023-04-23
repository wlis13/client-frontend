import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({});
  const [statusSales, setStatusSales] = useState('');
  const contentType = 'application/json';

  function sumCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartReduce = (cart.reduce(
      (acc, currentValue) => acc + currentValue.subTotal,
      0,
    ));
    setTotalPrice(cartReduce.toFixed(2));
  }

  async function handleStatus(status, id) {
    await fetch(`http://localhost:3001/sale/${id}`, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': contentType,
      },
      body: JSON.stringify({ status }),
    });
    setStatusSales(status);
  }

  const value = useMemo(() => ({
    totalPrice,
    user,
    setUser,
    sumCart,
    handleStatus,
    statusSales,
    setStatusSales,
  }), [totalPrice, user, statusSales]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
