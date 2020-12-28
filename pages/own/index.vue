<template>
	<view class="myPage">
		<view class="myhear">
			<view>
				<text>对分易教学平台</text>
			</view>
		</view>
		<view class="user" @click="PersonalInformation">
			<view class="user-left">
				<view>
					<image class="userImge" :src="'http://192.168.10.238:8087/web/'+personal.avatar"></image>
				</view>
				<view class="user-lef">
					<view class="user-lef-to">
						<text class="fonts">{{personal.userName}}</text>
						<text class="font">学生</text>
					</view>
					<view class="">
						<text style="font-size: 25rpx;">{{personal.loginName}}</text>
					</view>
					<!-- <view class="user-lef-bo">
						<text style="font-size: 25rpx;">哈尔滨工程大学</text>
					</view> -->
				</view>
			</view>
			<view class="modify">
				<text>修改个人信息></text>
			</view>
		</view>
		<!-- 整体 -->
		<view class="contents">
			<!-- 三 -->
		<!-- 	<view class="identity">
				<view class="identity-le">
					<view class="">
						<image class="identity-img" src="../../static/MyPage/sx.png" mode=""></image>
					</view>
					<view class="identity-zo">
						<text style="text-align: center;">双重身份</text>
					</view>
					<view class="identity-zog">
						拥有学生和老师双重身份
					</view>
				</view>
				<view class="pull-top">
					<button type="primary" size="mini">立即申请</button>
				</view>
			</view> -->
			<!--  三 -->
			<!-- 四 -->
			<!-- 	<view class="member">
					<view class="member-el">
						<view class="">
						   <image class="identity-imgs" src="../../static/MyPage/hy.png" mode=""></image>
						</view>
						<view class="">
							<text class="font-wi">会员中心</text>
						</view>
					</view>
					<view class="">
						<text style="font-size: 25rpx;">过期0天></text>
					</view>
				</view> -->
			<!-- 四 -->
			<!-- 五 -->
			<!--    <view class="members">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/xx.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">系统消息</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size:25rpx;">></text>
			    	</view>
			    </view> -->
			<!-- 五 -->
			<!-- 六 -->
			<!--    <view class="members">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/sj.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">我的调查问卷</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size:25rpx;">></text>
			    	</view>
			    </view> -->
			<!-- 六 -->
			<!-- 七 -->
			<!--   <view class="members">
			   	<view class="member-el">
			   		<view class="">
			   		   <image class="identity-imgs" src="../../static/MyPage/hy.png" mode=""></image>
			   		</view>
			   		<view class="">
			   			<text class="font-wi">系统公告</text>
			   		</view>
			   	</view>
			   	<view class="">
			   		<text style="font-size:25rpx;">></text>
			   	</view>
			   </view> -->
			<!-- 七 -->
			<!-- 八 -->
			 <!--   <view class="member">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/kf.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">在线客服</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size: 25rpx;">></text>
			    	</view>
			    </view> -->
			<!-- 八 -->
			<!--    <view class="members">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/sc.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">操作手册</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size:25rpx;">></text>
			    	</view>
			    </view> -->
			<!-- 九 -->
			<!-- <view class="members">
				<view class="member-el">
					<view class="">
					   <image class="identity-imgs" src="../../static/MyPage/wt.png" mode=""></image>
					</view>
					<view class="">
						<text class="font-wi">常见问题</text>
					</view>
				</view>
				<view class="">
					<text style="font-size:25rpx;">></text>
				</view>
			</view> -->
			<!-- 九 -->
			<!-- 10 -->
			<!--    <view class="member">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/cd.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">海词词典</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size: 25rpx;">></text>
			    	</view>
			    </view> -->
			<!-- 11 -->
			<!--    <view class="members">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/dn.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">如何在电脑上使用对分易</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size:25rpx;">></text>
			    	</view>
			    </view> -->
			<!-- 12 -->
		<!-- 	<view class="members">
				<view class="member-el">
					<view class="">
					   <image class="identity-imgs" src="../../static/MyPage/gy.png" mode=""></image>
					</view>
					<view class="">
						<text class="font-wi">关于</text>
					</view>
				</view>
				<view class="">
					<text style="font-size:25rpx;">></text>
				</view>
			</view> -->
			<!-- 13 -->
			<view class="member" @click="signOut">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/tc.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">退出登录</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size: 25rpx;">></text>
			    	</view>
			    </view>
			<!-- 14 -->
			 <!--   <view class="members" @click="cancellation">
			    	<view class="member-el">
			    		<view class="">
			    		   <image class="identity-imgs" src="../../static/MyPage/zc.png" mode=""></image>
			    		</view>
			    		<view class="">
			    			<text class="font-wi">注销账号</text>
			    		</view>
			    	</view>
			    	<view class="">
			    		<text style="font-size:25rpx;">></text>
			    	</view>
			    </view> -->
		</view>
		<!-- 整体end -->
	</view>
