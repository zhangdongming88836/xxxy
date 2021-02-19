<template>
	<u-modal v-model="show" :show-cancel-button="true" confirm-text="升级"
		title="发现新版本" @cancel="cancel" @confirm="confirm"
	>
		<view class="u-update-content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</u-modal>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				// 传递给uni-app"rich-text"组件的内容，可以使用"<br>"进行换行
				content: `
					1. 修复badge组件的size参数无效问题<br>
					2. 新增Modal模态框组件<br>
					3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
					4. 修复键盘组件在微信小程序上遮罩无效的问题
				`,
				code:"",
				resourceId:"",
			}
		},
		onReady() {
			this.show = true;
		},
		methods: {
			cancel() {
				console.log(1)
				this.closeModal();
			},
			confirm() {
				//console.log(2)
				if(this.code == 201){
					console.log(2222222222)
					this.closeModal();
				}else if(this.code == 200){
					console.log(1111111111111)
				    this.doUpData();
				}
			},
			closeModal() {
				console.log(33333)
				uni.navigateBack();
			},
			doUpData() {
			    uni.showLoading({
			        title: '更新中……'
			    })
			    uni.downloadFile({//执行下载
			        url: `http://14.116.217.62:8087/web/api/version/download/${this.resourceId}`, //下载地址
			        success: downloadResult => {//下载成功
			            uni.hideLoading();
			            if (downloadResult.statusCode == 200) {
			                uni.showModal({
			                    title: '',
			                    content: '更新成功，确定现在重启吗？',
			                    confirmText: '重启',
			                    confirmColor: '#EE8F57',
			                    success: function(res) {
			                        if (res.confirm == true) {
			                            plus.runtime.install(//安装
			                                downloadResult.tempFilePath, {
			                                    force: true
			                                },
			                                function(res) {
			                                    utils.showToast('更新成功，重启中');
			                                    plus.runtime.restart();
			                                }
			                            );
			                        }
			                    }
			                });
			            }
			        }
			    });
			}
		},
		onShow:function(){
			this.$http.get( `/web/api/version/check/${getApp().globalData.type}/${getApp().globalData.version}`).then( res =>{
				console.log(res)
				this.code = res.data.code;
				this.content = res.data.msg;
				this.resourceId = res.data.data.resourceId;			
			})
		}
	}
</script>

<style scoped lang="scss">
	.u-full-content {
		background-color: #00C777;
	}
	
	.u-update-content {
		font-size: 26rpx;
		color: $u-content-color;
		line-height: 1.7;
		padding: 30rpx;
	}
</style>
