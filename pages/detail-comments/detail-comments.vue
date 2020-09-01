<template>
	<view>
		<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
			<comments-box :comments="item"></comments-box>
		</view>
		<uni-load-more iconType="snow" :status="loading" v-if="commentsList.length===0||commentsList.length>5"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id: '',
				commentsList:[],
				page:1,
				pageSize:5,
				loading:'loading'
			}
		},
		//页面上拉触底事件
		onReachBottom() {
			if(this.loading==='noMore') return
			this.page++;
			this.getComments();
		},
		methods: {
			//请求评论内容
			getComments() {
				this.$api.get_comments({
					article_id: this.article_id,
					page:this.page,
					pageSize:this.pageSize
				}).then(res => {
					const {
						data
					} = res;
					if(data.length<5){
						this.loading="noMore";
					}
					console.log('comments', res);
					//对象复制
					let oldComments = JSON.parse(JSON.stringify(this.commentsList));
					oldComments.push(...data);
					this.commentsList = oldComments;
				})
			}
		},
		onLoad(query) {
			this.article_id = query.id
			this.getComments();
		}
	}
</script>

<style lang="scss">
	.comment-content {
		padding: 0 15px;
		border-top: 1px #EEEEEE solid;
	}
</style>
