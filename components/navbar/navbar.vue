<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏 -->
			<!-- 阿里小程序适配不显示状态栏 -->
			<!-- #ifndef MP-ALIPAY -->
			<view :style="{height: statusBarHeight+'px'}"></view>
			<!-- #endif -->
			<!-- 导航栏 -->
			<view class="navbar-content" :class="{search:isSearch}" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-content_search_icons" v-if="isSearch" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view class="navbar-search" v-if="!isSearch" @click="open">
					<!-- 非搜索页展示 -->
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search" size="16" color="#999999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app vue</view>
				</view>
				<view class="navbar-search" v-else  >
					<!-- 搜索页显示 -->
					<input type="text" class="navbar-search_text" v-model="value" placeholder="请输入您要搜索的内容" @input="inputChange"></input>
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{
				type:[String,Number],
				default:''
			},
			isSearch:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth:375,
				val:''
			};
		},
		watch:{
			value(newVal){
				console.log('newVal',newVal);
				this.value = newVal
			}
		},
		created() {
			//获取系统信息
			const info = uni.getSystemInfoSync();
			console.log(info);
			//设置状态栏高度
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			
			// #ifndef APP-PLUS||H5
			//获取小程序胶囊的位置
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			console.log(menuButtonInfo);
			// （胶囊底部高度一状态栏的高度） + （胶囊顶部高度一状态栏内的高度）=导航栏的高度
			this.navBarHeight = menuButtonInfo.bottom-info.statusBarHeight+menuButtonInfo.top-info.statusBarHeight;
			console.log(this.navBarHeight);
			this.windowWidth = menuButtonInfo.left;
			// #endif
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0	
			// #endif
		},
		methods:{
			open(){
				uni.navigateTo({
					url:"/pages/home-search/home-search",
				})
			},
			inputChange(e){
				console.log(e);
				const {
					value
				} = e.detail
				console.log(value);
				this.$emit('input',value)
			},
			back(){
				//navBack在刷新页面时无法返回 因为页面栈只有一个元素
				// uni.navigateBack();
				uni.switchTab({
					url:"../../pages/tabbar/index/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "../../common/css/icons.css";
	.navbar {
		.navbar-fixed {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			width: 100%;
			background-color: $uni-main-color;
			.navbar-content{
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;
				.navbar-search {
					display: flex;
					align-items: center;
					width: 100%;
					height: 30px;
					background: #FFF;
					border-radius: 30px;
					padding: 0 10px;
				
					.navbar-search_icon {
						margin-right: 10px;
					}
					.navbar-search_text {
						width: 100%;
						font-size: 14px;
						color: #999;
					}
				}
				&.search{
					padding-left: 0;
					.navbar-content_search_icons{
						margin-left: 10px;
						margin-right: 10px;
					}
					.navbar-search {
						border-radius: 5px;
					}
				}
			}
			
		}
	}
</style>
