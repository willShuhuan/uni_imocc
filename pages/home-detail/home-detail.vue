<template>
	<view class="detail">
		<view class="detail-title">
			{{formData.title}}
		</view>
		<view class="detail-header">
			<view class="detail-header_logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">
					{{formData.author.author_name}}
				</view>
				<view class="detail-header_content-info">
					<text >{{formData.create_time}}</text>
					<text>{{formData.browse_count}}浏览</text>
					<text>{{formData.thumbs_up_count}}赞</text>
				</view>
			</view>
		</view>
		<view class="detail-content">
			<view class="detail-html">
				<!-- <u-parse :content="formData.content" :noData="noData"></u-parse> -->
			</view>
			<view class="detail-comment">
				<view class="comment-title">
					最新评论
				</view>
				<view class="comment-content" v-for="item in commentsList" :key="item.comment_id">
					<comments-box :comments="item" @reply="reply"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#f07373"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons—box">
					<uni-icons type="chat" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons—box">
					<uni-icons type="heart" size="22" color="#f07373"></uni-icons>
				</view>
				<view class="detail-bottom_icons—box">
					<uni-icons type="hand-thumbsup" size="22" color="#f07373"></uni-icons>
				</view>
			</view>
		</view>
		<!-- ref只能绑定在自定义组件上 -->
		<uni-popup  ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="opoup-header_item" @click="close">取消</text>
					<text class="opoup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-content">
					<textarea class="popup-textarea" v-model="commentValue" maxlength="200" fixed placeholder="请输入评论内容" />
					<view class="popup-count">
						{{commentValue.length}}/200
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uParse from "@/components/gaoyia-parse/parse.vue"
	export default {
		components:{
			uParse,
		},
		data() {
			return {
				formData:{},
				noData:'<p style="text-align:center;color:#666">详情加载中</p>',
				//输入框的值
				commentValue:'',
				commentsList:[],
				replyFromData:{}
			}
		},
		methods: {
			//获取详情信息
			getDetail(){
				this.$api.get_detail(
				{
					article_id:this.formData._id
				}).then(res=>{
					const {data} = res;
					this.formData = data;
					console.log(res);
				})
			},
			//打开评论发布窗口
			openComment(){
				this.$refs.popup.open()
			},
			//关闭弹窗
			close(){
				this.$refs.popup.close()
			},
			//发布评论
			submit(){
				if(!this.commentValue){
					uni.showToast({
						title:"请输入评论",
						icon:'none'
					})
					return
				}
				
				const formdata = {
					article_id:this.formData._id,
					content:this.commentValue,
					...this.replyFromData
				}
				console.log('reply',formdata);
				uni.showLoading();
				this.$api.update_comment(formdata).then(res=>{
					uni.hideLoading();
					this.getComments();
					this.close();
					this.replyFromData = {};
					this.commentValue = '';
					uni.showToast({
						title:"评论发布成功",
					})
				})
				
			},
			//请求评论内容
			getComments(){
				this.$api.get_comments({
					article_id:this.formData._id,
				}).then(res=>{
					const {data} = res;
					console.log('comments',res);
					this.commentsList = data;
				})
			},
			//回复评论
			reply(e){
				this.replyFromData = {
					"comment_id":e.comments.comment_id,
					"is_reply":e.is_reply
				}
				if(e.comments.reply_id){
					this.replyFromData.reply_id = e.comments.reply_id;
				}
				console.log(this.replyFromData);
				this.openComment()
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			this.getDetail()
			this.getComments()
		},
		onReady() {
			//所有组件渲染完毕之后
			
		}
	}
</script>

<style lang="scss">
	.detail{
		padding: 15px 0;
		padding-bottom: 54px;
		.detail-title{
			padding: 0px 15px;
			font-size: 18px;
			font-weight: blod;
			color: #333;
		}
		.detail-header{
			display: flex;
			align-items: center;
			margin-top: 10px;
			padding: 0 15px;
			flex-shrink: 0;
			.detail-header_logo{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.detail-header_content{
				padding-left: 10px;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;
				.detail-header_content-title{
					font-size: 14px;
					color: #333;
				}
				.detail-header_content-info{
					color: #999;
					text{
						margin-right: 10px;
					}
				}
			}
		}
		.detail-content{
			min-height: 500px;
			.detail-html{
				padding: 15px;
			}
			.detail-comment{
				margin-top: 30px;
				.comment-title{
					padding: 10px 15px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px #f5f5f5 solid;
				}
				.comment-content{
					padding: 0 15px;
					border-top: 1px #EEEEEE solid;
				}
			}
		}
			
		.detail-bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px #f5f5f5 solid;
			background-color: white;
			box-sizing: border-box;
			
			.detail-bottom_input{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px #ddd solid;
				border-radius: 5px;
				text{
					color: #999;
					font-size: 14px;
				}
			}
		
			.detail-bottom_icons{
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;
				.detail-bottom_icons—box{
					position: relative;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 44px;
				}
			}
		}
		
		.popup-wrap{
			background: white;
			.popup-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.opoup-header_item{
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}
			.popup-content{
				width: 100%;
				padding: 15px;
				box-sizing: border-box;
				.popup-textarea{
					width: 100%;
					height: 200px;
				}
				.popup-count{
					display: flex;
					justify-content: flex-end;
					font-size: 12px;
					color: #999;
				}
			}
		}
	}
</style>
