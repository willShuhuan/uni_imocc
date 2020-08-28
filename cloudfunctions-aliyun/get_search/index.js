'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		value
	} = event;
	
	const userinfo = await db.collection('user').doc(user_id).get();
	const article_likes_ids = userinfo.data[0].article_likes_ids;

	//聚合：更精细化地去处理数据 求和 、分组 、指定哪些字段
	const list = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			title:new RegExp(value)
		})
		.end();


	//返回数据给客户端
	return {
		code: 200,
		msg: "请求成功",
		data: list.data
	}
};
