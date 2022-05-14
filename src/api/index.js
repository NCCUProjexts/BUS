import axios from "axios"
import jsSHA from  'jssha';

// axios.defaults.baseURL = "";
axios.defaults.baseURL = ""
axios.defaults.headers.post["Content-Type"] = "application/json";

/*
  Function Usage Sample:

  ajax("/api/user/login", "post", {
    data: {}
    params:{}
  }).then(res => {  
    ...
  })
  
*/

const getAuthorizationHeader = function() {

  const AppID="431865b302074c87aefc8abea3583e89";
  const AppKey="nf3CuReSNCO0e5VYRQ0UJVsjlgo";

	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(AppKey, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	var HMAC = ShaObj.getHMAC('B64');
	var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

const ajax = (url, method, options) => {
  if (options !== undefined) {
    var { params = {}, data = {}  } = options;
  } else {
    params = data = null;
  }
  const headers = getAuthorizationHeader();
  return new Promise((resolve, reject) => {
    axios({ url, method, headers, params, data }).then(res => {
      resolve(res);
    }, res => {
      reject(res);
    })
  })
}

export default ajax