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
          dispatch(setUser(res.data))
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
  
  return <div className="register-page">
    <div className="register-page-container">
      <form className="register-page-form" data-aos="fade-right" onSubmit={submitForm}>
        <Link to="/">
          <i className="fas fa-arrow-left"></i>
          <span style={{marginLeft: "10px"}}>Back to home page</span>
        </Link>
        <h3>Sign up</h3>
        <div className="register-page-input">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Your name..." value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
        </div>
        <span className="error">{errMessage && errMessage.name}</span>
        <div className="register-page-input">
          <i className="fas fa-user"></i>
          <input type="text" placeholder="Your email..." value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
        </div>
        <span className="error">{errMessage && errMessage.email}</span>
        <div className="register-page-input">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Your password..." value={registerPass} onChange={(e) => setRegisterPass(e.target.value)} />
        </div>
        <span className="error">{errMessage && errMessage.pass}</span>
        <div className="login-page-input">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Your repeat password..." value={registerCheckPass} onChange={(e) => setRegisterCheckPass(e.target.value)} />
        </div>
        <span className="error">{errMessage && errMessage.checkPass}</span>
        <button type="submit">Register</button>
        <Link to="/login">I am already member</Link>
      </form>
      <div className="register-page-img" data-aos="fade-left">
        <img src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg" alt="" />
      </div>
    </div>
  </div>
}

/* <div className="register-page-input">
          <i className="fas fa-lock"></i>
          <input type="password" placeholder="Repeat your password..." {...register('password_repeat', { required: true })} ref={register({
            validate: value =>
              value === password.current || "The passwords do not match"
          })}/>
          <span className="error">{errors.password_repeat && errors.password_repeat.message}</span>
        </div>*/