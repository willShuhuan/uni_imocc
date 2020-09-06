 import $http from "../http.js"
 //获取首页栏目数据
 export const get_label = (data) =>{
	return $http({
		url:'get_label',
		data
	})
}
//获取列表数据
 export const get_list = (data) =>{
	return $http({
		url:'get_list',
		data
	})
}
//点赞文章
 export const update_likes = (data) =>{
	return $http({
		url:'update_likes',
		data
	})
} 
// 搜索数据
 export const get_search = (data) =>{
	return $http({
		url:'get_search',
		data
	})
}
//更新栏目
export const update_label = (data) => {
	return $http({
		url: 'update_label',
		data
	})
}
//获取文章详情
export const get_detail = (data) =>{
	return $http({
		url:'get_detail',
		data
	})
}
//发布/更新评论
export const update_comment = (data) =>{
	return $http({
		url:'update_comment',
		data
	})
}
//获取文章评论
export const get_comments = (data) =>{
	return $http({
		url:'get_comments',
		data
	})
}
//关注作者/取关
export const update_author = (data) =>{
	return $http({
		url:'update_author',
		data
	})
}
//点赞
export const update_thumbsup = (data) =>{
	return $http({
		url:'update_thumbsup',
		data
	})
}
//获取关注文章数据
export const get_follow = (data) =>{
	return $http({
		url:'get_follow',
		data
	})
}
//获取关注作者数据
export const get_author = (data) =>{
	return $http({
		url:'get_author',
		data
	})
}
//获取用户信息
export const get_user = (data) =>{
	return $http({
		url:'get_user',
		data
	})
}
//获取我的文章
export const get_my_articles = (data) =>{
	return $http({
		url:'get_my_articles',
		data
	})
}
//提交意见反馈
export const update_feedback = (data) =>{
	return $http({
		url:'update_feedback',
		data
	})
}