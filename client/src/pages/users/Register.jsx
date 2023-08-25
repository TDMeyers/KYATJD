import axios from "../../api";
import { FaFacebookF } from 'react-icons/fa'
import {ImGooglePlus } from 'react-icons/im'
import {RiLinkedinFill } from 'react-icons/ri'



import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

let emptyForm = { 
    username: '',
    password: '',
    email: ''
}

function Register({ setUser }) {
    // const containerRef = useRef(null);

    // useEffect(() => {
    //     containerRef.current.classList.add("right-panel-active");
    // }, []);

    const navigate = useNavigate()

    let [form, setForm] = useState(emptyForm)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const authResponse = await axios.post('/auth/register', form)
            const token = authResponse.data.token
    
            if (!token) {
                setForm(emptyForm)
                return
            }
    
            localStorage.setItem("token", token)
    
            const userResponse = await axios.get('/api/users', {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              })
    
            setUser(userResponse.data)
    
            navigate('/posts')

        } catch(err) {

            console.log(err)
            alert(err.response.data.error)
            
        }
    }
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
      // This effect will run after the component is mounted
      setShowAnimation(true);
    }, []);
    return ( 
        <div className="body">
<div className={showAnimation? "container right-panel-active" : "container"} id="container" >
        <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"><FaFacebookF/></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"><ImGooglePlus/></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"><RiLinkedinFill/></i></a>
                </div>
                <span>or use your email for registration</span>
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                    placeholder="Name"
                />
                <input 
                    type="email" 
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={form.email}
                    placeholder="Email"
                />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    placeholder="Password"
                />
                <button>Sign Up</button>
            </form>
        </div>
        <div className="form-container log-in-container">
            <form onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <div className="social-container">
                    <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                    <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your account</span>
                <input 
                    type="text" 
                    id="username"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                    placeholder="Username"
                />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    placeholder="Password"
                />
                <a href="#">Forgot your password?</a>
                <button>Log In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>Already have an account? Log In</p>
                    <button className="ghost" id="logIn" onClick={()=>{
                        
                        navigate("/login")}}>Log In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, There!</h1>
                    <p>Don't have an account? Sign Up Free</p>
                    <button className="ghost" id="signUp" >Sign Up</button>
                </div>
            </div>
        </div>
    </div> 
    </div>

     );
}

export default Register;