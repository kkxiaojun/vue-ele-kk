<template>
  <div class="msite">
    <div class="msite_content">
      <head-top :sign-up="false" :go-back="false">
        <router-link to="/search" class="msite_search" slot="search">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none" />
            <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2" />
          </svg>
        </router-link>
        <router-link to="/home" class="msite_title" :title="msiteTitle" slot="msiteTitle">
          <span class="text ellipsis">{{msiteTitle}}</span>
        </router-link>
      </head-top>
      <section class="nav_swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide food_type" v-for="(item, index) in foodTypes" :key="index">
              <router-link :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="food_list">
                <figure>
                  <img :src="imgBaseUrl + foodItem.image_url">
                  <figcaption>{{foodItem.title}}</figcaption>
                </figure>
              </router-link>
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
        </div>
      </section>
      <section class="shop_list_wrap">
        <header class="shop_title">
          <svg class="title_icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
          </svg>
          <span class="title_txt">附近商家</span>
        </header>
        <shop-list v-if="hasGetGeohash" :geohash="geohash"></shop-list>
      </section>
    </div>
    <foot-nav></foot-nav>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import ShopList from 'components/common/shopList'
import FootNav from 'components/footer/footer'
import { getCity, getPosByGeohash, getFoodType } from 'api/index'
import { mapMutations } from 'vuex'
import { checkCode } from 'common/js/util'
import '@/plugins/swiper/swiper.min.js'
import '@/plugins/swiper/swiper.min.css'
export default {
	data() {
		return {
			imgBaseUrl: 'https://fuss10.elemecdn.com/', // pic地址
			msiteTitle: '请选择地址...', // 中间的title
			geohash: '', // city页面传递过来的地址
			hasGetGeohash: false, // geohash获取成功之后再获取商铺列表信息
			foodTypes: [], // 商品类型
			shopList: [], // 所有商品
		}
	},
	beforeMount() {
		let routers = this.$route.query.geohash
		if (!routers) {
			getCity('guess', res => {
				if (checkCode(res.status)) {
					this.geohash = res.data.latitude + ',' + res.data.longitude
				}
			})
		} else {
			this.geohash = routers
		}
		//保存geohash 到vuex
		this.SAVE_GEOHASH(this.geohash)
		// 根据geohash获取定位信息
		getPosByGeohash(this.geohash, res => {
			if (checkCode(res.status)) {
				this.msiteTitle = res.data.name
				this.hasGetGeohash = true
				// 记录当前经度纬度
				this.RECORD_ADDRESS(res.data)
			}
		})
	},
	created() {
		// 获取swiper物品导航
		getFoodType()
			.then(res => {
				if (checkCode(res.status)) {
					// 将foodTypes转换为二维数组，为了让每个swiper-slide显示8个
					let foodLen = res.data.length
					let foodArr = []
					for (let i = 0, j = 0; i < foodLen, j < foodLen / 8; i += 8, j++) {
						foodArr[j] = res.data.slice(i, i + 8)
					}
					this.foodTypes = foodArr
				}
			})
			.then(() => {
				new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					loop: true,
				})
			})
	},
	methods: {
		...mapMutations(['SAVE_GEOHASH', 'RECORD_ADDRESS']),
		// 解码url地址，求restaurant_category_id值
		getCategoryId(url) {
			let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
			if (/restaurant_category_id/gi.test(urlData)) {
				return JSON.parse(urlData).restaurant_category_id.id
			} else {
				return ''
			}
		},
	},
	components: {
		HeadTop,
		ShopList,
		FootNav,
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
.msite {
	padding-top: 2rem;
	.msite_search {
		left: 0.5rem;
		@include ct;
		@include wh(0.75rem, 1rem);
	}
	.msite_title {
		@include center;
		width: 60%;
		text-align: center;
		.text {
			@include sc(0.7rem, #fff);
			display: inline-block;
			width: 100%;
		}
	}
	.nav_swiper {
		height: 10rem;
		background: #fff;
		border-bottom: 1px solid $bc;
		.swiper-container {
			@include wh(100%, auto);
			padding-bottom: 1.6rem;
			.food_type {
				@include fj(center);
				flex-wrap: wrap;
				.food_list {
					width: 25%;
					padding: 0.55rem 0;
					figure {
						text-align: center;
						img {
							@include wh(2rem, 2rem);
						}
						figcaption {
							@include sc(0.7rem, #666);
						}
					}
				}
			}
		}
		.swiper-pagination {
			bottom: 0.6rem;
		}
	}
	.shop_list_wrap {
		margin-top: 0.6rem;
		padding-bottom: 1.95rem;
		background-color: #fff;
	}
}
</style>


