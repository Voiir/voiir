import axios from "axios";

export function postRequest(URI,params,access_token){
  axios
    .post(`https://api-voiir.herokuapp.com/api/${URI}`, 
    params,
    { headers: {"Authorization" : `Bearer ${access_token}`,'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',} ,
  })
    .then((response) => {
      console.log(response.data);
    });
}

export function getRequest(URI,access_token){
  axios
    .post(`https://api-voiir.herokuapp.com/api/${URI}`,
    { headers: {"Authorization" : `Bearer ${access_token}`,} ,
  })
    .then((response) => {
      console.log(response.data);
    });
}