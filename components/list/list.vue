<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change" >
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<listItem :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></listItem>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from "./list-item.vue"
	export default {
		components:{
			listItem
		},
		props:{
				tab:{
					type:Array,
					default(){
						return [];
					}
				},
				activeIndex:{
					type:Number,
					default:0
				}
		},
		data() {
			return {
				listCatchData:{},
				load:{},
				pageSize:10
			};
		},
		methods:{
			change(e){
				const {current} = e.detail;
				this.$emit('change',current)
				console.log(this.tab[current].name);
				// 当数据不存在或者长度是0的情况下，才去请求数据
				if(!this.listCatchData[current]||this.listCatchData.lenth===0){
					this.getList(current);
				}
			},
			getList(current){
				if(!this.load[current]){
					this.load[current]={
						page:1,
						loading:"loading"
					}
				}
				this.$api.get_list({
						name:this.tab[current].name,
						page:this.load[current].page,
						pageSize:this.pageSize
					}).then(res=>{
					const {data} = res;
					if(data.length===0){
						let oldLoad = {};
						oldLoad.loading ='noMore';
						oldLoad.page = this.load[current].page;
						this.$set(this.load,current,oldLoad); 
						//强制渲染页面
						this.$forceUpdate();
						return
					}
					
					console.log(data);
					let oldList = this.listCatchData[current]||[];
					oldList.push(...data);
					//懒加载数据
					this.$set(this.listCatchData,current,oldList)
				})
			},
			// 上拉加载更多
			loadmore(){
				if(this.load[this.activeIndex].loading==='noMore') return;
				this.load[this.activeIndex].page++; 
				this.getList(this.activeIndex);
			}
		},
		watch:{
			tab(newVal){
				if(newVal.length===0){
					return;
				}
				this.listCatchData = {};
				this.load = {};
				this.getList(this.activeIndex);
			}
		}
		,
		created() {
			uni.$on('update_article',(e)=>{
				if(e==='follow'){
					this.listCatchData = {};
					this.load = {};
					this.getList(this.activeIndex);
				}
				
			})
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 100%;
		.swiper-item{
			height: 100%;
			overflow: hidden;
			
		}
	}
</style>
