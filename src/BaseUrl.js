const BASE_URL = "http://13.124.13.196:8080"
const CONFIG = {
    headers: {
      "Access-Control-Allow-Origin": BASE_URL,
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      'Access-Control-Allow-Credentials':"true",
    }
};

export {BASE_URL, CONFIG}