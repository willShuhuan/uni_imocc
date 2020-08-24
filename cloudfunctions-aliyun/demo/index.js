'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)
	//返回数据给客户端
	const collection = db.collection("user")

	//增加
	// let res = await collection.add([
	//  {
	//  	  name:'uni-app'
	//  },
	//  {
	//  	  name:'react'
	//  }
	// ])
	// console.log("数据插入",JSON.stringify(res));

	// 删除
	// let res2 = await collection.doc("5f3bd4aa8142e400018f0a80").remove();

	//更新
	// let res2 = await collection.doc("5f3bd4aa8142e400018f0a81").update({
	//  name:'html'
	// });
	//更新  update只能更新存在的记录，set 如果存在就更新 不存在就添加
	// let res2 = await collection.doc("123456").set({
	// 	  name:'html'
	// });
	// console.log("数据更新",JSON.stringify(res2));

	//查找
	//根据id查找
	const res3 = await collection.doc('5f3bd4aa8142e400018f0a81').get();
	console.log("数据查找", JSON.stringify(res3));
	//条件查找
	const res4 = await collection.where({
		name: event.name
	}).get();
	console.log("数据查找", JSON.stringify(res4));

	return {
		code: 200,
		message: "success",
		data: res4.data,
	}
};
