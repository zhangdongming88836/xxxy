<template>
	<view>
		<view class="myPage">
			<view class="myhear">
				<view>
					<text>深信院教学平台</text>
				</view>
			</view>
			<view class="information">
				<view class="information-wrap">
					<view class="information-left">
						<view class="information-left-top">
							<image :src="'http://192.168.10.238:8087/web/'+Details.avatar" mode="" class="left-top-img"></image>
						</view>
						<view class="username">
							<text>{{Details.userName}}</text>
						</view>
					</view>
					<view class="information-right">
						<view class="">
							<text class="Martial">{{Details.courseName}}</text>
						</view>
						<view class="season">
							<text>{{Details.semesterName}}</text>
						</view>
						<view class="introduce">
							<text>暂无课程简介</text>
						</view>
						<view class="Toview" @click="vitae">
							<text>查看课程简介></text>
						</view>
					</view>
				</view>
			</view>
			<!-- ******************************************************** -->
			<view class="area">
				<view class="students" @click="clasLost(Details.courseName)">
					<view class="">
						<image src="../../static/multiFunction/bjxs.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>班级学生</text>
					</view>
				</view>
				<view class="students" @click="resources(Details.courseId)">
					<view class="">
						<image src="../../static/multiFunction/kczy.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>资源详情</text>
					</view>
				</view>
				<view class="students" @click="homework(Details.courseId)">
					<view class="">
						<image src="../../static/multiFunction/zy.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>作业</text>
					</view>
				</view>
				<view class="students" @click="attendance(Details.courseId)">
					<view class="">
						<image src="../../static/multiFunction/kq.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>考勤</text>
					</view>
				</view>
			</view>
			<!-- *********************************************************************** -->
			<view class="areass">
				<view class="students" @click="results(Details.courseName)">
					<view class="">
						<image src="../../static/multiFunction/cj.png" mode="" class="icon"></image>
					</view>
					<view class="students-font" >
						<text>成绩册</text>
					</view>
				</view>
				<view class="students" @click="practice({courseId:Details.courseId,courseName:Details.courseName})">
					<view class="">
						<image src="../../static/multiFunction/lx.png" mode="" class="icon"></image>
					</view>
					<view class="students-font" >
						<text>在线练习</text>
					</view>
				</view>
				<view class="students" @click="computerSide">
					<view class="">
						<image src="../../static/multiFunction/dn.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>电脑端</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/dk.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>执勤打卡</text>
					</view>
				</view>
			</view>
			<!-- *********************************************************************** -->
		<!-- 	<view class="areass">
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/wxxx.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>微信消息</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/tl.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>讨论区</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/fz.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>分组</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/tw.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>课堂提问</text>
					</view>
				</view>
			</view> -->
			<!-- *********************************************************************** -->
		<!-- 	<view class="areass">
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/dcwj.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>调查问卷</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/jxtp.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>投票</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/hd.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>活动</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/pf.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>教学评价</text>
					</view>
				</view>
			</view> -->
			<!-- *********************************************************************** -->
		<!-- 	<view class="areass">
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/dmpl.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>弹幕讨论</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/xshp.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>学生互测</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/xszb.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>互动直播</text>
					</view>
				</view>
				<view class="students">
					<view class="">
						<image src="../../static/multiFunction/ks.png" mode="" class="icon"></image>
					</view>
					<view class="students-font">
						<text>考试</text>
					</view>
				</view>
			</view> -->
			
		</view>	
	</view>
</template>

<script>
	export default{
		data(){
			return{
		     Details:{
				 
			 },	
			}
		},
		methods:{
			//在线练习
			practice(val){
				console.log(val)
				uni.navigateTo({
					url: `./practice/index?courseId=${val.courseId}&courseName=${val.courseName}`
				});
			},
			//班级
			clasLost(val){
				uni.navigateTo({
					url: "./clasLost/index?courseName="+val
				});
			},
			//作业
			homework(val){
				uni.navigateTo({
					url: "./homework/index?id="+val
				});
			},
			//考勤
			attendance(val){
				uni.navigateTo({
					url: "./attendance/index?courseId="+val
				});
			},
			//成绩
			results(val){
				uni.navigateTo({
					url: "./results/index?courseName="+val
				});
			},
			//电脑端
			computerSide(){
				uni.navigateTo({
					url: "./computerSide/index"
				});
			},
			//课程资源
			resources(val){
				uni.navigateTo({
					url: "./resources/index?id="+val
				});
			},
			//课程建立
			vitae(){
				uni.showModal({
				    title: '查看课程简介',
				    content: '',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		},
		onLoad: function(val) {
			console.log('App onLoad')
			this.$http.get("/web/api/course/selectById/"+val.id).then( res => {
				console.log(res)
				this.Details = res.data.data;
			})
		},
		onShow:function() {
			console.log( 'app onshow')
			 // uni.$once('Detailss',function(val){
				//  console.log(val,'--->')
			 //       this.Details = val;
				//    console.log(this.Details)
			 //    })
			
		},
		onHide:function() {
			console.log('App Hide')
		
		}
	}
</script>

<style>
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
/************************************************************************************/
	.information{
		width: 100%;
		height: 200rpx;
		margin-top: 80rpx;
	}
	.information-wrap{
		width: 100%;
		height: 200rpx;
		padding: 0 30rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}
	.information-left{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.left-top-img{
		width:100rpx;
		height:100rpx;
	}
	.information-right{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding-left: 30rpx;
	}
	.username{
		font-size: 30rpx;
		color: #FFFFFF;
	}
	.Martial{
		font-size: 35rpx;
		color: #FFFFFF;
	}
	.season{
		font-size: 20rpx;
		padding-bottom: 5rpx;
		color: #FFFFFF;
	}
	.introduce{
		font-size: 20rpx;
		padding-bottom: 5rpx;
		color: #FFFFFF;
	}
	.Toview{
		font-size: 30rpx;
		padding-bottom: 5rpx;
		color: #007AFF;
	}
	/****************************************************************/
	.area{
		width: 100%;
		border:0.5rpx solid #C0C0C0;
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: center;
		padding-top: 30rpx;
		background-color: #FFFFFF;
	}
	.areass{
	  width: 100%;
	  border: 0.5rpx solid #C0C0C0;
	  display: flex;
	  flex-wrap: nowrap;
	  align-items: center;
	  justify-content: center;
	  background-color: #FFFFFF;	
	}
	.students{
		width: 25%;
		height: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		border:1rpx solid #C0C0C0;
	}
	.icon{
		width:50rpx;
		height:50rpx;
	}
	.students-font{
		font-size: 20rpx;
	}
</style>
