import { useState } from 'react'
import Banner from '../../assets/images/LoginIcon.svg'
import LogoLogin from '../../assets/images/Logo-Login.png'
import showPassword from '../../assets/images/show-pw.svg'
import { loginAdmin, validateLogin } from '../../Utils/validation'
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ErrMsg } from '../../components/Error/ErrMsg'
import { useNavigate } from "react-router-dom"


export const Login = () => {
    return(
        <div className="container" style={{ height: '100vh', width: '100vw' }}>
        <div className="row h-100 align-items-center">
            <div className="col-lg-7 d-none d-lg-block">
            <img src={Banner} alt="Banner" className="img-fluid" />
            </div>

            <div className="col-lg-5">
            <div className=" mt-3 d-flex justify-content-center">
                <img src={LogoLogin} alt="Logo" className="img-fluid"></img>
            </div>
            <div>
                <FormLogin />
                
            </div>
            </div>

        </div>
        </div>
    )
}

const FormLogin = () => {

    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: ''
    })


    // const [errorMsg, setErrorMsg] = useState({
    //     email: '',
    //     password: ''
    // })

    const [showPassword, setShowPassword] = useState(false);

    const handleFormInput = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value 
        })
    }

    const handlePostLogin = async () => {
        console.log("handlePostLogin called");
        const formData = loginAdmin(form); 
        console.log("Form Data to be sent:", formData);

        if (validateLogin(form, setError)) {
            try {
                const res = await axios.post('http://localhost:3000/api/v1/user/login', formData);
                console.log("Response:", res);
    
                if (res.status === 200) {
                    const { token } = res.data;
                    Cookies.set('_token', token);
                    toast.success("Login successful");
                    navigate("/")
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Anda gagal login", { delay: 800 });
            }
        } else {
            console.log("Validation failed");
        }
    }

    // const validateLogin = (form) => {
    //     let valid = true;
    //     const { name, value } = form
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    //     if(name === "email"){
    //         // validasi email tidak boleh kosong
    //         if(value === "") {
    //             setErrorMsg({
    //                 ...errorMsg,
    //                 email: 'Email tidak boleh kosong.'
    //             })
    //         } else if(!emailRegex.test(value)){
    //             setErrorMsg({
    //                 ...errorMsg,
    //                 email: 'Masukkan email yang valid.'
    //             })
    //         }
    //         else {
    //             setErrorMsg({
    //                 ...errorMsg,
    //                 email: ''
    //             })
    //         }
    //     } else (name === "password") {
    //         // validasi password tidak boleh kosong
    //         if(value === "") {
    //             setErrorMsg({
    //                 ...errorMsg,
    //                 password: 'Password tidak boleh kosong.'
    //             })
    //         // } else if(!passwordRegex.test(value)){
    //         //     setErrorMsg({
    //         //         ...errorMsg,
    //         //         password: 'Password harus memiliki setidaknya 8 character, 1 special character, angka, dan huruf.'
    //         //     })
    //         } else {
    //             setErrorMsg({
    //                 ...errorMsg,
    //                 password: ''
    //             })
    //         }
    //     } else {

    //     }
    // }

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return(
        <form className='mt-4' >
            <div className="mb-3">
                <h3 className="fw-bold text-primary">Portal Admin</h3>
                <p>Manajemen Informasi dengan baik, Silahkan Masuk Untuk Mengakses!</p>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email 
                </label>
                <input
                    type="email"
                    className="form-control"
                    name='email'
                    value={form.email}
                    placeholder="Masukkan Email"
                    autoComplete="email"
                    onChange={handleFormInput}
                />
                <ErrMsg msg={error.email} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password 
                </label>
                <div className="input-group ">
                    <input
                        type={'password'}
                        className="form-control border-end-0"
                        name="password"
                        value={form.password}
                        placeholder="Masukkan password"
                        autoComplete="current-password"
                        onChange={handleFormInput}
                        
                    />
                    {/* <span className='input-group-text bg-white' onClick={handleTogglePasswordVisibility}>
                        <img src={showPassword ? 'src/hide-pw.svg' : 'scr/show-pw.svg'} alt={showPassword ? 'Hide password' : 'Show password'} />
                    </span> */}
                    </div>
                    {/* <p className='error'>{errorMsg.password}</p> */}
                    <ErrMsg msg={error.password} />
                </div>
                <div className='d-flex flex-column gap-3'>
                <button className="btn btn-primary" type="button" onClick={handlePostLogin}>
                Login
                </button>
                </div>
        </form>
    )
}