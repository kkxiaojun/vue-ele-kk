<template>
  <div class="food">
    <head-top :head-title="headTitle" :go-back="true" :sign-up="true">
    </head-top>
    <!-- 选择 -->
    <section class="sort_container">
      <!-- food -->
      <div class="sort_item" :class="{'choose_type': orderTab == 'food'}">
        <div class="sort_title" @click="chooseType('food')">
          <div class="sort_title_border">
            <span class="title_txt" :class="{'choose_type':orderTab == 'food'}">{{navTitle}}</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist" v-show="category">
          <div class="sort_content" v-show="orderTab == 'food'">
            <ul class="content_nav">
              <li class="content_nav_li" v-for="(item, index) in category" :key="index" :class="{'content_nav_li_active': item.id == restaurant_category_id}" @click="changeCategory(item, index)">
                <div class="all_shop">
                  <img v-if="index" :src="getImgPath(item.image_url)">
                  <span class="title">{{item.name}}</span>
                </div>
                <div class="all_shop_detail">
                  <span class="num">{{item.count}}</span>
                  <svg v-if="index" data-v-6cc1fce6="" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow">
                    <path data-v-6cc1fce6="" d="M0 0 L6 4 L0 8" stroke="#bbb" stroke-width="1" fill="none"></path>
                  </svg>
                </div>
              </li>
            </ul>
            <div class="content_right">
              <ul class="content_right_ul">
                <li class="content_right_li" v-for="(detail, index) in categoryChild" :key="index" @click="getFoodList(detail.name, detail.id)">
                  <span class="left_txt">{{detail.name}}</span>
                  <span class="right_num">{{detail.count}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <!-- 排序 -->
      <div class="sort_item" :class="{'choose_type': orderTab == 'sort'}">
        <div class="sort_title" @click="chooseType('sort')">
          <div class="sort_title_border">
            <span class="title_txt">排序</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <div class="sort_content sort_by_type" v-show="orderTab == 'sort'">
            <ul class="sort_list_container" @click="chooseSortType($event)">
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                </svg>
                <p data="0" :class="{sort_select: sortByType == 0}">
                  <span>智能排序</span>
                  <svg v-if="sortByType == 0">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                </svg>
                <p data="5" :class="{sort_select: sortByType == 5}">
                  <span>距离最近</span>
                  <svg v-if="sortByType == 5">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                </svg>
                <p data="6" :class="{sort_select: sortByType == 6}">
                  <span>销量最高</span>
                  <svg v-if="sortByType == 6">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                </svg>
                <p data="1" :class="{sort_select: sortByType == 1}">
                  <span>起送价最低</span>
                  <svg v-if="sortByType == 1">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                </svg>
                <p data="2" :class="{sort_select: sortByType == 2}">
                  <span>配送速度最快</span>
                  <svg v-if="sortByType == 2">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
              <li class="sort_list_li">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                </svg>
                <p data="3" :class="{sort_select: sortByType == 3}">
                  <span>评分最高</span>
                  <svg v-if="sortByType == 3">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                  </svg>
                </p>
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <!-- 筛选 -->
      <div class="sort_item" :class="{'choose_type': orderTab == 'filter'}">
        <div class="sort_title" @click="chooseType('filter')">
          <div class="sort_title_border">
            <span class="title_txt">筛选</span>
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8" />
            </svg>
          </div>
        </div>
        <transition name="showlist">
          <div class="sort_content sort_by_type" v-show="orderTab == 'filter'">
            <div class="filter_container">
              <section class="filter_item">
                <header>
                  配送方式
                </header>
                <ul class="filter_ul">
                  <li class="filter_li" v-for="(item, index) in Delivery" :key="index" @click="selectDeliveryMode(item.id)">
                    <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
                    </svg>
                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                  </li>
                </ul>
              </section>
              <section class="filter_item">
                <header>商家属性（可多选）</header>
                <ul class="filter_ul">
                  <li class="filter_li" v-for="(item, index) in Activity" :key="index" @click="selectSupportIds(index, item.id)">
                    <svg v-show="support_ids[index].status" class="activity_svg">
                      <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                    </svg>
                    <span class="filter_icon" :style="{color: '#' + item.icon_color, borderColor: '#' + item.icon_color}" v-show="!support_ids[index].status">{{item.icon_name}}</span>
                    <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>
                  </li>
                </ul>
              </section>
              <footer class="confirm_filter">
                <div class="clear_all filter_button_style" @click="clearSelect">清空</div>
                <div class="confirm_select filter_button_style" @click="confirmSelectFun">确定
                  <span v-show="filterNum">({{filterNum}})</span>
                </div>
              </footer>
            </div>
          </div>
        </transition>
      </div>
    </section>
    <!-- 透明框 -->
    <transition name="showcover">
      <div class="back_cover" v-show="orderTab"></div>
    </transition>
    <!-- shoplist -->
    <section class="shop_list_wrap">
      <shop-list :geohash="geohash" :restaurant-category-id="restaurant_category_id" :restaurant-category-ids="restaurant_category_ids" :sort-by-type="sortByType" :delivery-mode="delivery_mode" :support-ids="support_ids" :confirm-select="confirmStatus" v-if="latitude"></shop-list>
    </section>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import ShopList from 'components/common/shopList'
import { getPosByGeohash, getFoodCategory, getFoodDelivery, getFoodActivity } from 'api/index'
import { checkCode } from 'common/js/util'
import { getImgPath } from 'common/js/mixin'
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			headTitle: '', // msite title
			navTitle: '', // tab的title
			geohash: '', // 经纬度合集
			orderTab: '', // 选择筛选的tab
			restaurant_category_id: '', // 食品类型id值
			restaurant_category_ids: '', // 食品分类id值
			category: [], // food分类数据
			categoryChild: [], // 选择后右侧的子数据
			sortByType: '', // 排序方式
			Delivery: '', // 配送方式
			delivery_mode: '', // 选中的配送方式
			Activity: '', // 商家活动列表
			support_ids: [], // 选中的商铺活动列表
			filterNum: 0, // 所选中的所有样式的集合
			confirmStatus: false, // 确认按钮
		}
	},
	created() {
		this.initData()
	},
	computed: {
		...mapState(['latitude', 'longitude']),
	},
	mixins: [getImgPath],
	methods: {
		...mapMutations(['RECORD_ADDRESS']),
		initData: function() {
			//获取从msite页面传递过来的参数
			let query = this.$route.query
			this.geohash = query.geohash
			this.headTitle = query.title
			this.navTitle = this.headTitle
			this.restaurant_category_id = query.restaurant_category_id
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
			//获取category分类左侧数据
			getFoodCategory({ latitude: this.latitude, longitude: this.longitude }, res => {
				if (checkCode(res.status)) {
					this.category = res.data
					//初始化时定位当前category分类左侧默认选择项，在右侧展示出其sub_categories列表
					this.category.forEach(item => {
						if (this.restaurant_category_id == item.id) {
							this.categoryChild = item.sub_categories
						}
					})
				}
			})
			// 获取筛选列表的配送方式
			getFoodDelivery(this.latitude, this.longitude, res => {
				if (checkCode(res.status)) {
					this.Delivery = res.data
				}
			})
			//获取筛选列表的商铺活动
			getFoodActivity(this.latitude, this.longitude, res => {
				if (checkCode(res.status)) {
					this.Activity = res.data
					// 记录support_ids的状态，默认不选中，点击状态取反，status为true时为选中状态
					this.Activity.forEach((item, index) => {
						this.support_ids[index] = { status: false, id: item.id }
					})
				}
			})
		},
		// 切换头部的3个tab
		chooseType(type) {
			if (this.orderTab !== type) {
				this.orderTab = type
				//food选项中头部标题发生改变，需要特殊处理
				if (type == 'food') {
					this.navTitle = '分类'
				} else {
					//将foodTitle 和 headTitle 进行同步
					this.navTitle = this.headTitle
				}
			} else {
				//再次点击相同选项时收回列表
				this.orderTab = ''
				if (type == 'food') {
					//将foodTitle 和 headTitle 进行同步
					this.navTitle = this.headTitle
				}
			}
		},
		// food change
		changeCategory(item, index) {
			//第一个选项 -- 默认获取选所有数据
			if (index === 0) {
				this.restaurant_category_ids = null
				this.orderTab = ''
				//不是第一个选项时，右侧展示其子级sub_categories的列表
			} else {
				this.restaurant_category_id = item.id
				this.categoryChild = this.category[index].sub_categories
			}
		},
		// 根据选择的food，返回shoplist列表
		getFoodList(name, id) {
			this.restaurant_category_ids = id
			this.orderTab = ''
			this.foodTitle = this.headTitle = name
		},
		// 选择排序方式
		chooseSortType(event) {
			//点击某个排序方式，获取事件对象的data值，并根据获取的值重新获取数据渲染
			let node
			// 如果点击的是 span 中的文字，则需要获取到 span 的父标签 p
			if (event.target.nodeName.toUpperCase() !== 'P') {
				node = event.target.parentNode
			} else {
				node = event.target
			}
			this.sortByType = node.getAttribute('data')
			this.orderTab = ''
		},
		//筛选选项中的配送方式选择
		selectDeliveryMode(id) {
			//delivery_mode为空时，选中当前项，并且filterNum加一
			if (this.delivery_mode == null) {
				this.filterNum++
				this.delivery_mode = id
				//delivery_mode为当前已有值时，清空所选项，并且filterNum减一
			} else if (this.delivery_mode == id) {
				this.filterNum--
				this.delivery_mode = null
				//delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
			} else {
				this.delivery_mode = id
			}
		},
		//点击商家活动，状态取反
		selectSupportIds(index, id) {
			//数组替换新的值
			this.support_ids.splice(index, 1, {
				status: !this.support_ids[index].status,
				id,
			})
			//重新计算filterNum的个数
			this.filterNum = this.delivery_mode == null ? 0 : 1
			this.support_ids.forEach(item => {
				if (item.status) {
					this.filterNum++
				}
			})
		},
		//只有点击清空按钮才清空数据，否则一直保持原有状态
		clearSelect() {
			this.support_ids.map(item => (item.status = false))
			this.filterNum = 0
			this.delivery_mode = null
		},
		//点击确认时，将需要筛选的id值传递给子组件，并且收回列表
		confirmSelectFun() {
			//状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
			this.confirmStatus = !this.confirmStatus
			this.orderTab = ''
		},
	},
	components: {
		HeadTop,
		ShopList,
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.food {
	.sort_container {
		position: fixed;
		top: 1.95rem;
		right: 0;
		width: 100%;
		display: flex;
		z-index: 11;
		@include fj(center);
		background-color: #fff;
		.sort_item {
			width: 33.33%;
			height: 1.6rem;
			line-height: 1.6rem;
			text-align: center;
			@include sc(0.55rem, #333);
			.sort_title {
				position: relative;
				z-index: 15;
				@include wh(100%, 100%);
				line-height: 1.2rem;
				padding-top: 0.25rem;
				background-color: #fff;
				.sort_title_border {
					border-right: 0.015rem solid $bc;
					.sort_icon {
						transition: all 0.3s;
						fill: #666;
					}
				}
			}
			.sort_content {
				position: absolute;
				top: 1.6rem;
				width: 100%;
				display: flex;
				border-top: 0.03rem solid $bc;
				background-color: #fff;
				.content_nav {
					flex: 1;
					height: 16rem;
					overflow-y: auto;
					background-color: #f1f1f1;
					.content_nav_li {
						@include fj;
						padding: 0 0.5rem;
						.all_shop {
							display: flex;
							align-items: center;
							img {
								display: inline-block;
								@include wh(0.8rem, 0.8rem);
								margin-right: 0.25rem;
							}
							.title {
								@include sc(0.5rem, #666);
							}
						}
						.all_shop_detail {
							.num {
								@include sc(0.4rem, #fff);
								background-color: #ccc;
								@include borderRadius(0.3rem);
								padding: 0 0.2rem;
							}
						}
						&.content_nav_li_active {
							background-color: #fff;
						}
					}
				}
				.content_right {
					flex: 1;
					height: 16rem;
					overflow-y: auto;
					.content_right_ul {
						padding: 0 0.5rem;
					}
					.content_right_li {
						@include fj;
						border-bottom: 0.015rem solid #e4e4e4;
						&:last-child {
							border-bottom: none;
						}
						.left_txt,
						.right_num {
							color: #666;
						}
					}
				}
			}
			.sort_list_container {
				width: 100%;
				.sort_list_li {
					height: 2.5rem;
					display: flex;
					align-items: center;
					svg {
						@include wh(0.7rem, 0.7rem);
						margin: 0 0.3rem 0 0.8rem;
					}
					p {
						line-height: 2.5rem;
						flex: auto;
						text-align: left;
						text-indent: 0.25rem;
						border-bottom: 0.025rem solid $bc;
						@include fj;
						align-items: center;
						span {
							color: #666;
						}
					}
					.sort_select {
						span {
							color: $blue;
						}
					}
				}
			}
			.filter_container {
				width: 100%;
				height: 14rem;
				text-align: left;
				line-height: 1.2rem;
				.filter_item {
					padding: 0 0.5rem;
					header {
						height: 1.5rem;
						line-height: 1.5rem;
					}
					.filter_ul {
						display: flex;
						flex-wrap: wrap;
						line-height: 1rem;
						.filter_li {
							display: flex;
							align-items: center;
							@include wh(4.6rem, 1.5rem);
							margin: 0 0.3rem 0.3rem 0;
							padding-left: 0.3rem;
							border: 0.03rem solid $bc;
							@include borderRadius(0.15rem);
							svg {
								width: 0.8rem;
								height: 0.8rem;
							}
							span {
								padding-right: 0.3rem;
							}
							.selected_filter {
								color: $blue;
							}
						}
					}
				}
				.confirm_filter {
					display: flex;
					background-color: #f1f1f1;
					width: 100%;
					padding: 0.3rem 0.5rem;
					text-align: center;
					.filter_button_style {
						@include wh(50%, 1.8rem);
						font-size: 0.8rem;
						line-height: 1.8rem;
						border-radius: 0.2rem;
					}
					.clear_all {
						background-color: #fff;
						margin-right: 0.5rem;
						border: 0.025rem solid #fff;
					}
					.confirm_select {
						background-color: #56d176;
						color: #fff;
						border: 0.025rem solid #56d176;
						span {
							color: #fff;
						}
					}
				}
			}
			.showlist-enter-active,
			.showlist-leave-active {
				transition: all 0.3s;
				transform: translateY(0);
			}
			.showlist-enter,
			.showlist-leave-active {
				opacity: 0;
				transform: translateY(-100%);
			}
		}
		.choose_type {
			.sort_title {
				span {
					color: $blue;
				}
			}
			.sort_icon {
				transition: all 0.3s;
				transform: rotate(180deg);
				fill: $blue;
			}
		}
		.sort_by_type {
			left: 0;
		}
	}
	.shop_list_wrap {
		margin-top: 3.6rem;
		background-color: #fff;
	}
	.showcover-enter-active,
	.showcover-leave-active {
		transition: opacity 0.4s;
	}
	.showcover-enter,
	.showcover-leave-active {
		opacity: 0;
	}
	.back_cover {
		position: fixed;
		@include wh(100%, 100%);
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.3);
	}
}
</style>


