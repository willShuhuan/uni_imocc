'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id
	} = event;
	
	let userinfo = await db.collection('user').doc(user_id).get();
	userinfo = userinfo.data[0];

	//聚合：更精细化地去处理数据 求和 、分组 、指定哪些字段
	const list = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			is_like:$.in(['$_id',userinfo.article_likes_ids])
		})
		.match({
			id:dbCmd.in(userinfo.article_ids)
		})
		.project({
			content: false
		})
		.end();

	//返回数据给客户端
	return {
		code: 200,
		msg: "请求成功",
		data: list.data
	}
};
