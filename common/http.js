export default function $http(options){
	const {url,data} = options;
	const dataObj = {
		// user_id:"5f3d11c03d11c60001141e5f",
		user_id:"5f3d11c03d11c60001141e5e",
		...data
	};
	return new Promise((reslove,reject)=>{
		uniCloud.callFunction({
			name:url,
			data:dataObj
		}).then((res)=>{
			if(res.result.code === 200){
				// .then
				reslove(res.result)
			}else{
				// catch
				reject(res.result)
			}
		}).catch((err)=>{
			reject(err);
		})
	})
}