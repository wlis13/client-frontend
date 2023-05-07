import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderPedidos from '../components/cliente-pedidos/header';
import Card from '../components/cliente-pedidos/card';
import Context from '../context/Context';
import './products.css';

function Product() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const { totalPrice } = useContext(Context);

  useEffect(() => {
    async function fetchProduct() {
      const endpoint = 'https://client-backend-ivory.vercel.app/products';
      const result = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const productsList = await result.json();
      setProducts(productsList);
    }
    fetchProduct();
  }, []);

  return (
    <>
      <HeaderPedidos />
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ totalPrice === '0.00' }
        onClick={ () => {
          history.push('/customer/checkout');
        } }
        className="cart-button"
      >
        <span>🛒 Total - R$: </span>
        <span data-testid="customer_products__checkout-bottom-value">
          { `${totalPrice}` }
        </span>
      </button>
      <div className="container-products">
        <ul className="container-card">
          { products.map((product) => (
            <Card
              key={ product.id }
              id={ product.id }
              name={ product.name }
              imag={ product.url_image }
              price={ product.price }
            />)) }
        </ul>
      </div>
    </>
  );
}

export default Product;
