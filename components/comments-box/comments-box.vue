<template>
	<view class="comments-box">
		<view class="comments-header">
			<view class="comments-header_logo">
				<image :src="comments.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comments-header_info">
				<view class="title" v-if="!comments.is_reply">
					{{comments.author.author_name}}
				</view>
				<view class="title" v-else>
					{{comments.author.author_name}} 
					<text class="reply-text">回复</text>
					{{comments.to}}
				</view>
				<view class="time">
					{{comments.create_time}}
				</view>
			</view>
		</view>
		<view class="comments-content">
			<view class="">
				{{comments.comment_content}}
			</view>
			<view class="comments-info">
				<view class="comments-button" @click="commentsReply({comments,is_reply:reply})">
					回复
				</view>
			</view>
			<view class="comments-reply" v-for="(item,index) in comments.replys" :key="item.id">
				<comments-box :comments="item" :reply="true" @reply="commentsReply"></comments-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentsBox from "@/components/comments-box/comments-box.vue"
	export default {
		name:"comments-box",//调用递归组件要声明name
		components:{
			commentsBox
		},
		props:{
			comments:{
				type:Object,
				default(){
					return {}
				}
			},
			reply:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			commentsReply(comment){
				// console.log(comment);
				//为了区分是主回复还是子回复
				if(comment.is_reply){
					comment.comments.reply_id = comment.comments.comment_id;
					comment.comments.comment_id = this.comments.comment_id;
				}
				this.$emit('reply',comment)
			}	
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.comments-box{
		margin: 15px 0;
		.comments-header{
			display: flex;
			.comments-header_logo{
				flex-shrink: 0;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.comments-header_info{
				display: flex;
				flex-direction: column;
				padding-left: 15px;
				font-size: 12px;
				color: #999;
				line-height: 1;
				.title{
					margin-bottom: 10px;
					font-size: 14px;
					color: #333;
					.reply-text{
						margin: 0 10px;
						font-weight: blod;
						color: #000;
					}
				}
			}
		}
		.comments-content{
			margin-top: 10px;
			font-size: 14px;
			color: black;
			.comments-info{
				margin-top: 15px;
				display: flex;
				.comments-button{
					padding: 2px 10px;
					font-size: 12px;
					color: #999;
					border-radius: 20px;
					border: 1px #ccc solid;
				}
				
			}
			.comments-reply{
					display: flex;
					margin: 15px 0;
					padding: 0 10px;
					border: 1px #eeeeee solid;
				}
		}
	}
</style>
