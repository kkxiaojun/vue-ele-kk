<template>
  <div>
    <ul class="shop_list">
      <li class="each_shop" v-for="item in shopList" :key="item.id" @click="goShop(item)">
        <section class="shop_img">
          <img :src="imgBaseUrl + item.image_path">
        </section>
        <section class="shop_right">
          <header class="shop_detail">
            <span class="shop_name ellipsis">{{item.name}}</span>
            <ul class="shop_detail_ul">
              <li class="shop_detail_li" v-for="li in item.supports" :key="li.id">{{li.icon_name}}</li>
            </ul>
          </header>
          <section class="score_num">
            <section class="score_num_left">
              <rating-star :rating="item.rating"></rating-star>
              <span class="num">月售{{item.recent_order_num}}单</span>
            </section>
            <section class="score_num_right">
              <span class="send com_style" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="time com_style">准时</span>
            </section>
          </section>
          <section class="shop_distance">
            <section class="shop_distance_left">
              <span>¥{{item.float_minimum_order_amount}}起送</span>
              <span>/</span>
              <span>{{item.piecewise_agent_fee.tips}}</span>
            </section>
            <section class="shop_distance_right">
              <span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
                <span>/</span>
              </span>
              <span v-else>{{item.distance}}</span>
              <span>/</span>
              <span class="quick">{{item.order_lead_time}}</span>
            </section>
          </section>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
import { getShopList } from 'api/index'
import { mapState } from 'vuex'
import { checkCode } from 'common/js/util'
import RatingStar from 'components/common/ratingStar'
export default {
	data() {
		return {
			imgBaseUrl: '//elm.cangdu.org/img/', // pic地址
			shopList: [], // 商品列表
			offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
		}
	},
	computed: {
		...mapState(['latitude', 'longitude']),
	},
	props: {
		// 经纬度合集
		geohash: {
			type: String,
			required: true,
		},
		// 分类选择列表
		restaurantCategoryId: {
			type: [String, Number],
		},
		// 分类选择列表-> 具体food
		restaurantCategoryIds: {
			type: [String, Number],
		},
		// 排序方式
		sortByType: {
			type: String,
		},
		// 筛选方式
		deliveryMode: {
			type: [Number, String],
		},
		// 选中的商铺活动列表
		supportIds: {
			type: Array,
		},
		// 确认按钮
		confirmSelect: {
			type: Boolean,
		},
	},
	mounted() {
		this.initData()
	},
	methods: {
		initData() {
			// 获取shop列表
			getShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId).then(res => {
				if (checkCode(res.status)) {
					// 引用数据，深复制。考虑到本地模拟数据是引用类型，所以返回一个新的数组
					this.shopList = [...res.data]
				}
			})
		},
		listenCategoryIds() {
			getShopList(
				this.latitude,
				this.longitude,
				this.offset,
				'',
				this.restaurantCategoryIds,
				this.sortByType,
				this.deliveryMode,
				this.supportIds
			).then(res => {
				if (checkCode(res.status)) {
					// 引用数据，深复制。考虑到本地模拟数据是引用类型，所以返回一个新的数组
					this.shopList = [...res.data]
				}
			})
			// let res = await shopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds);
		},
		goShop(item) {
			this.$router.push({ path: 'shop', query: { geohash: this.geohash, id: Number(item.id) } })
		},
	},
	watch: {
		restaurantCategoryIds: function() {
			this.listenCategoryIds()
		},
		sortByType: function() {
			this.listenCategoryIds()
		},
		confirmSelect: function() {
			this.listenCategoryIds()
		},
	},
	components: {
		RatingStar,
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.shop_title {
	display: flex;
	align-items: center;
	padding: 0.5rem 0 0.4rem 0.5rem;
	.title_icon {
		@include wh(0.9rem, 0.9rem);
		fill: #999;
	}
	.title_txt {
		@include sc(0.9rem, #999);
		padding-left: 0.35rem;
	}
}
.shop_list {
	.each_shop {
		display: flex;
		padding: 0.2rem 0.5rem;
		.shop_img {
			padding-right: 0.5rem;
			img {
				display: block;
				@include borderRadius(0.2rem);
				@include wh(3rem, 3rem);
			}
		}
		.shop_right {
			display: flex;
			flex-direction: column;
			flex: auto;
			.shop_detail {
				@include fj;
				align-items: center;
				.shop_name::before {
					content: '品牌';
					display: inline-block;
					font-size: 0.4rem;
					color: #333;
					background-color: #ffd930;
					border-radius: 0.1rem;
					margin-right: 0.2rem;
					padding: 0.08rem;
				}
				.shop_name {
					width: 80%;
					@include sc(0.6rem, #333);
				}
				.shop_detail_ul {
					display: flex;
					.shop_detail_li {
						border: 1px solid #ccc;
						margin-left: 0.07rem;
						@include borderRadius(0.1rem);
						@include sc(0.4rem, #666);
					}
				}
			}
			.shop_distance,
			.score_num {
				margin-top: 0.45rem;
				@include fj;
				@include sc(0.4rem, #999);
			}
			.score_num {
				.score_num_left {
					display: flex;
					.num {
						@include sc(0.4rem, #666);
					}
				}
				.score_num_right {
					font-size: 0.4rem;
					.com_style {
						border: 1px solid $blue;
						@include borderRadius(0.09rem);
					}
					.send {
						color: #fff;
						background: $blue;
					}
					.time {
						color: $blue;
						background: #fff;
					}
				}
			}
			.shop_distance {
				opacity: 0.8;
				.quick {
					color: $blue;
				}
			}
		}
	}
}
</style>

