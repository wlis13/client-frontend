import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './header.css';

function HeaderPedidos() {
  const history = useHistory();
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <header className="main-header">
      <nav>
        <div>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </Link>
        </div>
        <div>
          <span
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { name }
          </span>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.removeItem('user');
              history.push('/');
            } }
          >
            Sair
          </button>
        </div>
      </nav>
    </header>
  );
}

export default HeaderPedidos;
