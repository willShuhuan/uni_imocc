'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const {
  	user_id='',
  } = event;
  
  if(!user_id){
	  return {
	  	code: 201,
	  	msg: "获取用户信息失败"
	  }
  }
  
  let userinfo = await db.collection('user').doc(user_id).get();
  
  //返回数据给客户端
  return {
  	code: 200,
  	msg: "请求成功",
  	data: userinfo.data[0]
  }
  
};
