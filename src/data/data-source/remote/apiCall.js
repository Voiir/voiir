import axios from "axios";

export function postRequest(URI,params,access_token){
    axios
      .post(`https://api-voiir.herokuapp.com/api/${URI}`, 
      params,
      { headers: {"Authorization" : `Bearer ${access_token}`} })
      .then((response) => {
        console.log(response.data);
      });
}