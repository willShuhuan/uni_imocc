<template>
	<view class="icons" @click.stop="likeTab">
		<uni-icons size="20" color="#f07373" :type="like?'heart-filled':'heart'" ></uni-icons>
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
			},
			types:{
				type:String,
				default:''
			}
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		created() {
			this.like = this.item.is_like
		},
		data() {
			return {
				like:false
			};
		},
		methods:{
			likeTab(){
				this.like = !this.like;
				this.updateLikes();
			},
			updateLikes(){
				uni.showLoading(); 
				this.$api.update_likes({
					user_id:'5f3d11c03d11c60001141e5f',
					article_id:this.item._id
				}).then(res=>{
					uni.hideLoading();
					console.log(res);
					uni.showToast({
						title:this.like?"收藏成功":"取消收藏",
						icon:'none'
					})
					uni.$emit('update_article',this.types)
				}).catch(()=>{
					uni.hideLoading();
				})
			}
		}
	}
</script>

<style lang="scss">
	.icons {
		position: absolute;
		right: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 20px;
		height: 20px;
	}
</style>
