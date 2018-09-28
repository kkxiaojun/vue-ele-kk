<template>
  <div class="shop">
    <!-- top展示 -->
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
					<router-link :to="'shop/shopDetail'">
						<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="right_arrow">
							<path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none" />
						</svg>
					</router-link>
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
    <!-- 商品与评价切换 -->
    <nav class="shop_nav">
      <div class="nav_tab" @click="shopNavType = 'shop'">
        <span :class="{nav_active: shopNavType == 'shop'}">商品</span>
      </div>
      <div class="nav_tab" @click="shopNavType = 'evaluation'">
        <span :class="{nav_active: shopNavType == 'evaluation'}">评价</span>
      </div>
    </nav>
    <!-- 商品tab -->
    <transition name="shop-nav">
      <section class="shop_content" v-if="shopNavType == 'shop'">
        <!-- 左侧tab切换 -->
        <nav class="content_nav">
          <div class="left_nav_tab" v-for="(item, index) in menuList" :key="item.id" :class="{left_nav_active: index == curMenu}" @click="chooseMenu(index)">
            <img :src="getImgPath(item.icon_url)" class="nav_img">
            <span class="ellipsis">{{item.name}}</span>
            <span class="nav_num" v-if="categoryNum[index]&&item.type==1">{{categoryNum[index]}}</span>
          </div>
        </nav>
        <!-- 右侧food列表 -->
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
                    <p class="food_num" v-if="food.activity">
                      <span class="special">{{food.activity.image_text}}</span>
                    </p>
                    <section class="food_price">
                      <section class="price_left">
                        <span>¥</span>
                        <span>{{food.specfoods[0].price}}</span>
                        <span>起</span>
                      </section>
                      <buy-cart :shop-id="shopId" :food="food" @show-move-ball="showMoveBall" @show-spec="showGoodsSpec"></buy-cart>
                    </section>
                  </section>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <!-- toggle-cart -->
        <section class="toggle_cart_container" v-if="toggleCartShow&&cartFoodList.length">
          <header class="cart_header">
            <h4>购物车</h4>
            <p @click="clearCart">
              <svg class="clear_icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-remove"></use>
              </svg>
              <span class="clear_all">清空</span>
            </p>
          </header>
          <ul>
            <li class="cart_list" v-for="(item, index) in cartFoodList" :key="index">
              <div class="cart_desc">
                <span>{{item.name}}</span>
                <span>{{item.specs}}</span>
              </div>
              <div class="cart_price">
                <span>¥</span>
                <span>{{item.price}}</span>
              </div>
              <div class="cart_control">
                <span class="reduce" @click="removeOutCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                  <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                  </svg>
                </span>
                <span class="num">{{item.num}}</span>
                <span class="add" @click="addToCart(item.category_id, item.item_id, item.food_id, item.name, item.price, item.specs)">
                  <svg class="add_icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                  </svg>
                </span>
              </div>
            </li>
          </ul>
        </section>
        <!-- 底部cart -->
        <section class="cart_list_container" @click.prevent.stop="toggleCart">
          <div class="cart_icon_container">
            <span class="cart" :class="{bg_color: false}">
              <span class="num" v-if="totalNum">{{totalNum}}</span>
              <svg class="cart_icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-icon"></use>
              </svg>
            </span>
          </div>
          <div class="cart_num">
            <p class="cart_num_sum">¥{{totalPrice}}</p>
            <p class="cart_num_send">配送费¥5</p>
          </div>
          <div class="cart_sum" :class="{active: cartFoodList.length}">
            <span v-if="minSendPrice>0">还差{{minSendPrice}}元起送</span>
            <span class="spec" @click.prevent.stop="checkCart" v-else>去结算</span>
          </div>
        </section>
        <!-- cart遮罩层 -->
        <section class="shop_cart_cover" v-show="toggleCartShow&&cartFoodList.length">cover</section>
      </section>
    </transition>
    <!-- 评论tab -->
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
            <li class="s_li good" v-for="(item, index) in shopDetailRatingTag" :key="index" :class="{'bad': item.unsatisfied, 'active': shopDetailRatingTagIndex === index}" @click="chooseRating(item, index)">{{item.name}}({{item.count}})</li>
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
    <!-- 商品中多选规格展示 -->
    <section class="goods_spec_container" v-if="showSpec">
      <div class="specs_cover" @click="showGoodsSpec"></div>
      <div class="specs_list">
        <header class="specs_list_header">
          <h4 class="ellipsis">{{choosedFoods.name}}</h4>
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="specs_cancel" @click="showGoodsSpec">
            <line x1="0" y1="0" x2="16" y2="16" stroke="#666" stroke-width="1.2" />
            <line x1="0" y1="16" x2="16" y2="0" stroke="#666" stroke-width="1.2" />
          </svg>
        </header>
        <section class="specs_details">
          <h5 class="specs_details_title">{{choosedFoods.specifications[0].name}}</h5>
          <ul>
            <li v-for="(item, itemIndex) in choosedFoods.specifications[0].values" :key="itemIndex" :class="{specs_activity: itemIndex == choosedFoodsSpecIndex}" @click="chooseGoodsSpecIndex(itemIndex)">
              {{item}}
            </li>
          </ul>
        </section>
        <footer class="specs_footer">
          <div class="specs_price">
            <span>¥ </span>
            <span>{{choosedFoods.specfoods[choosedFoodsSpecIndex].price}}</span>
          </div>
          <div class="specs_addto_cart" @click="addSpecsCart(choosedFoods.category_id, choosedFoods.item_id, choosedFoods.specfoods[choosedFoodsSpecIndex].food_id, 
				choosedFoods.specfoods[choosedFoodsSpecIndex].name, choosedFoods.specfoods[choosedFoodsSpecIndex].price, choosedFoods.specifications[0].values[choosedFoodsSpecIndex], 
				choosedFoods.specfoods[choosedFoodsSpecIndex].packing_fee, choosedFoods.specfoods[choosedFoodsSpecIndex].sku_id, choosedFoods.specfoods[choosedFoodsSpecIndex].stock)">
            加入购物车</div>
        </footer>
      </div>
    </section>
		<router-view></router-view>
  </div>
