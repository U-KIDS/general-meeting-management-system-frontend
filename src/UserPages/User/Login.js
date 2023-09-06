import React, { useState } from 'react';
import axios from 'axios';
import "./Login.css";
import loginLogo from '../../paran_logo.png';
import Input from "./input";
import useInput from "./useInput";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../../BaseUrl';

function Login(){

    window.sessionStorage.clear()
    
    let [values, setValues] = useState({
        studentNumber: "",
        password: "",
    })

    let [loginError, setLoginError] = useState(false);

    const handleChange = function(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const body = {
            studentNumber : values.studentNumber,
            password : values.password
        }

        axios.post(BASE_URL + "/auth/login", body)
        .then((response) => {
            window.sessionStorage.setItem("token", response.data.data.token)
            navigate("/")
        })
        .catch((error) => {
            console.log(error)
            setLoginError(true)
        })
    
        // try {
        //     const response = await axios.post('API_ENDPOINT_URL/login', {
        //         studentNumber,
        //         password,
        //     });
    
        //     // 요청이 성공적으로 완료되었을 때의 처리
        //     console.log(response.data); // 백엔드에서 보내준 응답 데이터
    
        //     // 입력 데이터 초기화
        //     resetStudentNumber();
        //     resetPassword();
    
        //     // 로그인 성공 시 메인 페이지로 이동
        //     navigate('/', { state: { name: '이름', major: '학과' } });
        // } catch (error) {
        //     // 요청이 실패했을 때의 처리
        //     console.error('로그인 실패:', error);
        //     // 로그인 실패 상태로 변경
        //     setLoginError(true);
        // }
      };

    return(
        <div className="User-container">
            <div className='User-header-container'>
                <div className='circle'/>
            </div>
            <div className='logo-div'>
                <img src={loginLogo} alt="login-logo" className="login-logo"/>
            </div>
            <div className='login-user-component'>
                <form className="form-container" onSubmit={handleSubmit} action="/login" method="post">
                    <div className="form-div">
                        <div className="div-inputbox">
                            <Input type="text" name="studentNumber" value={values.studentNumber} onChange={handleChange} placeholder="학번" required/>
                        </div>
                        <div className="div-inputbox">
                            <Input type="password" name="password" value={values.password} onChange={handleChange} placeholder="비밀번호" required/>
                        </div>
                        <button type="submit" className="submit-button">Log-in</button>
                        <button className="sub-button" onClick={() => navigate("/signup")}>Sign-up</button>
                        {loginError && navigate("/loginfail")}
                    </div>                    
                </form>      
            </div>
            <h2 className='likelion'>Desiged by 🦁LIKELION 11th & Paran</h2>
        </div>
    )
}

export default Login;