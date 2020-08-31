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