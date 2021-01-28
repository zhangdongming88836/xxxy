<template>
	<view class="">
		<view class="myhear">
			<view>
				<text>{{title}}</text>
			</view>
		</view>
		<view class="join">
			<!-- <input  v-model="email" class="uni-input"  placeholder="请输入新邮箱" /> -->
			<u-form :model="form" ref="uForm">
				<u-form-item prop="email" class="uni-input">
					<u-input v-model="form.email" focus />
				</u-form-item>
			</u-form>
		</view>
		<view class="pull-bottom">
			<view class="">
				<button type="primary" @click="EditEml">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				form: {
					email: ""
				},
				rules: {
					email: [{
							required: true,
							message: '请输入邮箱',
							trigger: ['change', 'blur'],
						},
						// 正则判断为字母或数字
						{
							required: true,
							pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g,
							// 正则检验前先将值转为字符串
							transform(value) {
								return String(value);
							},
							message: '邮箱格式错误',
							trigger: ['change', 'blur'],
						},
					],
				}
			}
		},
		methods: {
			EditEml() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						// console.log('验证通过');
						this.$http.post("/web/api/user/updatePerson", {
							email: this.form.email
						}).then(response => {
							// console.log(response);
							if (response.data.code == 200) {
								this.form.username = ""
								uni.navigateBack({
									delta: 1
								});
							} else {
								uni.showToast({
									title: `${response.data.msg}`,
									icon: "none",
									duration: 2000
								});
							}
						})




					} else {
						console.log('验证失败');
					}
				});

			}
		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad: function() {
			this.$http.get("/web/api/user/personage").then(res => {
				// console.log(res.data.data)
				this.form.email = res.data.data.email;
			})
			this.$http.get("/web/api/info/info").then( res => {
				console.log(res);
				this.title = res.data.data.name;
			});
		}
	}
</script>

<style>
	.join {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-top: 100rpx;
		padding-top: 30rpx;
	}

	.bull-left {
		margin-left: 30rpx;
		margin-bottom: 15rpx;
		color: #8F8F94;
	}

	.uni-input {
		width: 100%;
		padding:20rpx;
		/* border: 1rpx solid #8F8F94; */
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

	.myhear {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: 1;
		background-color: #EEFFBB;
		top: 0rpx;
	}
</style>
