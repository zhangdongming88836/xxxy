<template>
	<view class="login">
		<image class="img" src="../../static/fg1.jpg" mode=""></image>
		<view class="loginBox">

			<view class="username">
				<view class="use-t">登录名</view>
				<input class="use-i" type="text" :value="username" @input="valu" placeholder="请输入用户名" />
			</view>

			<view class="password">
				<text class="pas-t">密码</text>
				<input type="text" class="pas-i" :value="password" @input="valp" password placeholder="请输入密码" />
			</view>
			<view class="code">
				<text class="code-t">验证码</text>
				<input type="text" class="code-i" :value="code" @input="valec" placeholder="请输入验证码" />
				<image class="c-img" :src="imgCode" mode="" @click="Code"></image>
			</view>
			<button class="btn" @click="login" type="default">
				登录
			</button>
			<text class="txt">注册和重置密码请联系老师</text>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
				code: "",
				imgCode: "",
				uuid: ""
			};
		},

		methods: {
			//用户名
			valu(e) {
				this.username = e.detail.value;
			},
			//密码
			valp(e) {
				this.password = e.detail.value;
			},
			//验证码
			valec(e) {
				this.code = e.detail.value;
			},
			// uuid 生成
			guid() {
				function S4() {
					return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
				}
				return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
			},
			login() {
				console.log(this.username);
				console.log(this.password);
				console.log(this.code);
				console.log(this.uuid);
				this.$http.post("/web/api/login", {
					loginName: this.username,
					password: this.password,
					uuid: this.uuid,
					yzm: this.code
				}, {
					header: {
						"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
					}
				}).then(response => {
					console.log(response.data)

					if (response.data.code == 200) {

						uni.switchTab({
							url: "/pages/index/index",
							success: () => {
								uni.setStorage({
									key: 'token',
									data: response.data.data.token,
								})
							}
						});

					} else {
						// console.log('1111')
						uni.showToast({
							title: response.data.msg,
							icon: "none",
							duration: 2000
						});
					}
				})
			},
			//获取验证码
			Code() {
				// const uuid =  Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
				let uuid = this.guid()
				this.uuid = uuid
				var num = Math.ceil(Math.random() * 10); //生成一个随机数（防止缓存）
				this.imgCode = "http://192.168.10.238:8087/web/check/" + this.uuid + "?" + num;
			},
		},
		onLoad() {
			// const uuid =  Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);

			// this.uuid = uuid
			// this.imgCode = "http://10.178.205.245:8087/web/check/" + this.uuid ;
			this.Code()
		}

	}
</script>

<style lang="scss">
	.login {

		width: 100%;

		.img {
			width: 100%;
			height: 500rpx;
		}

		.loginBox {
			height: 400rpx;
			background-color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			margin-top: 100rpx;

			.username {
				width: 75%;
				display: flex;
				align-items: center;

				.use-t {
					color: #999;
					width: 90rpx;
				}

				.use-i {
					border: 1px solid #ccc;
					height: 60rpx;
					margin-left: 16rpx;
					flex: 1;
				}
			}

			.password {
				display: flex;
				align-items: center;
				width: 75%;
                
				.pas-t {
					width: 90rpx;
					text-align: right;
					color: #999;
				}

				.pas-i {
					border: 1px solid #ccc;
					height: 60rpx;
					margin-left: 16rpx;
					flex: 1;
				}
			}

			.code {
				display: flex;
				align-items: center;
				width: 75%;

				.code-t {
					width: 90rpx;
					text-align: right;
					color: #999;
				}

				.code-i {
					border: 1px solid #ccc;
					height: 60rpx;
					margin-left: 16rpx;
					flex: 1;
				}

				.c-img {
					flex: 1;
					width: 60rpx;
					height: 60rpx;
					background: #18B566;
				}
			}

			.btn {
				width: 75%;
				font-weight: 600;

			}

			.txt {
				font-size: 12rpx;
			}
		}

	}
</style>
