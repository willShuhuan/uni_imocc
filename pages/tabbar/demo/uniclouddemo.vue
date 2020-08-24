<template>
	
	<view class="content box">Hello！
		<image mode="aspectFit" :src="src"></image>
		<button @click="open">点击调用云函数</button>
		<button @click="upload">选择图片进行云存储</button>
		<button @click="deleteFile">删除云存储的图片</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				src:''
			}
		},
		onLoad() {
			
		},
		methods:{
			open(){
				uniCloud.callFunction({
					name:"get_list",
					data:{
						name:'html',
					},
					success(res) {
						console.log("云函数调用成功",res)
					},
					fail() {
						
					}
				})
			},
			upload(){
				let self = this;
				uni.chooseImage({
					count:1,
					success(res) {
						const tempfilePath = res.tempFilePaths[0];
						console.log(tempfilePath);
						uniCloud.uploadFile({
							filePath:tempfilePath,
							cloudPath:"abc.png",
							success(res) {
								console.log(res);
								self.src = res.fileID;
							},
							fail(res) {
								console.log(res);
							}
						})
					},
					fail(res) {
						console.log(res);
					}
				})
				
			},
			deleteFile(){
				let self = this;
				uniCloud.deleteFile({
					fileList:[self.src],
					success(res) {
						console.log(res);
						self.src = '';
					},
					fail(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		font-size: 32rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		// &. 父级 表示跟content同级别元素
		&.box{
			border: 1px red solid;
		}
	}
</style>
