import React from 'react';
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import loginLogo from '../paran_logo.png';

function AdminLoginFail(){
    const navigate = useNavigate();
    return(
        <div className="User-container">
            <div className='User-header-container'/>
            <div className='logo-div'>
                <img src={loginLogo} alt="login-logo" className="login-logo"/>
            </div>
            <div className='login-user-component'>     
                <div className="form-div">
                    <span className='admin'>ADMIN</span>
                    <h2 className='loginFail'>로그인 정보가 일치하지 않습니다.</h2>
                    <button className="submit-button" onClick={() => navigate("/adminlogin")}>돌아가기</button>
                </div>
            </div>
            <h2 className='likelion'>Desiged by 🦁LIKELION 11th & Paran</h2>
        </div>
    )
}

export default AdminLoginFail;