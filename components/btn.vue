<template>
	<view class="btn" :style="{color:color}" @click="onClick">自定义按钮</view>
</template>

<script>
	export default{
		props:{
			color:{
				type:String,
				default:'#000'
			}
		},
		data(){
			return{
				
			}
		},
		methods:{
			onClick(){
				console.log("自定义组件被点击了");
				this.$emit('change',this.color)
			}
		}
	}
</script>

<style>
	.btn{
		width: 200rpx;
		height: 100rpx;
		line-height: 100rpx;
		border: #007AFF 1rpx solid;
	}
</style>
