<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//请求接口 异步
			this.$api.get_user({
				user_id:'5f3d11c03d11c60001141e5f'
			}).then(res=>{
				console.log('res',res);
				const {data} = res
				this.$store.dispatch('set_user_info',data)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import 'components/gaoyia-parse/parse.css';
</style>
