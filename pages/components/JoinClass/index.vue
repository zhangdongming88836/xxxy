<template>
	<view class="">
		<view class="join">
			<label class="bull-left">加入班级</label>
			<input :value="inputData" @input="val" class="uni-input" maxlength="5" placeholder="5位字母的班级码" />
			<view class="join-rg">
				<view class="bull-right">
					<view class="">
						<text>{{text}}/5</text>
					</view>

				</view>
			</view>
		</view>
		<view class="pull-bottom">
			<view class="">
				<button type="primary" @click="addCla">加入</button>
			</view>
		</view>
	</view>
</template>

<script>
	import http from "../../../utils/request.js"
	export default {
		data() {
			return {
				inputData: "",
				text: "0",
			}
		},
		methods: {
			val(e) {
				this.inputData = e.detail.value;
				this.text = this.inputData.length;

			},
			//加入班级
			addCla() {
				this.$http.post("/web/api/user/update",{
					code:this.inputData
				},{header: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"}}).then( res =>{
					console.log(res)
					if(res.data.code == 200){
						uni.navigateBack({
						    delta: 2
						});
					}else{
						uni.showToast({
							title:`${res.data.msg}`,
							icon:"none",
							duration: 1000
						})
					}
				})
			}

				// uni.request({
				// 	url: 'http://172.16.0.26:8087/web/api/user/update', //仅为示例，并非真实接口地址。
				// 	method: "POST",
				// 	data:{
				// 		code:this.inputData,
				// 		userId:"8"
				// 	},
				// 	header: {
				// 		// 'userId': '1' //自定义请求头信息
				// 		"Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
				// 	},
				// 	success: (res) => {

				// 	}
				// });
			
		},
	}
</script>

<style>
	.join {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		padding-top: 30rpx;
	}

	.bull-left {
		margin-left: 30rpx;
		margin-bottom: 15rpx;
		color: #8F8F94;
	}

	.uni-input {
		height: 90rpx;
		padding-left: 30rpx;
		border: 1rpx solid #8F8F94;
	}

	.join-rg {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.bull-right {
		padding-right: 30rpx;
		margin-top: 10rpx;
	}

	.pull-bottom {
		width: 100%;
		position: fixed;
		bottom: 0rpx;
	}
</style>
