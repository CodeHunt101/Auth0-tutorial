// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler (req, res) {
  console.log(req.body.code)

  var axios = require("axios").default;

  var options = {
    method: 'POST',
    url: 'https://dev-haroldtm.au.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: 'dEnK3ppb1E2mGcaHoe24S6v23Y9lX66T',
      client_secret: 'jcwYTh4M3SbvLlt_H-e7vu_jbaKFAadPjS9peiMZlO5ph9rL4NXxD0cUbD5zCuIj',
      code: req.body.code,
      redirect_uri: 'http://localhost:3000/callback'
    })
  };

  axios.request(options).then(function (response) {
    console.log("RESPONSE DATA ====>",response.data);
  })
  // .catch(function (error) {
  //   console.error("ERROR =====>",error);
  // });
}
