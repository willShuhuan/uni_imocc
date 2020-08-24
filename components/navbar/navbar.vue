<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view :style="{height: statusBarHeight+'px'}"></view>
			<view class="navbar-content" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-search">
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search" size="16" color="#999999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app vue</view>
				</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight:20,
				navBarHeight:45,
				windowWidth:375,
			};
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
						font-size: 12px;
						color: #999;
					}
				}
			}
			
		}
	}
</style>
