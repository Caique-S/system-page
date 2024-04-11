import { useState,useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { CircleNotch , GoogleLogo } from "@phosphor-icons/react";
import { useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider , signInWithPopup } from 'firebase/auth'
import { auth } from '../../services/firebase';
import Logo from '../../assets/logo.png';
import './styles.scss'

export const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalError, setModalError] = useState();
  const [modalMessage, setModalMessage] = useState("");
  const [login, setLogin] = useState(false)
  const [signInWithEmailAndPassword,loading,error,] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
  
    if (error && error.code === "auth/invalid-credential") {
      setModalError(true);
      setModalMessage("Verifique seu e-mail e senha!")
    }
  }, [error]);


  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    try {
      await signInWithPopup(auth,provider).then((userCredential)=> {
        localStorage.setItem('googleUserSignIn',JSON.stringify(userCredential.user));
      })
      setLogin(true)
    } catch (error) {
      console.log(error)      
    }
  }
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password){
      setModalError(true);
      setModalMessage("Preencha o campo de senha!")
    }
    signInWithEmailAndPassword(username,password)
    .then((userCredential) => {
      const user = {
        id: userCredential.user.uid,
        name: userCredential.user.displayName,
        email: userCredential.user.email
      }
      localStorage.setItem('userSignIn',JSON.stringify(user));
      setLogin(true)
    }).catch((error)=>{
      console.log("Password: " + error)
    })
  };

  return (
    <div className="login-container">
      <div className="loginLogo">
        <img src={Logo} alt="Logo da Code Craft" />
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            placeholder='Digite seu Usuário'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder='Digite sua Senha'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="loginUser" type="submit">
        {loading ? <CircleNotch /> : "Entrar"}
        </button>
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Registre-se</Link>
      </p>
      <button className="loginGoogle" type="submit" onClick={handleGoogleAuth}>
        <GoogleLogo className="gLogo"/>
        Entrar com Google
      </button>
      {modalError && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Erro ao Entrar</h3>
            <p>{modalMessage}</p>
            <button
              className="modal-button"
              onClick={() => setModalError(false)}
            >
              OK
            </button>
          </div>
        </div>
      )},{login && <Navigate to="/home" replace={true}/>}
    </div>
  );
};