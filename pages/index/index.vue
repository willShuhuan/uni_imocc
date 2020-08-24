<template>
	<!-- #ifndef MP-WEIXIN -->
	
	
	<view class="content">
		<!--1. v-if表达式返回真值，会正常渲染，否则不渲染 -->
		<!-- v-if v-else-if v-else -->
		<view class="title">1.v-if v-else-if v-else</view>
		<view v-if="show==='uni-app'">uni一app</view>
		<view v-else-if="show='vue'"> vue </view>
		<view v-else>html</view>
		<button type="default" @click="open">点击</button>
		
		<!-- 2. 数组赋值 -->
		<!-- item 被迭代数组元素的别名 -->
		<view class="title">2.数组渲染</view>
		<view v-for="(item,index) in arr">{{(index+1)+" "+item}}</view>
		
		<!-- 3. 基础组件的使用 -->
		<view class="title">3.基础组件</view>
		<!-- view 相当于div  text相当于span -->
		<view hover-class="active">view 相当于div  text相当于span</view>
		<scroll-view class="height" scroll-y="true" @scroll="scroll">
			<view v-for="item in 100">{{item}}</view>
		</scroll-view>
		<!-- v-model 双向绑定 -->
		<input type="text" v-model="inputValue"/>
		<button type="primary" @click="input">点击</button>
		<view>当前输入框的值是{{inputValue}}</view>
		
		<!-- 4 自定义组件 -->
		<view class="title">4.自定义组件</view>
		<btn color="blue" @change="change">按钮</btn>
	</view>
	<!-- #endif -->
</template>

<script>
	// #ifndef MP-WEIXIN
	import btn from "@/components/btn.vue"
	export default {
		components:{
			btn
		},
		// 初始化数据方法
		data() {
			return {
				show:'uni-app',
				arr:[
					'uni-app',
					'vue',
					'react'
				],
				inputValue:''
			}
		},
		onLoad() {

		},
		methods: {
			open(){
				this.show = "vue"
			},
			scroll(e){
				console.log(e.target)
			},
			input(){
				this.inputValue = "input"
			},
			change(e){
				console.log('页面事件，返回了'+e)
			}
		}
	}
	// #endif
</script>

<style lang="scss">
	// #ifndef MP-WEIXIN
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #FFFFFF;
		background: #007AFF;
		padding: 10rpx;
	}
	.active{
		color: red;
	}
	.height{
		height: 300rpx;
		text-align: center;
		border: #007AFF 1rpx solid;
	}
	// #endif
</style>
