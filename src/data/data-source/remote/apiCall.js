import axios from 'axios';

export async function postRequest(URI, params, access_token) {
  var temp = await axios.post(
    `https://api-voiir.herokuapp.com/api/${URI}`,
    params,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    }
  );

  return temp;
}

export async function getRequest(URI, access_token) {
  var temp = await axios.post(`https://api-voiir.herokuapp.com/api/${URI}`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return temp;
}

