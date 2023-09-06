import { useNavigate } from "react-router-dom";

const BASE_URL = "https://ukids-server.site"
const CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": BASE_URL,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Access-Control-Allow-Credentials':"true",
      "Content-Type": `application/json`,
    }
};

const TOKEN_CONFIG = () => {

    const navigate = useNavigate();
    
    if (sessionStorage.getItem("token") === null) {
        sessionStorage.clear()
        navigate("/login")
    } else {
        return {
            headers: {
                "Access-Control-Allow-Origin": BASE_URL,
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'Access-Control-Allow-Credentials':"true",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }
    }
}

export {BASE_URL, CONFIG, TOKEN_CONFIG}