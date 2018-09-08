<template>
  <div class="shop">
    <section class="shop_top">
      <img class="shop_top_cover" :src="imgBaseUrl + shopDetail.image_path">
      <section class="shop_top_container">
				<section class="top_head">
        	<img class="shop_left" :src="imgBaseUrl + shopDetail.image_path">
        	<section class="shop_middle">
          	<header class="shop_title">xiaoguo</header>
          	<p class="shop_sendway ellipsis">商家配送/分钟到达/¥5配送费</p>
          	<p class="shop_notice ellipsis">公告：为了更好地服务广大吃货</p>
        	</section>
        	<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="right_arrow" >
          	<path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
        	</svg>
				</section>
				<section class="top_footer">
					<p class="footer_discount">
						<span>减</span>
						<span>满减优惠</span>
						<span>(app专享)</span>
					</p>
					<p>1个活动</p>
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
	<section class="shop_content">
		<nav class="content_nav">
			<div class="left_nav_tab" :class="{left_nav_active: shopNavLeft == 'hot'}" @click="shopNavLeft = 'hot'">
				<span>热销榜</span>
			</div>
			<div class="left_nav_tab" :class="{left_nav_active: shopNavLeft == 'discount'}" @click="shopNavLeft = 'discount'">
				<span>优惠</span>
			</div>
		</nav>
		<section class="content_right">
			<section class="food_header">
				<span class="h_hot">热销榜</span>
				<span class="h_center">大家喜欢吃，才是真好吃</span>
				<span class="h_right">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="4" viewBox="0 0 20 4">
						<path id="ico_menu" class="cls-1" d="M1043,322a2,2,0,1,1-2,2A2,2,0,0,1,1043,322Zm8,0a2,2,0,1,1-2,2A2,2,0,0,1,1051,322Zm8,0a2,2,0,1,1-2,2A2,2,0,0,1,1059,322Z" transform="translate(-1041 -322)"></path>
					</svg>
				</span>
			</section>
			<ul class="food_body">
				<li class="each_food">
					<section class="food_img">
						<img src="" alt="pic">
					</section>
					<section class="food_right">
						<header class="food_detail">
							<span class="food_name ellipsis">点名是否是</span>
							<ul class="food_detail_ul">
								<li class="food_detail_li">123</li>
							</ul>
						</header>
						<p class="food_num">hhhhhh</p>
						<p class="food_num">ggggg</p>
						<p class="food_num"><span class="special">hohohoh</span></p>
						<section class="food_price">
							<section class="price_left">
								<span>¥</span>
								<span>22</span>
							</section>
							<span class="price_add">
								<span>+</span>
							</span>
						</section>
					</section>
				</li>
			</ul>
		</section>
	</section>
	<section class="shop_cart">
		<section></section>
		<section></section>
		<section></section>
		<section></section>
	</section>
  </div>
</template>
<script>
import { getShop, getPosByGeohash } from 'api/index'
import { mapState } from 'vuex'
import { checkCode } from 'common/js/util'
import { imgBaseUrl } from 'config/env'
export default {
	data() {
		return {
			geohash: '', // geohash地理位置
			shopId: '', // 商铺id
			shopDetail: '', //商铺详情
			shopNavType: 'shop', // 商铺的商品与评价切换
			shopNavLeft: 'hot', // 商铺的热销榜与优惠切换
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
	},
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
		},
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
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
			.shop_left {
				@include wh(3rem, 3rem);
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
			margin-top: 0.3rem;
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
	display: flex;
	.content_nav {
		.left_nav_tab {
			border-left: 0.13rem solid #f5f5f5;
			border-bottom: 0.01rem solid#ededed;
			padding: 1rem 0.15rem;
			text-align: center;
			@include sc(0.6rem, #666);
			&.left_nav_active {
				background: #fff;
				border-left-color: #3190e8;
			}
		}
		&:first-child {
			width: 4rem;
		}
	}
	.content_right {
		flex: 4;
		position: relative;
		.food_header{
			@include fj;
			align-items: center;
			padding: 0.4rem;
			.h_hot{
				@include sc(0.8rem, #666);
			}
			.h_center{
				@include sc(0.6rem, #999);
			}
			.h_right{
				@include sc(0.6rem, #999);
				svg{
					fill: #999;
					vertical-align: middle;
				}
			}
		}
		.food_body{
			background-color: #fff;
			.each_food {
				display: flex;
				padding: 0.2rem 0.5rem;
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
						}
					}
					.food_num {
						@include fj;
						@include sc(0.6rem, #999);
						margin-top: 0.3rem;
						.special{
							color: #f07373;
							border: 0.05rem solid #f07373;
							@include borderRadius(0.3rem);
						}
					}
					.food_price {
						@include fj;
						.price_left{
							span:nth-of-type(1) {
								@include sc(0.7rem, #f07373); 
							}
							span:nth-of-type(2){
								@include sc(0.8rem, #f07373); 
							}
						}
						.price_add{}
					}
				}
			}
		}
	}
}
.shop_cart {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>

