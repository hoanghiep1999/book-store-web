import { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/UserActions';
import { toast } from 'react-toastify';

export default function LoginPage () {
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
          dispatch(setUser(res.data))
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

  return <div className="login-page">
    <div className="login-page-container">
      <div className="login-page-img" data-aos="fade-right">
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
          <span style={{marginLeft: "10px"}}>Back to home page</span>
        </Link>
        <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" alt="" />
      </div>
      <form className="login-page-form" data-aos="fade-left" onSubmit={submitForm}>
        <h3>Sign in</h3>
        <div className="login-page-input">
          <i className="fa-solid fa-envelope"></i>
          <input type="text" placeholder="Your email..." value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        </div>
        <span className="error">{errMessage && errMessage.email}</span>
        <div className="login-page-input">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Your password..." value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        </div>
        <span className="error">{errMessage && errMessage.pass}</span>
        <button type="submit">Sign in</button>
        <span className="res-err">{resMessage && resMessage}</span>
        <Link to="/register">Create an account</Link>
      </form>
    </div>
  </div>
}