<template>
  <div class="shop">
    <section class="shop_top">
      <img class="shop_top_cover" :src="imgBaseUrl + shopDetail.image_path">
      <section class="shop_top_container">
		<section class="top_head">
			<span class="goback" @click="goback">
				<svg data-v-12835cef="" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
					<polyline data-v-12835cef="" points="12,18 4,9 12,0" style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 2;"></polyline>
				</svg>
			</span>
        	<img class="shop_left" :src="imgBaseUrl + shopDetail.image_path">
        	<section class="shop_middle">
				<header class="shop_title">{{shopDetail.name}}</header>
				<p class="shop_sendway ellipsis">商家配送/{{shopDetail.order_lead_time}}分钟到达/¥{{shopDetail.float_delivery_fee}}配送费</p>
				<p class="shop_notice ellipsis">公告：{{shopNotice}}</p>
        	</section>
        	<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="right_arrow" >
          		<path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
        	</svg>
		</section>
		<section class="top_footer" v-if="shopDetail.activities && shopDetail.activities.length">
			<p class="footer_discount">
				<span :style="{backgroundColor: '#' + shopDetail.activities[0].icon_color, borderColor: '#' + shopDetail.activities[0].icon_color}">{{shopDetail.activities[0].icon_name}}></span>
				<span>{{shopDetail.activities[0].description}}(app专享)</span>
			</p>
			<p>{{shopDetail.activities.length}}个活动</p>
			<svg class="footer_arrow">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
			</svg>
		</section>
      </section>
    </section>
    <nav class="shop_nav">
		<div class="nav_tab" @click="shopNavType = 'shop'">
			<span :class="{nav_active: shopNavType == 'shop'}">商品</span>
		</div>
		<div class="nav_tab" @click="shopNavType = 'evaluation'">
			<span :class="{nav_active: shopNavType == 'evaluation'}">评价</span>
		</div>
	</nav>
	<transition name="shop-nav">
		<section class="shop_content" v-if="shopNavType == 'shop'">
			<nav class="content_nav">
				<div class="left_nav_tab" v-for="(item, index) in menuList" :key="item.id" :class="{left_nav_active: index == curMenu}" @click="chooseMenu(index)">
					<img :src="getImgPath(item.icon_url)" class="nav_img">
					<span class="ellipsis">{{item.name}}</span>
				</div>
			</nav>
			<section class="content_right">
				<ul>
					<li v-for="(item, index) in menuList" :key="index">
						<section class="food_header" :ref="'index'+index">
							<span class="h_hot">{{item.name}}</span>
							<span class="h_center">{{item.description}}</span>
							<span class="h_right">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4">
									<path id="ico_menu" class="cls-1" d="M1043,322a2,2,0,1,1-2,2A2,2,0,0,1,1043,322Zm8,0a2,2,0,1,1-2,2A2,2,0,0,1,1051,322Zm8,0a2,2,0,1,1-2,2A2,2,0,0,1,1059,322Z" transform="translate(-1041 -322)"></path>
								</svg>
							</span>
						</section>
						<ul class="food_body">
							<li class="each_food" v-for="(food, foodIndex) in item.foods" :key="foodIndex">
								<section class="food_img">
									<img :src="imgBaseUrl + food.image_path" alt="pic">
								</section>
								<section class="food_right">
									<header class="food_detail">
										<span class="food_name ellipsis">{{food.name}}</span>
										<ul class="food_detail_ul" v-if="food.attributes.length">
											<li class="food_detail_li" v-for="(attr, attrIndex) in food.attributes" :key="attrIndex" :style="{color: '#' + attr.icon_color,borderColor:'#' +attr.icon_color}" :class="{attribute_new: attr.icon_name == '新'}">
												<p :style="{color: attr.icon_name == '新'? '#fff' : '#' + attr.icon_color}">{{attr.icon_name == '新'? '新品':attr.icon_name}}</p>
											</li>
										</ul>
									</header>
									<p class="food_num">{{food.description}}</p>
									<p class="food_num">月售{{food.month_sales}},好评率{{food.satisfy_rate}}%</p>
									<p class="food_num" v-if="food.activity"><span class="special">{{food.activity.image_text}}</span></p>
									<section class="food_price">
										<section class="price_left">
											<span>¥</span>
											<span>{{food.specfoods[0].price}}</span>
											<span>起</span>
										</section>
										<buy-cart></buy-cart>
									</section>
								</section>
							</li>
						</ul>
					</li>
				</ul>
			</section>
			<section class="shop_cart_container">
				<section class="food_list">foodlist</section>
				<section class="shop_cart">
				<div class="cart_icon_container">
					<span class="cart" :class="{bg_color: false}">
						<span class="num">1</span>	
						<svg class="cart_icon">
							<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
						</svg>
					</span>
				</div>
				<div class="cart_num">
					<p class="cart_num_sum">¥20.00</p>
					<p class="cart_num_send">配送费¥5</p>
				</div>
				<div class="cart_sum" :class="{active: false}">去结算</div>
				</section>
			</section>
		</section>
	</transition>
	<transition name="shop-nav">
		<section class="shop_evaluation" v-if="shopNavType == 'evaluation'">
			<div class="shop_evaluation_wrap">
				<header class="rating">
					<section class="rating_left">
						<p>{{shopDetail.rating | tofixed(1)}}</p>
						<p>综合评价</p>
						<p>低于周边{{shopDetailRating.compare_rating | topercent | tofixed(2)}}%的商家</p>
					</section>
					<section class="rating_right">
						<p class="detail_p">
							<span class="service_title">服务态度</span>
							<span class="service_star">
								<rating-star :rating="shopDetailRating.service_score"></rating-star>
							</span>
							<span class="service_score">{{shopDetailRating.service_score | tofixed(1)}}</span>
						</p>
						<p class="detail_p">
							<span class="service_title">菜品评价</span>
							<span class="service_star">
								<rating-star :rating="shopDetailRating.food_score"></rating-star>
							</span>
							<span class="service_score">{{shopDetailRating.food_score | tofixed(1)}}</span>
						</p>
						<p class="detail_p">
							<span class="service_title">送达时间</span>
							<span class="service_score service_star">{{shopDetailRating.deliver_time}}</span>
							<span class="service_title">分钟</span>
						</p>
					</section>
				</header>
				<ul class="satisfaction">
					<li class="s_li good" v-for="(item, index) in shopDetailRatingTag" :key="index" 
					:class="{'bad': item.unsatisfied, 'active': shopDetailRatingTagIndex === index}"
					@click="chooseRating(item, index)">{{item.name}}({{item.count}})</li>
				</ul>
				<ul class="rating_list">
					<li class="rating_list_li" v-for="(item, index) in ratingList" :key="index">
						<img :src="getImgPath(item.avatar)" class="li_icon">
						<section class="li_detail">
							<p class="li_detail_user">
								<span>{{item.username}}</span>
								<span>{{item.rated_at}}</span>
							</p>
							<p class="li_detail_send">
								<rating-star :rating="item.rating"></rating-star>
								<span class="li_detail_send_desc" v-if="item.time_spent_desc">{{item.time_spent_desc}}</span>
							</p>
							<ul class="li_detail_img">
								<li v-for="(img, imgIndex) in item.item_ratings" :key="imgIndex">
									<img :src="getImgPath(item.image_hash)" class="user_upload_img" ng-if="item.image_hash">
								</li>
							</ul>
							<ul class="li_detail_name">
								<li class="ellipsis" v-for="(text, textIndex) in item.item_ratings" :key="textIndex">{{text.food_name}}</li>
							</ul>
						</section>
					</li>	
				</ul>
			</div>
		</section>
	</transition>
	<!-- <section class="full_screen_cover">cover</section> -->
  </div>
