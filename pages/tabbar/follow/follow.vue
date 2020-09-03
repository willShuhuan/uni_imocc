<template>
	<view class="follow">
		<!-- 导航切换 -->
		<view class="follow-tab">
			<view class="follow-tab__box">
				<view class="follow-tab__item" :class="{active:activeIndex===0}" @click="tab(0)">
					<!-- <list-card></list-card> -->
					关注
				</view>
				<view class="follow-tab__item" :class="{active:activeIndex===1}" @click="tab(1)">
					<!-- <list-card></list-card> -->
					作者
				</view>
			</view>
		</view>
		<view class="follow-list">
			<swiper class="follow-list__swiper" :current="activeIndex" @change="change">
				<swiper-item >
					<list-scroll>
						<uni-load-more status="loading" v-if="list.length===0&&!articleShow"></uni-load-more>
						<list-card types="follow" v-for="item in list" :item="item" :key="item._id"></list-card>
						<view class="nodata" v-if="articleShow">
							没有数据
						</view>
					</list-scroll>
				</swiper-item>
				<swiper-item >
					<list-scroll>
						<list-author v-for="item in authorList" :key="item.id" :item="item"></list-author>
					</list-scroll>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				activeIndex:0,
				list:[],
				authorList:[],
				articleShow:false
			}
			
		},
		methods:{
			tab(index){
				this.activeIndex=index;
			},
			getFollow(){
				this.$api.get_follow().then(res=>{
					console.log(res);
					const {data} = res;
					this.list = data;
					this.articleShow = this.list.length===0;
				})
			},
			getAuthor(){
				this.$api.get_author().then(res=>{
					console.log(res);
					const {data} = res;
					this.authorList = data;
				})
			},
			change(e){
				const {current} = e.detail;
				this.activeIndex = current;
			}
		},
		onLoad() {
			this.getFollow();
			this.getAuthor();
			//自定义事件$on只能在打开的页面触发
			uni.$on('update_article',(e)=>{
				this.getFollow();
			})
			uni.$on('update_author',()=>{
				this.getAuthor();
			})
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.follow{
		height: 100%;
		display: flex;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		.follow-tab{
			height: 30px;
			padding: 10px 20px;
			.follow-tab__box{
				display: flex;
				border-radius: 5px;
				border: 1px $uni-main-color solid;
				width: 100%;
				height: 100%;
				.follow-tab__item{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 14px;
					color: #666;
					&:first-child{
						border-right: 1px $uni-main-color solid;
					}
					&.active{
						color: $uni-main-color;
					}
				}
			}
		}
		.follow-list{
			flex: 1;
			.follow-list__swiper{
				height: 100%;
				.swiper-item{
					height: 100%;
				}
			}
		}
		.nodata{
			padding: 50px;
			font-size: 14px;
			color: #999;
			text-align: center;
		}
	}
</style>
