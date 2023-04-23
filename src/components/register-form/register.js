import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../login-form/login.css';

function RegisterForm() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [allowedToRegister, setAllowedToRegister] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    function validateRegistrationForm() {
      const emailRegex = /\S+@\S+\.\S+/i;
      const MIN_PASS_LENGTH = 6;
      const MIN_NAME_LENGTH = 12;

      const passwordIsValid = password.length >= MIN_PASS_LENGTH;
      const emailIsValid = emailRegex.test(email);
      const nameIsValid = name.length > MIN_NAME_LENGTH;

      return passwordIsValid && emailIsValid && nameIsValid;
    }
    setAllowedToRegister(validateRegistrationForm());
  }, [name, email, password]);

  async function registerNewUser() {
    const endpoint = 'http://localhost:3001/user/register';
    const creationResponse = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email, password, name, role: 'customer' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const CREATED_CODE = 201;
    if (creationResponse.status !== CREATED_CODE) {
      setShowError(true);
    } else {
      history.push('/customer/products');
    }
  }

  return (
    <div className="bubbles">

      <form onSubmit={ handleSubmit } className="login-register-form">
        <div className="inputs-container">
          <h1>Cadastre-se:</h1>
          <label htmlFor="name">
            Nome:
            <input
              onChange={ (event) => setName(event.target.value) }
              value={ name }
              type="text"
              data-testid="common_register__input-name"
              id="name"
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              onChange={ (event) => setEmail(event.target.value) }
              value={ email }
              type="email"
              data-testid="common_register__input-email"
              id="email"
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              onChange={ (event) => setPassword(event.target.value) }
              value={ password }
              type="password"
              data-testid="common_register__input-password"
              id="password"
            />
          </label>
          <div className="login-buttons">
            <button
              type="submit"
              data-testid="common_register__button-register"
              disabled={ !allowedToRegister }
              onClick={ registerNewUser }
            >
              Registrar
            </button>
            <button type="button" onClick={ () => history.push('/') }>
              Voltar
            </button>
          </div>
          {
            showError && (
              <p
                data-testid="common_register__element-invalid_register"
              >
                Algo deu errado!
              </p>
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

export default RegisterForm;
