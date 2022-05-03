import { useState } from 'react';
import './RegisterPage.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/UserActions';
import { toast } from 'react-toastify';

export default function RegisterPage () {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerCheckPass, setRegisterCheckPass] = useState("");
  const [errMessage, setErrMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validation = () => {
    const message = {
      name: "",
      email: "",
      pass: "",
      checkPass: ""
    }

    if(!registerName) {
      message.name = "Username is required!"
    }
    if(!registerEmail) {
      message.email = "Email is required!"
    }
    else {
      //eslint-disable-next-line
      if(!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(registerEmail)) {
        message.email = "Email is not correct!"
      }
    }
    if(!registerCheckPass) {
      message.checkPass = 'Repeat password is required!';
    }
    if(!registerPass) {
      message.pass = 'Password is required!'
    }
    else {
      if(registerPass.length <= 6) {
        message.pass = 'Password must be more than 6 characters'
      }
      else {
        if(registerCheckPass !== registerPass) {
          message.checkPass = 'Repeat password must be correct!'
        }
      }
    }

    return message;
  }

  const submitForm = (e) => {
    e.preventDefault();
    const errorMessage = validation();
    if(!errorMessage.name && !errorMessage.email && !errorMessage.pass && !errorMessage.checkPass) {
      axios.post('https://dhh-book-store-app.herokuapp.com/api/user/new', {
        userName: registerName,
        email: registerEmail,
        passWord: registerPass,
        createAt: Date.now()
      }).then(res => {
        if(typeof (res.data) === 'object') {
          dispatch(setUser(res.data.email))
          setErrMessage({...errorMessage});
          setRegisterName("");
          setRegisterEmail("");
          setRegisterPass("");
          setRegisterCheckPass("");
          toast.success(`Welcome ${registerEmail}!`);
          navigate('/');
        }
        else {
          setErrMessage({...errorMessage, email: res.data});
        }
      }).catch(err => {
        throw err;
      })
    }
    else {
      setErrMessage({...errorMessage});
    }
  }
  
  return (
    <div className="register-page">
      <div className="register-page-container">
        <Link to="/" className="register-link register-link--homepage"><i className="fa-solid fa-arrow-left"></i><span>Back to home page</span></Link>
        <h2>Register</h2>
        <form className="register-form" onSubmit={submitForm}>
          <div className="register-form-group">
            <label htmlFor="name" className="register-form-label">Name</label>
            <div className="register-form-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" id="name" autoComplete="off" placeholder="Your name..." value={registerName} onChange={(e) => setRegisterName(e.target.value)} className="register-form-input" />
            </div>
            <span className="error">{errMessage && errMessage.name}</span>
          </div>
          <div className="register-form-group">
            <label htmlFor="email" className="register-form-label">Email</label>
            <div className="register-form-wrap">
              <i className="fa-solid fa-envelope"></i>
              <input type="text" id="email" autoComplete="off" placeholder="Your email..." value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="register-form-input" />
            </div>
            <span className="error">{errMessage && errMessage.email}</span>
          </div>
          <div className="register-form-group">
            <label htmlFor="password" className="register-form-label">Password</label>
            <div className="register-form-wrap">
              <i className="fa-solid fa-lock"></i>
              <input type="password" id="password" placeholder="Your password..." value={registerPass} onChange={(e) => setRegisterPass(e.target.value)} className="register-form-input" />
            </div>
            <span className="error">{errMessage && errMessage.pass}</span>
          </div>
          <div className="register-form-group">
            <label htmlFor="checkpassword" className="register-form-label">Check password</label>
            <div className="register-form-wrap">
              <i className="fa-solid fa-lock"></i>
              <input type="password" id="checkpassword" placeholder="Your check password..." value={registerCheckPass} onChange={(e) => setRegisterCheckPass(e.target.value)} className="register-form-input" />
            </div>
            <span className="error">{errMessage && errMessage.checkPass}</span>
          </div>
          <button type="submit" className="register-form-btn">Register</button>
        </form>
        <Link to="/login" className="register-link register-link--signup"><span>I am already member</span></Link>
      </div>
    </div>
  );
}