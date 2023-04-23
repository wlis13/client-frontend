import React, { useEffect, useState, useContext } from 'react';
import '../user-table/table.css';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

function SellerDetails() {
  const history = useHistory();
  const { handleStatus, statusSales, setStatusSales } = useContext(Context);
  const [getOrder, setOrder] = useState([]);
  // const [statusSales, setStatusSales] = useState('');
  const [getCart, setCart] = useState([]);

  const getUrl = history.location.pathname;
  const CARACTER_NUMBER = 15;
  const getIdUrl = getUrl.substring(CARACTER_NUMBER);

  const CARACTER_DATA = 10;

  function updateProducts([{ products }]) {
    setCart(products);
  }

  const contentTypes = 'application/json';

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/product/${Number(getIdUrl)}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': contentTypes,
        },
      });
      const data = await response.json();
      console.log(data);
      updateProducts(data);
      setStatusSales(data[0].status);
      setOrder(data);
    }
    fetchOrders();
  }, []);

  // async function handleStatus(status) {
  //   await fetch(`http://localhost:3001/sale/${getIdUrl}`, {
  //     method: 'PATCH',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': contentTypes,
  //     },
  //     body: JSON.stringify({ status }),
  //   });
  //   setStatusSales(status);
  // }

  const TEST_PREFIX = 'seller_order_details__element-order-details-';

  return (
    <div className="improviso">
      <h1>Detalhes do pedido</h1>
      {getOrder.length ? getOrder.map((iten) => (
        <div key={ iten.id }>
          <p
            data-testid={ `${TEST_PREFIX}label-order-id` }
          >
            { iten.id }
          </p>
          {/* <p
            data-testid={ `${TEST_PREFIX}label-seller-name ` }
          >
            { seller.name }
          </p> */}
          <p
            data-testid={ `${TEST_PREFIX}label-order-date ` }
          >
            { getOrder[0].saleDate.substring(0, CARACTER_DATA)
              .split('-').reverse().join('/') }
          </p>
          <p
            data-testid={ `${TEST_PREFIX}label-delivery-status ` }
          >
            { statusSales }
          </p>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ statusSales !== 'Pendente' }
            onClick={ () => handleStatus('Preparando', getIdUrl) }
          >
            PREPARAR PEDIDOS

          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ ['Pendente', 'Em Trânsito', 'Entregue']
              .includes(statusSales) }
            onClick={ () => handleStatus('Em Trânsito', getIdUrl) }
          >
            SAIU PARA ENTREGA

          </button>
          <p data-testid="seller_order_details__element-order-total-price">
            {`Total: R$ ${getOrder[0].totalPrice.replace('.', ',')}`}
          </p>
        </div>
      )) : <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            getCart.length ? getCart.map((product, index) => {
              const { name, price, SaleProduct: { productId, quantity,
              } } = product;
              const unitPrice = Number(price);
              const subTotal = unitPrice * quantity;
              // test ids

              return (
                <tr key={ productId }>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}item-number-${index}` }
                    >
                      { index + 1}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}name-${index}` }
                    >
                      {name}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}quantity-${index}` }
                    >
                      {quantity}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}unit-price-${index}` }
                    >
                      {unitPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}sub-total-${index}` }
                    >
                      {Number(subTotal).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                </tr>
              );
            }) : <tr>Loading...</tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default SellerDetails;
