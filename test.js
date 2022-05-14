
import axios from  'axios';
import jsSHA from  'jssha';

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

axios.get('https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON', { // 欲呼叫之API網址(此範例為台鐵車站資料)
	headers: getAuthorizationHeader(),
})
	.then(function(response){
		console.log(response.data);
	});