import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { CircleNotch } from "@phosphor-icons/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../services/firebase";
import "./styles.scss";

export const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRepeatPassword, setuserRepeatPassword] = useState("");
  const [modalError, setModalError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPasswordChange = (e) => {
    setUserPassword(e.target.value);
  };

  const handleUserRepeatPasswordChange = (e) => {
    setuserRepeatPassword(e.target.value);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if(!userPassword || !userRepeatPassword){
      setModalError(true)
      setModalMessage("As senhas são obrigatórias")
    }
    if (userPassword === userRepeatPassword) {
      createUserWithEmailAndPassword(userEmail, userPassword)
      .then((userCredential) => {
        updateProfile(userCredential.user, { displayName: userName })
        .then(() => {
          console.log("Nome do usuário definido com sucesso:", userName);
        })
        .catch((error) => {
          console.error("Erro ao definir o nome do usuário:", error.message);
        })
      });
    }else{
      setModalError(true)
      setModalMessage("As senhas digitadas não coicidem!")
    }
  };

  useEffect(() => {
    if (error && error.code === "auth/email-already-in-use") {
      setModalError(true);
      setModalMessage("O email fornecido já está em uso.")
    }
  }, [error]);

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="register-container">
      <h2>Registre-se</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <input
            type="text"
            id="userName"
            placeholder="Digite seu Nome"
            value={userName}
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div>
          <input
            type="text"
            id="userEmail"
            placeholder="Digite seu E-mail"
            value={userEmail}
            onChange={handleUserEmailChange}
          ></input>
        </div>
        <div>
          <input
            type="password"
            id="userPassword"
            placeholder="Digite sua Senha"
            value={userPassword}
            onChange={handleUserPasswordChange}
          ></input>
        </div>
        <div>
          <input
            type="password"
            id="userRepeatPassword"
            placeholder="Confirme sua Senha"
            value={userRepeatPassword}
            onChange={handleUserRepeatPasswordChange}
          ></input>
        </div>
        <p>
          Já tem uma conta ? <Link to="/">Acesse sua conta</Link>
        </p>
        <button className="registerUser" type="submit">
          {loading ? <CircleNotch /> : "Registrar"}
        </button>
      </form>
      {modalError && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Erro ao Registrar</h3>
            <p>{modalMessage}</p>
            <button
              className="modal-button"
              onClick={() => setModalError(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
