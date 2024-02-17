import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import '../assets/css/App.css'

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const  users =[
    { email:"merlin@gmail.com", password:"123" },
  ];
  const Navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      setErrorMessage('');
      console.log('Usuario autenticado correctamente');
      Navigate('/Table');

    } else {
      setErrorMessage('Correo electrónico o contraseña incorrectos');
    }
  };

    return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Correo electronico</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"value={email} onChange={(e) => setEmail(e.target.value)} />
            <div id="emailHelp" class="form-text">No compartas tu correo con nadie</div>
          </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="exampleInputPassword1"  value={password}  onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </>
  )
}

export default App
