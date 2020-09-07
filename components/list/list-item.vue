<template>
	<list-scroll class="list-scroll"  @loadmore="loadmore">
		<list-card v-for="(item,index) in list" :key="item._id" :item="item" ></list-card>
		<uni-load-more :status="load.loading||'loading'" v-if="list.length===0||list.length>9" iconType="snow" ></uni-load-more>
	</list-scroll>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return [];
				}
			},
			load:{
				type:Object,
				default(){
					return {
						loading:'loading'
					}
				}
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			} 
		},
	}
</script>

<style lang="scss">
	.list-scroll{
		height: 100%;
	}
</style>
