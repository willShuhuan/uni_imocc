<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{isEdit?'完成':'编辑'}}</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content_item" v-for="(item,index) in labelList">
					{{item.name}}
					<uni-icons v-if="isEdit" class="icons_close" type="clear" size="20" color="red" @click="del(index)"></uni-icons>
				</view>
				<view v-if="labelList.length===0  && !loading" class="no-data">
					当前没有数据
				</view>
			</view>

		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
			<view v-if="!loading" class="label-content">
				<view class="label-content_item" @click="add(index)" v-for="(item,index) in list">{{item.name}}</view>
			</view>
			<view v-if="list.length===0 && !loading" class="no-data">
				当前没有数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: false,
				labelList: [],
				list: [], //标签推荐数据
				loading: true
			}
		},
		methods: {
			editLabel() {
				if (this.isEdit) {
					this.isEdit = false;
					this.setUpdateLable(this.labelList)
				} else {
					this.isEdit = true;
				}
			},
			setUpdateLable(label) {
				let newArrIds = [];
				label.forEach(item => {
					newArrIds.push(item._id)
				});
				uni.showLoading();
				this.$api.update_label({
					label: newArrIds
				}).then(res => {
					uni.hideLoading();
					uni.showToast({
						title: "更新成功",
						icon: 'none'
					})
					uni.$emit('labelChange');
					console.log(res);
				})
			},
			getLabel() {
				this.loading = true;
				this.$api.get_label({
					type: 'all'
				}).then(res => {
					this.loading = false;
					console.log(res);
					const {
						data
					} = res;
					this.labelList = data.filter(item => item.current);
					this.list = data.filter(item => !item.current)
				})
			},
			del(index) {
				this.list.push(this.labelList[index])
				this.labelList.splice(index, 1);
			},
			add(index) {
				if (!this.isEdit) {
					return
				}
				this.labelList.push(this.list[index]);
				this.list.splice(index, 1);
			},
			
		},
		onLoad() {
			//自定义事件
			//this.$emit uni.$emit
			//自定义事件只能在打开的页面触发
			this.getLabel()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;

	}

	.label {
		.label-box {
			background-color: white;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-edit {
					color: #30b33a;
					font-weight: blod;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content_item {
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					position: relative;

					.icons_close {
						position: absolute;
						right: -8px;
						top: -8px;
						background-color: #FFF;
						border-radius: 50%;
					}
				}
			}
		}
		.no-data{
			width: 100%;
			text-align: center;
			padding: 50px 0;
			color: #999;
			font-size: 14px;
		}
		
	}
</style>
