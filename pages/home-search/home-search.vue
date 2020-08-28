<template>
	<view class = "home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clearHistory">清空</text>
				</view>
				<view v-if="historyList.length>0" class="label-content">
					<view v-for="item in historyList" @click="openHistory(item)" class="label-content_item">{{item.name}}</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<!-- 搜索结果 -->
			<list-scroll v-else class="list-scroll" >
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length>0">
					<list-card v-for="(item,index) in searchList" :key="item._id" :item="item" @click="setHistory" ></list-card>
				</view>
				<view v-if="searchList.length===0&&!loading" class="no-data">
					没有搜索到相关数据
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				loading:false,
				value:'',
				is_history:true,
				searchList:[],
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		methods: {
			setHistory(){
				console.log('setHistory',this.value);
				this.$store.dispatch('set_history',{
					name:this.value
				})
			},
			clearHistory(){
				this.$store.dispatch('clearHistory');
				uni.showToast({
					title:"清空完成",
					icon:"none"
				})
			},
			openHistory(item){
				this.value = item.name;
				this.getList(this.value);
				
			},
			change(value){
				//标记，每隔1s才去请求一次
				if(!value){
					clearTimeout(this.timer)
					this.mark = false
					this.getList(value)
					return
				}
				if(!this.mark){
					this.mark = true;
					this.timer = setTimeout(()=>{
						this.getList(value);
						this.mark = false;
					},1000)
					
				}
			},
			getList(value){
				if(!value){
					this.searchList=[]
					this.is_history = true
					return
				}
				this.is_history = false;
				this.loading = true;
				this.$api.get_search({
						value,
					}).then(res=>{
						console.log(res);
					const {data} = res;
					this.loading = false;
					this.searchList = data
				}).catch((res)=>{
					this.loading = false;
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1; 
		.home-list{
			.label-box{
				background-color: #fff;
				margin-bottom: 10px;
				.label-header{
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px #f5f5f5 solid;
					.label-title{
						color: $uni-main-color;
					}
					.label-clear{
						color:#30b33a;
						font-weight: blod;
					}
				}
				.label-content{
					display: flex;
					flex-wrap:wrap ;
					padding: 15px;
					padding-top: 0;
					.label-content_item{
						padding: 2px 10px;
						margin-right:10px ;
						margin-top: 12px;
						border-radius: 5px;
						border: 1px #666 solid;
						font-size: 14px;
						color: #666;
						
					}
				}
				
			}
		}
		.no-data{
			height: 200px;
			line-height: 200px;
			width: 100%;
			text-align: center;
			font-size: 12px;
			color: #666;
		}
	}

</style>
