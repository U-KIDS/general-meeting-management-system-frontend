import React from "react";
import './User.css';

const Input = ({ type, value, onChange, placeholder }) => {
  return (
    <>
        <input className="user-input"
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    </>
  );
};

export default Input;
