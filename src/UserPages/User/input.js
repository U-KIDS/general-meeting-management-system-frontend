import React from "react";
import './Login.css';

const Input = ({ type, value, onChange, placeholder, name }) => {
  return (
    <>
        <input className="user-input"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
        />
    </>
  );
};

export default Input;
