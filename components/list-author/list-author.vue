<template>
	<view class="list-author">
		<view class="list-author__image">
			<image :src="item.avatar" mode="aspectFill"></image>
		</view>
		<view class="list-author__content">
			<view class="list-author__content_title">
				{{item.author_name}}
			</view>
			<view class="list-author__content_des">
				<view class="list-author__content_des-label">
					{{item.professional}}
				</view>
				<view class="list-author__content_des-info">
					<text>发帖{{item.article_ids.length}}</text>
					<text>粉丝{{item.fans_count}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.list-author{
		display: flex;
		padding: 10px 0;
		margin: 0 10px;
		border-radius: 5px;
		box-sizing: border-box;
		border-bottom: 1px #f5f5f5 solid;
		.list-author__image{
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.list-author__content{
			display:flex ;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			width: 100%;
			
			.list-author__content_title{
				position: relative;
				padding-right: 30px;
				font-size: 14px;
				color: #333;
				line-height: 1.2;
				font-weight: blod;
			}
			
		}
		.list-author__content_des{
			display:flex ;
			justify-content: space-between;
			font-size: 12px;
			.list-author__content_des-label{
				color: #666;
			}
			.list-author__content_des-info{
				color: #999;
				line-height: 1.5;
				text:first-child{
					margin-right: 10px;
				}
			}
		}
		
	}

</style>
