<template>
	<view>
		<uni-load-more status="loading" v-if="list.length===0"></uni-load-more>
		<list-scroll>
			<list-card v-for="item in list" :item="item"></list-card>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			getMyArticle(){
				this.$api.get_my_articles().then(res=>{
					console.log('article',res);
					const {data} = res
					this.list = data;
				})
			}
		},
		onLoad() {
			this.getMyArticle()
		}
	}
</script>

<style>

</style>
