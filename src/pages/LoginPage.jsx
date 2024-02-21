import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/App.css';
import UserContext from '../Context/UserContext';




function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {isLoged, setIsLoged} = useContext(UserContext);

  const users = [
    { email: "merlin@gmail.com", password: "admin" },
  ];
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setIsLoged(true)
      setErrorMessage('');
      console.log('Usuario autenticado correctamente');
      navigate('/Expresion');
    } else {
      setErrorMessage('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <>
      <form className="bg-form-bg" onSubmit={handleSubmit}>
  <div className='container'>
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Iniciar sesión</h1>
  </div>
  <div className="mb-6">
    <label htmlFor="exampleInputEmail1" className="form-label block text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
    <input  placeholder="name@company.com" type="email" className="input-field" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
    <div id="emailHelp" className="form-text">No compartas tu correo con nadie</div>
  </div>
  <div className="mb-6">
    <label htmlFor="exampleInputPassword1" className="form-label block text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
    <input placeholder="••••••••" type="password" className="input-field" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
  </div>
  <button type="submit" className="buttonl">Iniciar sesión</button>
  {errorMessage && <p className="error-message">{errorMessage}</p>}
</form>

    </>
  );
}

export default App;
