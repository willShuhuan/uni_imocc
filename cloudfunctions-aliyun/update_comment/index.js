'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id, //用户id
		article_id, //文章id
		content, //评论内容
		comment_id = '', //评论id
		reply_id = '',//子回复id
		is_reply = false //是否是子回复
	} = event

	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	//获取当前的文章信息
	const article = await db.collection('article').doc(article_id).get()
	//获取文章下的所有评论
	const comments = article.data[0].comments

	let commentObj = {
		comment_id: genID(5), //评论id
		comment_content: content, //评论内容
		create_time: new Date().getTime(),
		is_reply:is_reply,//区分主回复子回复
		author: {
			author_id: user_id, //作者id
			author_name: user.author_name, //作者名称
			avatar: user.avatar, //作者头像
			professional: user.professional
		},
		replys: []
	}

	if (comment_id === '') {
		//评论文章
		commentObj.replys = [];
		commentObj = dbCmd.unshift(commentObj);
	} else {
		//对评论进行回复
		//获取评论的索引
		let commitIndex = comments.findIndex(item =>item.comment_id === comment_id)
		//获取作者信息
		
		let commitAuthor = ''
		if(is_reply){
			//子回复
			commitAuthor = comments[commitIndex].replys.find(item=>item.comment_id===reply_id)
		}else{
			//主回复
			commitAuthor = comments.find(item =>item.comment_id === comment_id)
		}
		commitAuthor = commitAuthor.author.author_name
		commentObj.to = commitAuthor
		
		//更新回复信息
		commentObj = {
			[commitIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
		/**
	   * 例 理解如下代码 
	   * commentObj = {
		  [commitIndex]:{
			  replys;dbCmd.unshift(commentObj)
		  }
	  }
	   * js更新数组 将obj对象中数组arr第二项的name属性
	   * let obj = {
		   arr:[{name:1},{name:2}]
	   }
	   * xxx.update({
		   arr：{
			   1:{
				   name：3
			   }
		   }
	   })
	   */
	}

	//更新数据表
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})


	//返回数据给客户端
	return {
		code: 200,
		message: "数据更新成功"
	}
};

function genID(length) {
	return Number(Math.random().toString().substring(3, length) + Date.now()).toString(36)
}
