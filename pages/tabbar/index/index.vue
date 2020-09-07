<template>
	
	<view class="home">
		<navbar></navbar>
		<tab :list = "tableList" @tab="tab" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list :tab="tableList" :activeIndex="activeIndex" @change="change"></list>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default{
		components:{
		},
		data(){
			return{
				tableList:[],
				tabIndex :0,
				activeIndex :0
			}
		},
		methods:{
			tab({data,index}){
				this.activeIndex = index;
			},
			getLable(){
				this.$api.get_label().then(res=>{
					console.log(res);
					const {data} = res;
					data.unshift({
						name:"全部"
					});
					this.tableList = data;
				})
				
			},
			change(current){
				this.tabIndex = current;
				this.activeIndex = current;
			}
			
		},
		computed:{
			...mapState(['userinfo'])
		},
		watch:{
			userinfo(newVal){
				this.getLable()
			}
		},
		onLoad() {
			uni.$on('labelChange',(res)=>{
				this.tableList = [];
				this.tabIndex = 0;
				this.activeIndex = 0;
				this.getLable()
			})
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		.home-list{
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