</template>
<script>
import { getShop, getPosByGeohash, getShopMenu, getShopScore, getRatingTag, getRatingList } from 'api/index'
import { mapState } from 'vuex'
import { checkCode } from 'common/js/util'
import { imgBaseUrl } from 'config/env'
import { getImgPath } from 'common/js/mixin'
import RatingStar from 'components/common/ratingStar'
import BuyCart from 'components/common/buyCart'
export default {
	data() {
		return {
			geohash: '', // geohash地理位置
			shopId: '', // 商铺id
			shopDetail: '', //商铺详情
			shopDetailRating: '', // 商铺评分详情
			shopDetailRatingTag: '', // 商铺评分标签
			shopDetailRatingTagIndex: 0, // 当前选择的标签
			ratingList: [], //评价列表
			ratingOffset: 0, //评价获取数据offset值
			shopNavType: 'shop', // 商铺的商品与评价切换
			shopNavLeft: 'hot', // 商铺的热销榜与优惠切换
			menuList: [], // 食品列表
			curMenu: 0, // 默认为0
			imgBaseUrl,
		}
	},
	created() {
		let query = this.$route.query
		this.geohash = query.geohash
		this.shopId = query.id
	},
	mounted() {
		this.initData()
	},
	computed: {
		...mapState(['latitude', 'longitude']),
		shopNotice: function() {
			return this.shopDetail.promotion_info || '欢迎！祝您用餐愉快。'
		},
	},
	mixins: [getImgPath],
	methods: {
		initData() {
			//防止刷新页面时，vuex状态丢失
			if (!this.latitude) {
				//获取位置信息
				getPosByGeohash(this.geohash, res => {
					// 记录当前经度纬度进入vuex
					if (checkCode(res.status)) {
						this.RECORD_ADDRESS(res.data)
					}
				})
			}
			// 获取商铺详情信息
			getShop(this.shopId, this.latitude, this.longitude, res => {
				if (checkCode(res.status)) {
					this.shopDetail = res.data
				}
			})
			// 获取左边菜单
			getShopMenu(this.shopId, res => {
				if (checkCode(res.status)) {
					this.menuList = res.data
				}
			})
			// 获取评论分数详情
			getShopScore(this.shopId, res => {
				if (checkCode(res.status)) {
					this.shopDetailRating = res.data
				}
			})
			// 获取评论列表
			this.ratingList = this.chooseRating('', 0)
			// 获取评论分数详情
			getRatingTag(this.shopId, res => {
				if (checkCode(res.status)) {
					this.shopDetailRatingTag = res.data
				}
			})
		},
		// 选择左边food分类
		chooseMenu(index) {
			let str = 'index' + index.toString()
			this.curMenu = index
			// 滚动至选择的foodList
			this.$refs[str][0].scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		},
		// 选择评论类型
		chooseRating(item, index) {
			this.shopDetailRatingTagIndex = index
			// 根据选择的tag获取评论列表
			getRatingList(this.shopId, this.ratingOffset, item.name, res => {
				if (checkCode(res.status)) {
					this.ratingList = res.data
				}
			})
		},
		goback() {
			this.$router.go(-1)
		}
	},
	components: {
		RatingStar,
		BuyCart
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.shop {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	height: 100%;
	display: flex;
	flex-direction: column;
}
.shop_top {
	@include fj;
	position: relative;
	overflow: hidden;
	.shop_top_cover {
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
		filter: blur(10px); // 高斯模糊
	}
	.shop_top_container {
		width: 100%;
		background-color: rgba(119, 103, 137, 0.43);
		padding: 0.4rem 0 0.4rem 0.4rem;
		overflow: hidden;
		z-index: 10;
		.top_head {
			position: relative;
			display: flex;
			align-items: center;
			.goback{
				position: absolute;
				left: 0;
				top: 0;
				@include wh(1rem, 1rem);
				z-index: 100;
			}
			.shop_left {
				@include wh(3rem, 3rem);
				margin-right: 0.2rem;
			}
			.shop_middle {
				display: flex;
				flex-direction: column;
				.shop_title {
					@include sc(1rem, #fff);
					margin-bottom: 0.2rem;
				}
				.shop_sendway {
					@include sc(0.5rem, #fff);
					margin-bottom: 0.2rem;
				}
				.shop_notice {
					@include sc(0.5rem, #fff);
				}
			}
			.right_arrow {
				position: absolute;
				right: 0.3rem;
			}
		}
		.top_footer {
			position: relative;
			@include fj;
			align-items: center;
			margin: 0.3rem 0;
			padding-right: 1.3rem;
			font-size: 0.6rem;
			p {
				color: #fff;
			}
			.footer_discount {
				span {
					color: #fff;
				}
				span:first-child {
					border-radius: 0.5rem;
					background-color: rgb(240, 115, 115);
					border-color: rgb(240, 115, 115);
				}
			}
			.footer_arrow {
				position: absolute;
				right: 0.3rem;
				color: #fff;
				@include wh(0.5rem, 0.5rem);
			}
		}
	}
}
.shop_nav {
	display: flex;
	align-content: center;
	padding: 0.3rem;
	background-color: #fff;
	border-bottom: 1px solid $bc;
	.nav_tab {
		flex: 1;
		text-align: center;
		span {
			@include sc(0.7rem, #949292);
			border-bottom: 0.1rem solid #fff;
			transition: all 0.5s;
			&.nav_active {
				color: #3190e8;
				border-color: #3190e8;
			}
		}
	}
}
.shop_content {
	flex: 1;
	display: flex;
	overflow-y: hidden;
	.content_nav {
		overflow: auto;
		.left_nav_tab {
			display: flex;
			align-items: center;
			border-left: 0.13rem solid #f5f5f5;
			border-bottom: 0.01rem solid#ededed;
			padding: 1rem 0.15rem;
			text-align: center;
			@include sc(0.6rem, #666);
			&.left_nav_active {
				background: #fff;
				border-left-color: #3190e8;
			}
			.nav_img {
				@include wh(0.7rem, 0.7rem);
				margin-right: 0.2rem;
			}
		}
		&:first-child {
			width: 4rem;
		}
	}
	.content_right {
		flex: 4;
		position: relative;
		overflow-y: auto;
		.food_header {
			@include fj;
			align-items: center;
			padding: 0.4rem;
			.h_hot {
				@include sc(0.8rem, #666);
			}
			.h_center {
				@include sc(0.6rem, #999);
			}
			.h_right {
				@include sc(0.6rem, #999);
				svg {
					fill: #999;
					vertical-align: middle;
				}
			}
		}
		.food_body {
			background-color: #fff;
			.each_food {
				display: flex;
				padding: 0.2rem 0.5rem;
				position: relative;
				overflow: hidden;
				.food_img {
					padding-right: 0.5rem;
					img {
						display: block;
						@include borderRadius(0.2rem);
						@include wh(2.3rem, 2.3rem);
					}
				}
				.food_right {
					display: flex;
					flex-direction: column;
					flex: auto;
					.food_detail {
						@include fj;
						align-items: center;
						.food_name {
							width: 80%;
							@include sc(0.8rem, #333);
						}
						.food_detail_ul {
							display: flex;
							.food_detail_li {
								height: 0.5rem;
								line-height: 0.5rem;
								border: 1px solid rgb(240, 115, 115);
								margin-left: 0.07rem;
								@include borderRadius(0.4rem);
								@include sc(0.4rem, rgb(240, 115, 115));
							}
							.attribute_new {
								position: absolute;
								top: 0;
								left: 0;
								background-color: #4cd964;
								@include wh(2rem, 2rem);
								display: flex;
								align-items: flex-end;
								transform: rotate(-45deg) translate(-0.1rem, -1.5rem);
								border: none;
								border-radius: 0;
								p {
									@include sc(0.4rem, #fff);
									text-align: center;
									flex: 1;
								}
							}
						}
					}
					.food_num {
						@include fj;
						@include sc(0.6rem, #999);
						margin-top: 0.3rem;
						.special {
							color: #f07373;
							border: 0.05rem solid #f07373;
							@include borderRadius(0.3rem);
						}
					}
					.food_price {
						@include fj;
						.price_left {
							span:nth-of-type(1) {
								@include sc(0.7rem, #f07373);
							}
							span:nth-of-type(2) {
								@include sc(0.8rem, #f07373);
							}
							span:nth-of-type(3) {
								@include sc(0.5rem, #999);
							}
						}
					}
				}
			}
		}
	}
	.shop_cart_container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 15;
		.food_list {
			position: fixed;
			width: 100%;
			left: 0;
			bottom: 2rem;
			background-color: #fff;
			z-index: 12;
		}
		.shop_cart {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 2rem;
			width: 100%;
			background-color: #3d3d3f;
			display: flex;
			align-items: center;
			z-index: 15;
			.cart_icon_container {
				flex: 1;
				.cart{
					display: flex;
					position: absolute;
					bottom: 0.7rem;
					left: 0.9rem;
					padding: 0.4rem;
					background-color: #3d3d3f;
					border: 0.2rem solid #444;
					box-shadow: 0 0 0.2rem #444;
					@include borderRadius(50%);
					&.bg_color{
						background-color: #3190e8;
					}
					.num{
					    position: absolute;
						top: -0.25rem;
						right: -0.25rem;
						@include sc(0.5rem, #ffff);
						@include borderRadius(50%);
						@include wh(0.6rem,0.6rem);
						line-height: 0.7rem;
						text-align: center;
						background-color: #ff461d;
					}
				}
				.cart_icon {
					@include wh(1.2rem, 1.2rem);
					fill: #3190e8;
				}
			}
			.cart_num {
				flex: 2;
				.cart_num_sum{
					@include sc(0.9rem, #fff);
				}
				.cart_num_send{
					@include sc(0.5rem, #fff);
				}
			}
			.cart_sum {
				flex: 1;
				height: 100%;
				line-height: 2rem;
				text-align: center;
				@include sc(0.8rem, #fff);
				&.active{
					background-color: #4cd964;
				}
			}
		}
	}
}
.shop_evaluation {
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow-y: hidden;
	.shop_evaluation_wrap {
		overflow-y: auto;
	}
	.rating {
		padding: 0.5rem 0.2rem;
		background-color: #fff;
		@include fj;
		.rating_left {
			flex: 1;
			text-align: center;
			p:nth-of-type(1) {
				@include sc(1.3rem, $score);
			}
			p:nth-of-type(2) {
				@include sc(0.7rem, #666);
			}
			p:nth-of-type(3) {
				margin-top: 0.3rem;
				@include sc(0.6rem, #999);
			}
		}
		.rating_right {
			flex: 1;
			text-align: left;
			.detail_p {
				display: flex;
				padding: 0.2rem;
				.service_title {
					@include sc(0.6rem, #666);
				}
				.service_star {
					padding: 0 0.2rem;
				}
				.service_score {
					@include sc(0.6rem, $score);
				}
			}
		}
	}
	.satisfaction {
		display: flex;
		flex-wrap: wrap;
		margin-top: 0.6rem;
		padding: 0.5rem 0.3rem;
		background-color: #fff;
		.s_li {
			@include sc(0.6rem, #6d7885);
			margin: 0 0.5rem 0.3rem 0;
			padding: 0.2rem 0.1rem;
			opacity: 0.8;
			@include borderRadius(0.4rem);
			background-color: #ebf5ff;
			&.bad {
				background-color: #f5f5f5;
			}
			&.active {
				background-color: $blue;
				color: #fff;
			}
		}
	}
	.rating_list {
		background-color: #fff;
		padding: 0 0.5rem;
		.rating_list_li {
			display: flex;
			border-top: 0.01rem solid $bc;
			opacity: 0.8;
			padding: 0.4rem 0;
			.li_icon {
				@include wh(1.6rem, 1.6rem);
				@include borderRadius(50%);
				margin-right: 0.5rem;
			}
			.li_detail {
				flex-grow: 1;
			}
			.li_detail_user {
				position: relative;
				@include sc(0.6rem, #666);
				span:nth-of-type(2) {
					position: absolute;
					right: 1rem;
				}
			}
			.li_detail_send {
				height: 1rem;
				.li_detail_send_desc {
					@include sc(0.6rem, #666);
				}
			}
			.li_detail_img {
				display: flex;
				.user_upload_img {
					@include wh(2rem, 2rem);
					margin-right: 0.3rem;
				}
			}
			.li_detail_name {
				display: flex;
				li {
					width: 2.2rem;
					margin-right: 0.2rem;
					padding: 0.1rem 0.2rem;
					border: 0.05rem solid $bc;
					@include borderRadius(0.1rem);
					@include sc(0.6rem, #666);
				}
			}
		}
	}
}
.full_screen_cover {
	position: fixed;
	top: 0;
	left: 0;
	@include wh(100%, 100%);
	background-color: rgba(0,0,0,.3);
	opacity: 0.5;
	z-index: 10;
}
// transition
.shop-nav-enter-active,
.shop-nav-leave-active {
	transition: opacity 0.3s;
}
.shop-nav-enter,
.shop-nav-leave-to {
	opacity: 0;
}
</style>

