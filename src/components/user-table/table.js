import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));

    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/customer/orders/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const SUBSTR = 10;

  return (
    <section className="order-container">
      {
        orders.length > 0 && orders.map((order) => (
          <Link
            to={ `/customer/orders/${order.id}` }
            key={ order.id }
            className="order-card"
          >
            <div>
              <span>Pedido</span>
              <span
                data-testid={ `customer_orders__element-order-id-${order.id}` }
              >
                {order.id}
              </span>
            </div>

            <div>
              <span>Status</span>
              <span
                data-testid={ `customer_orders__element-delivery-status-${order.id}` }
              >
                {order.status}
              </span>
            </div>
            <div>
              <span>Data</span>
              <span
                data-testid={ `customer_orders__element-order-date-${order.id}` }
              >
                {order.saleDate
                  .toLocaleString().substr(0, SUBSTR).split('-').reverse()
                  .join('/') }
              </span>
            </div>
            <div>
              <span>Total</span>
              <span
                data-testid={ `customer_orders__element-card-price-${order.id}` }
              >
                {order.totalPrice.replace(/\./, ',')}
              </span>
            </div>
          </Link>
        ))
      }
    </section>

  );
}

export default UserTable;
