import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const GoogleLoginBtn = () => {
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
      );
    
      const handleFailure = (result) => {
        alert(result);
      };
    
      const handleLogin = async (googleData) => {
        const res = await axios.post("http://localhost:9087/ejar/login", {
          "email" : googleData.profileObj.email
        });
        console.log(res);
    
        //res.data should include all the user account information. Currently iy only has user email. It will include more user information such as jar collection when MongoDB is implemented
        setLoginData(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
      };
    
      const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
      };
  return (
    <div>
    {
        loginData ? (
          <div>
            <h3>You logged in as {loginData.email}</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login or signup with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
        )
      }
    </div>
  )
}

export default GoogleLoginBtn
