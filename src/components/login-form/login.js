import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import { FaUserAlt } from 'react-icons/fa';
import Context from '../../context/Context';
import './login.css';

function LoginForm() {
  const history = useHistory();
  const { setUser } = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.role === 'customer') {
      history.push('/customer/products');
    } else if (user && user.role === 'administrator') {
      history.push('/admin/manage');
    } else if (user && user.role === 'seller') {
      history.push('/seller/orders');
    }
  });

  useEffect(() => {
    function validateLogin() {
      const regex = /\S+@\S+\.\S+/i;
      const magicNumber = 5;
      return (regex.test(email) && password.length > magicNumber);
    }
    if (validateLogin()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleClick() {
    const endpoint = 'http://localhost:3001/user/login';
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const loginResponse = await response.json();

    if (loginResponse.message) {
      setShowError(true);
    } else {
      localStorage.setItem('user', JSON.stringify(loginResponse));
      setUser(loginResponse);
      if (loginResponse.role === 'customer') {
        history.push('/customer/products');
      } else if (loginResponse.role === 'administrator') {
        history.push('/admin/manage');
      } else if (loginResponse.role === 'seller') {
        history.push('/customer/orders');
      }
    }
  }

  return (
    <div className="bubbles">
      <form onSubmit={ handleSubmit } className="login-register-form">
        <div className="inputs-container">
          <h1>Login 🍺</h1>
          <label htmlFor="email">
            E-mail
            <input
              onChange={ (event) => setEmail(event.target.value) }
              value={ email }
              type="text"
              data-testid="common_login__input-email"
              id="email"
              placeholder="Digite seu e-mail"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              onChange={ (event) => setPassword(event.target.value) }
              value={ password }
              type="password"
              data-testid="common_login__input-password"
              id="password"
              placeholder="Digite sua senha"
            />
          </label>
          <div className="login-buttons">
            <button
              disabled={ isDisabled }
              type="submit"
              data-testid="common_login__button-login"
              onClick={ handleClick }
            >
              Login
            </button>
            <button
              type="button"
              data-testid="common_login__button-register"
              onClick={ () => history.push('/register') }
            >
              Cadastrar
            </button>
          </div>
          {
            showError && (
              <p data-testid="common_login__element-invalid-email">Algo deu errado!</p>
            )
          }

        </div>
      </form>
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
    </div>
  );
}

export default LoginForm;