</template>

<script>
	export default {
		data(){
			return {
				//个人信息
			 personal:{},	
			}
		},
		methods:{
		 //跳转个人信息页面 
		  PersonalInformation(){
			  uni.navigateTo({
			      url: '../components/personalInformation/index'
			  });
		  },	 
		   cancellation(){
			  uni.navigateTo({
			      url: '../components/cancellation/index'
			  });
		  },
		  ////////////////////////////退出
		  signOut(){
			  uni.showModal({
			      title: '警告',
			      content: '确定推出码？',
			      success:(res) => {
			          if (res.confirm) {
			              console.log('用户点击确定');
						  this.$http.get("/web/api/logout").then( res => {
							  console.log(res)
							  if( res.data.code == 200){
								  uni.reLaunch({
								      url: '/pages/login/index'
								  });
							  }else{
								uni.showToast({
								    title: `${res.data.msg}`,
								    duration: 2000
								});  
							  }
						  })
			          } else if (res.cancel) {
			              console.log('用户点击取消');
			          }
			      }
			  });
		  }
		},
		onLoad:function(){
			this.$http.get("/web/api/user/personage").then( res => {
				// console.log(res.data.data)
				this.personal = res.data.data;
			})
		},
		onShow:function(){
			this.$http.get("/web/api/user/personage").then( res => {
				// console.log(res.data.data)
				this.personal = res.data.data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.myPage {
		display: flex;
		flex-direction: column;
		background-color: #C8C7CC;
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
		top:0rpx;
	}

	/*********************二层*****************************************************/
	.user {
		display: flex;
		margin-top: 80rpx;
		padding: 30rpx;
		flex-direction: row;
		justify-content: space-between;
		background-color:#FFFFFF;
	}

	.user-left {
		display: flex;
		flex-direction: row;
		padding-top:5rpx;
		padding-bottom:10rpx;
	}
	.userImge {
		width: 100rpx;
		height: 100rpx;
	}

	.user-lef {
		display: flex;
		padding-left: 20rpx;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		font-size: 15rpx;
	}
    .user-lef-bo{
		margin-bottom:15rpx;
	}
	.fonts {
		font-size: 25rpx;
	}

	.font {
		border-radius: 10rpx;
		background-color: #007AFF;
		text-align: center;
		font-size:15rpx;
		color: #F1F1F1;
		padding: 5rpx;
		margin-left: 15rpx;
	}

	.modify {
		display: flex;
		align-items: center;
		font-size: 30rpx;
	}

	/*********************整体**********************************************/
	.contents {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	/*******************三层*****************************************/
	.identity {
		height:40rpx;
		padding: 30rpx;
		display: flex;
		border-top: 1rpx solid #999999;
		border-bottom: 1rpx solid #999999;
		flex-direction: row;
		align-items: center;
		justify-content:space-between;
		background-color: #FFFFFF;
	}

	.identity-le {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content:center;
	}
    .identity-img{
		width:50rpx;
		height:50rpx;
	    padding-top:12rpx;
	}
	.identity-zo{
		padding-left:20rpx;
		font-size:35rpx;
		font-weight: 600;
		display: flex;
		align-items: center;
	}
	.identity-zog{
		display: flex;
		align-items: center;
		padding-left:5rpx;
		font-size: 20rpx;
	}
	.pull-top{
		padding-top:10rpx;
	}
	/********************会员******************************************/
    .member{
		display: flex;
		height:40rpx;
		padding:40rpx 30rpx 40rpx 30rpx;
		margin-top:20rpx;
		background-color: #FFFFFF;
		align-items: center;
		flex-direction:row;
		justify-content: space-between;
	}
	.members{
		display: flex;
		height:40rpx;
		padding:40rpx 30rpx 40rpx 30rpx;
		margin-top:2rpx;
		background-color: #FFFFFF;
		align-items: center;
		flex-direction:row;
		justify-content: space-between;
	}
	.member-el{
		display: flex;
		flex-direction: row;
	}
	.font-wi{
		padding-left:20rpx;
		font-size:35rpx;
		font-weight: 600;
	}
	.identity-imgs{
		width:50rpx;
		height:50rpx;
		
	}
</style>
