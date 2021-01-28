<template>
	<view class="">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{},
		onLoad:function(val){
			console.log(val)
			this.$http.get("/web/api/duty/code/"+val.result).then(res => {
				console.log(res)
				uni.showToast({
				    title:`${res.data.msg}`,
				    duration: 4000
				});
			})
		}
	}
</script>

<style>
</style>