</template>
<script>
import { getShop, getPosByGeohash, getShopMenu, getShopScore, getRatingTag, getRatingList } from 'api/index'
import { mapState, mapMutations } from 'vuex'
import { checkCode } from 'common/js/util'
import { imgBaseUrl } from 'config/env'
import { getImgPath } from 'common/js/mixin'
import BuyCart from 'components/common/buyCart'
import RatingStar from 'components/common/ratingStar'
export default {
	data() {
		return {
			geohash: '', // geohash地理位置
			shopId: null, // 商铺id
			shopDetail: '', //商铺详情
			shopDetailRating: '', // 商铺评分详情
			shopDetailRatingTag: '', // 商铺评分标签
			shopDetailRatingTagIndex: 0, // 当前选择的标签
			ratingList: [], //评价列表
			ratingOffset: 0, //评价获取数据offset值
			shopNavType: 'shop', // 商铺的商品与评价切换
			shopNavLeft: 'hot', // 商铺的热销榜与优惠切换
			menuList: [], // 食品列表
			showSpec: false, // 是否显示商品规格弹窗listenInCart
			toggleCartShow: false, // 是否显示cartlist
			choosedFoods: null, // 当前选中的商品规格数据
			choosedFoodsSpecIndex: 0, // 当前选中商品规格的索引值
			curMenu: 0, // 默认为0
			categoryNum: [], // 商品类型右上角已加入购物车的数量
			totalPrice: 0, // 总共价格
			cartFoodList: [], //购物车商品列表
			imgBaseUrl,
		}
	},
	created() {
		let query = this.$route.query
		this.geohash = query.geohash
		this.shopId = query.id
		this.INIT_BUYCART()
	},
	mounted() {
		this.initData()
	},
	computed: {
		...mapState(['latitude', 'longitude', 'cartList']),
		//当前商店购物信息
		shopCart: function() {
			return { ...this.cartList[this.shopId] }
		},
		//购物车中总共商品的数量
		totalNum: function() {
			let num = 0
			this.cartFoodList.forEach(item => {
				num += item.num
			})
			return num
		},
		// 还差多少元起送，<= 0 显示去结算
		minSendPrice: function() {
			// 起送费 - 总价
			return this.shopDetail.float_minimum_order_amount - this.totalPrice
		},
		shopNotice: function() {
			return this.shopDetail.promotion_info || '欢迎！祝您用餐愉快。'
		},
	},
	mixins: [getImgPath],
	methods: {
		...mapMutations(['ADD_CART', 'REDUCE_CART', 'INIT_BUYCART', 'CLEAR_CART', 'RECORD_SHOP_DETAIL']),
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
					this.RECORD_SHOP_DETAIL(res.data)
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
		// 展示food商品规格
		showGoodsSpec(food) {
			if (food) {
				this.choosedFoods = food
			}
			this.showSpec = !this.showSpec
			this.choosedFoodsSpecIndex = 0
		},
		// 记录当前所选规格的索引值
		chooseGoodsSpecIndex(index) {
			this.choosedFoodsSpecIndex = index
		},
		// 多规格商品加入购物车
		addSpecsCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
			this.ADD_CART({
				shopid: this.shopId,
				category_id,
				item_id,
				food_id,
				name,
				price,
				specs,
				packing_fee,
				sku_id,
				stock,
			})
			this.showGoodsSpec()
		},
		//加入购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
		addToCart(category_id, item_id, food_id, name, price, specs) {
			this.ADD_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs })
		},
		//移出购物车，所需7个参数，商铺id，食品分类id，食品id，食品规格id，食品名字，食品价格，食品规格
		removeOutCart(category_id, item_id, food_id, name, price, specs) {
			this.REDUCE_CART({ shopid: this.shopId, category_id, item_id, food_id, name, price, specs })
		},
		// 确认下单
		checkCart() {
			this.$router.push({ path: 'confirmOrder', query: { shopId: this.shopId, geohash: this.geohash } })
		},
		clearCart() {
			this.CLEAR_CART(this.shopId)
		},
		/**
		 * 初始化和shopCart变化时，重新获取购物车改变过的数据，赋值 categoryNum，totalPrice，cartFoodList，整个数据流是自上而下的形式，所有的购物车数据都交给vuex统一管理，包括购物车组件中自身的商品数量，使整个数据流更加清晰
		 */
		initCategoryNum() {
			let newArr = []
			let cartFoodNum = 0
			this.totalPrice = 0
			this.cartFoodList = []
			this.menuList.forEach((item, index) => {
				if (this.shopCart && this.shopCart[item.foods[0].category_id]) {
					let num = 0
					Object.keys(this.shopCart[item.foods[0].category_id]).forEach(itemid => {
						Object.keys(this.shopCart[item.foods[0].category_id][itemid]).forEach(foodid => {
							let foodItem = this.shopCart[item.foods[0].category_id][itemid][foodid]
							num += foodItem.num
							if (item.type == 1) {
								this.totalPrice += foodItem.num * foodItem.price
								if (foodItem.num > 0) {
									this.cartFoodList[cartFoodNum] = {}
									this.cartFoodList[cartFoodNum].category_id = item.foods[0].category_id
									this.cartFoodList[cartFoodNum].item_id = itemid
									this.cartFoodList[cartFoodNum].food_id = foodid
									this.cartFoodList[cartFoodNum].num = foodItem.num
									this.cartFoodList[cartFoodNum].price = foodItem.price
									this.cartFoodList[cartFoodNum].name = foodItem.name
									this.cartFoodList[cartFoodNum].specs = foodItem.specs
									cartFoodNum++
								}
							}
						})
					})
					newArr[index] = num
				} else {
					newArr[index] = 0
				}
			})
			this.totalPrice = this.totalPrice.toFixed(2)
			this.categoryNum = [...newArr]
		},
		// 点击底部cart，弹出与隐藏cart_list_container
		toggleCart() {
			this.toggleCartShow = !this.toggleCartShow
		},
		// 控制小球
		showMoveBall() {},
		goback() {
			this.$router.go(-1)
		},
	},
	watch: {
		// 购物车信息发生变化，重新计算购物车信息
		shopCart: function(value) {
			this.initCategoryNum()
		},
		// menuList变化时，说明是刷新页面或者重新进入页面
		menuList: function(value) {
			this.initCategoryNum()
		},
	},
	components: {
		RatingStar,
		BuyCart,
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
			.goback {
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
			position: relative;
			display: flex;
			align-items: center;
			border-left: 0.13rem solid #f5f5f5;
			border-bottom: 0.01rem solid#ededed;
			padding: 1rem 0.15rem;
			text-align: center;
			@include sc(0.6rem, #666);
			&.left_nav_active {
				position: relative;
				background: #fff;
				border-left-color: #3190e8;
			}
			.nav_img {
				@include wh(0.7rem, 0.7rem);
				margin-right: 0.2rem;
			}
			.nav_num {
				position: absolute;
				top: 0.25rem;
				right: 0.25rem;
				@include sc(0.5rem, #ffff);
				@include borderRadius(50%);
				@include wh(0.6rem, 0.6rem);
				line-height: 0.7rem;
				text-align: center;
				background-color: #ff461d;
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
			}
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
			}
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
.goods_spec_container {
	.specs_cover {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 17;
	}
	.specs_list {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		background-color: #fff;
		z-index: 18;
		border: 1px;
		border-radius: 0.2rem;
		.specs_list_header {
			h4 {
				@include sc(0.7rem, #222);
				font-weight: normal;
				text-align: center;
				padding: 0.5rem;
			}
			.specs_cancel {
				position: absolute;
				right: 0.5rem;
				top: 0.5rem;
			}
		}
		.specs_details {
			padding: 0.5rem;
			.specs_details_title {
				@include sc(0.6rem, #666);
			}
			ul {
				display: flex;
				flex-wrap: wrap;
				padding: 0.4rem 0;
				li {
					font-size: 0.6rem;
					padding: 0.3rem 0.5rem;
					border: 0.025rem solid #ddd;
					border-radius: 0.2rem;
					margin-right: 0.5rem;
					margin-bottom: 0.2rem;
				}
				.specs_activity {
					border-color: #3199e8;
					color: #3199e8;
				}
			}
		}
		.specs_footer {
			@include fj;
			align-items: center;
			background-color: #f9f9f9;
			padding: 0.5rem;
			border: 1px;
			border-bottom-left-radius: 0.2rem;
			border-bottom-right-radius: 0.2rem;
			.specs_price {
				span {
					color: #ff6000;
				}
				span:nth-of-type(1) {
					font-size: 0.5rem;
				}
				span:nth-of-type(2) {
					font-size: 0.8rem;
					font-weight: bold;
					font-family: Helvetica Neue, Tahoma;
				}
			}
			.specs_addto_cart {
				@include wh(4rem, 1.3rem);
				background-color: #3199e8;
				border: 1px;
				border-radius: 0.15rem;
				@include sc(0.6rem, #fff);
				text-align: center;
				line-height: 1.3rem;
			}
		}
	}
}
.toggle_cart_container {
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 2rem;
	background-color: #fff;
	z-index: 12;
	.cart_header {
		@include fj;
		align-items: center;
		background-color: #eceff1;
		padding: 0.3rem 0.2rem;
		h4 {
			@include sc(0.8rem, #666);
		}
		.clear_icon {
			@include wh(0.6rem, 0.6rem);
		}
		.clear_all {
			@include sc(0.6rem, #666);
			vertical-align: middle;
		}
	}
	.cart_list {
		@include fj;
		align-items: center;
		padding: 0.6rem 0.3rem;
		.cart_desc {
			display: flex;
			flex-direction: column;
			span:nth-of-type(1) {
				@include sc(0.8rem, #666);
			}
			span:nth-of-type(2) {
				@include sc(0.6rem, #999);
			}
		}
		.cart_price {
			@include sc(0.7rem, #f60);
		}
		.cart_control {
			display: flex;
			align-items: center;
			.reduce {
				svg {
					@include wh(0.9rem, 0.9rem);
					fill: #3190e8;
				}
			}
			.num {
				@include sc(0.6rem, #999);
				text-align: center;
				min-width: 1rem;
			}
			.add {
				svg {
					@include wh(0.9rem, 0.9rem);
					fill: #3190e8;
				}
			}
		}
	}
}
.cart_list_container {
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
		.cart {
			display: flex;
			position: absolute;
			bottom: 0.7rem;
			left: 0.9rem;
			padding: 0.4rem;
			background-color: #3d3d3f;
			border: 0.2rem solid #444;
			box-shadow: 0 0 0.2rem #444;
			@include borderRadius(50%);
			&.bg_color {
				background-color: #3190e8;
			}
			.num {
				position: absolute;
				top: -0.25rem;
				right: -0.25rem;
				@include sc(0.5rem, #ffff);
				@include borderRadius(50%);
				@include wh(0.6rem, 0.6rem);
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
		.cart_num_sum {
			@include sc(0.9rem, #fff);
		}
		.cart_num_send {
			@include sc(0.5rem, #fff);
		}
	}
	.cart_sum {
		flex: 1;
		height: 100%;
		align-items: center;
		text-align: center;
		background-color: #626263;
		span {
			@include sc(0.6rem, #fff);
		}
		.spec {
			font-size: 0.8rem;
			line-height: 2rem;
		}
		&.active {
			background-color: #4cd964;
		}
	}
}
.shop_cart_cover {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.3);
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