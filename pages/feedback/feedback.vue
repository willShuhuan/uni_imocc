<template>
	<view>
		<view class="feedback_title">
			意见反馈：
		</view>
		<view class="feedback_content">
			<textarea class="feedback_text" v-model="content" placeholder="请输入您要反馈的内容" />
		</view>
		<view class="feedback_title">
			反馈图片
		</view>
		<view class="feedback_image_box">
			<view class="feedback_image_item" v-for="(item,index) in imageList" :key="index">
				<view class="image_box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
				<view class="close_icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="feedback_image_item" @click="addImage" v-if="imageList.length<5">
				<view class="image_box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback_button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				content:''
			}
		},
		methods: {
			del(index){
				this.imageList.splice(index,1)
			},
			addImage(){
				const count = 5-this.imageList.length;
				const self = this;
				uni.chooseImage({
					count:5,
					success(res) {
						const tempfilePaths = res.tempFilePaths
						tempfilePaths.forEach((item,index)=>{
							//处理H5多选的状况
							if(index<count){
								self.imageList.push({
									url:item
								})
							}
						})
						console.log(res);
					}
				})
			},
			async submit(){
				let imagesPath = []
				uni.showLoading()
				//上传图片的api只能每次上传一张
				for (let i = 0; i < this.imageList.length; i++) {
					const filePath = this.imageList[i].url;
					filePath = await this.uploadFiles(filePath);
					imagesPath.push(filePath);
				}
				console.log('imagesPath',imagesPath);
				this.updateFeedback({
					content:this.content,
					feedbackImages:imagesPath
				})
			},
			async uploadFiles(filePath){
				let timestamp = new Date().getTime();
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath:timestamp+".png",
				})
				return result.fileID;
			},
			updateFeedback({content,feedbackImages}){
				this.$api.update_feedback({content,feedbackImages}).then(res=>{
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功'
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/tabbar/my/my'
						})
					},2000)
					
				}).catch(()=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交失败',
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.feedback_title{
		margin: 15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}
	.feedback_content{
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px #eee solid;
		.feedback_text{
			font-size: 12px;
			width: 100%;
			height: 100px;
		}
	}
	.feedback_image_box{
		display: flex;
		flex-wrap: wrap;
		padding: 10px;
		
		.feedback_image_item{
			position: relative;
			height: 0;
			width: 33.33%;
			padding-top: 33.33%;
			box-sizing: border-box;
			.close_icon{
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				top: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
			}
			.image_box{
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 6px;
				bottom: 6px;
				left: 6px;
				right: 6px;
				border: 1px #eee solid;
				border-radius: 5px;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.feedback_button{
		background-color: $uni-main-color;
		margin: 20px;
		font-size: 16px;
	}
</style>
