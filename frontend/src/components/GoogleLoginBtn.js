import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const GoogleLoginBtn = () => {
      let navigate = useNavigate();

      const handleFailure = (result) => {
        alert(result);
      };
    
      const handleLogin = async (googleData) => {
        const res = await axios.post("http://localhost:9088/ejar/getUserInfo", {
          "email" : googleData.profileObj.email,
          "familyName" : googleData.profileObj.familyName,
          "givenName" : googleData.profileObj.givenName
        });
    
        localStorage.setItem('loginData', JSON.stringify(res.data));
        const res2 = await axios.post("http://localhost:9088/ejar/getJar", googleData.profileObj.email);
        localStorage.setItem('jars', JSON.stringify(res2.data));
        navigate("/jar-collections");
      };

  return (
    <div>
    {
          <GoogleLogin 
            to='/jar-collections'
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login or signup with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
      }
    </div>
  )
}

export default GoogleLoginBtn
