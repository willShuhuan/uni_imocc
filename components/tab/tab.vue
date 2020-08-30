<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll_box">
				<view v-for="(item,index) in list" class="tab-scroll_item" 
				:class="{active:activeIndex===index}"
				@click="clickTab(item,index)">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="open">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default:[]
			},
			tabIndex:{
				type:Number,
				default:0
			}
		},
		methods:{
			clickTab(item,index){
				this.activeIndex = index;
				this.$emit('tab',{
						data:item,
						index:index
					});
			},
			open(){
				uni.navigateTo({
					url:"/pages/home-label/home-label"
				})
			}
		},
		//可以监听data props 中值的变化
		watch:{
			tabIndex(newVal){
				this.activeIndex = newVal;
			}
		},
		data() {
			return {
				activeIndex:0
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		display: flex;
		width: 100%;
		box-sizing: border-box;
		background-color: white;
		border-bottom: 1px #f5f5f5 solid;
		
		.tab-scroll{
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			.tab-scroll_box{
				display: flex;
				height: 45px;
				align-items: center;
				flex-wrap: nowrap;
				box-sizing: border-box;
				
				.tab-scroll_item{
					flex-shrink: 0;
					padding: 0 10px;
					color: #333;
					font-size: 14px;
					&.active{
						color: $uni-main-color;
					}
					
				}
			}
			
		}
		
		.tab-icons{
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width:45px;
			&::after{
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #dddddd;
			}
		}
		
	}
</style>
