import { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/UserActions';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errMessage, setErrMessage] = useState({email: "", pass: "", checkPass: ""});
  const [resMessage, setResMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validation = () => {
    const message = {
      email: "",
      pass: "",
    }

    if(!loginEmail) {
      message.email = "Email is required!"
    }
    else {
      //eslint-disable-next-line
      if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(loginEmail)) {
        message.email = "Email is not correct!"
      }
    }
    if(!loginPassword) {
      message.pass = 'Password is required!'
    }
    else {
      if(loginPassword.length <= 6) {
        message.pass = 'Password must be more than 6 characters'
      }
    }

    return message;
  }

  const submitForm = (e) => {
    e.preventDefault();
    const errorMessage = validation();
    if(!errorMessage.name && !errorMessage.email && !errorMessage.pass && !errorMessage.checkPass) {
      axios.post('https://dhh-book-store-app.herokuapp.com/api/user/login', {
        email: loginEmail,
        passWord: loginPassword,
      }).then(res => {
        setErrMessage({...errorMessage});
        if(typeof (res.data) === 'object') {
          console.log(res.data);
          dispatch(setUser(res.data.email));
          setResMessage();
          setLoginEmail("");
          setLoginPassword("");
          toast.success(`Welcome back ${loginEmail}!`);
          navigate('/');
        }
        else {
          setResMessage(res.data);
        }
      }).catch(err => {
        throw err;
      })
    }
    else {
      setErrMessage({...errorMessage});
      setResMessage();
    }
  }

  return (
    <div className="login-page">
      <div className="login-page-container">
        <Link to="/" className="login-link login-link--homepage"><i className="fa-solid fa-arrow-left"></i><span>Back to home page</span></Link>
        <h2>Login</h2>
        <form className="login-form" onSubmit={submitForm}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">Email</label>
            <div className="login-form-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" id="email" autoComplete="off" placeholder="Your email..." value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="login-form-input" />
            </div>
            <span className="error">{errMessage && errMessage.email}</span>
          </div>
          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">Password</label>
            <div className="login-form-wrap">
              <i className="fa-solid fa-lock"></i>
              <input type="password" id="password" placeholder="Your password..." value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="login-form-input" />
            </div>
            <span className="error">{errMessage && errMessage.pass}</span>
          </div>
          <button type="submit" className="login-form-btn">Login</button>
          <span className="res-err">{resMessage && resMessage}</span>
        </form>
        <Link to="/register" className="login-link login-link--signup"><span>Create an account</span></Link>
      </div>
    </div>
  );
}