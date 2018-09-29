<template>
  <div class="confirm-order">
    <head-top head-title="确认订单" :go-back="true" :sign-up="false"></head-top>
	<section v-if="checkoutData">
		<router-link :to="{path:'/confirmOrder/chooseAddress', query: {id: checkoutData.cart.id, sig: checkoutData.sig}}" class="delivery_address delivery_container">
			<svg class="location_icon">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
			</svg>
			<div class="choose_addr_null" v-if="!choosedAddress">请选择一个收货地址</div>
			<div class="choose_addr" v-else>
				<p class="person_desc">
					<span class="person_desc_name">{{choosedAddress.name}}</span>
					<span class="person_desc_sex">{{choosedAddress.sex == 1 ? '先生' : 女士}}</span>
					<span class="person_desc_phone">{{choosedAddress.phone}}</span>
				</p>
				<p class="person_desc">
					<span class="person_desc_tag" v-if="choosedAddress.tag" :style="{backgroundColor: iconColor(choosedAddress.tag)}">{{choosedAddress.tag}}</span>
					<span class="person_desc_no">{{choosedAddress.address_detail}}</span>
				</p>
			</div>
			<svg class="choose_detail_page">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
			</svg>
		</router-link>
		<section class="delivery_time delivery_container">
			<div class="time_tag">送达时间</div>
			<div class="time_desc">
				<p class="bird_detail">
					<span>尽快送达</span>
					<span>|</span>
					<span>预计</span>
					<span>{{checkoutData.delivery_reach_time}}</span>
				</p>
				<span class="bird_send" v-if="checkoutData.cart.is_deliver_by_fengniao">蜂鸟专送</span>
			</div>
		</section>
		<section class="delivery_payway delivery_container">
			<div class="pay_way">
				<div class="pay_way_desc">支付方式</div>
				<div @click="showPayWayFun">
					<span>在线支付</span>
					<svg class="choose_pay_way">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
					</svg>
				</div>
			</div>
			<div class="pay_way">
				<div>红包</div>
				<div>暂时只在饿了么 APP 中支持</div>
			</div>
		</section>
		<section class="delivery_food delivery_container">
			<header class="food_head" v-if="checkoutData.cart.restaurant_info">
				<img :src="imgBaseUrl + checkoutData.cart.restaurant_info.image_path">
				<span>{{checkoutData.cart.restaurant_info.name}}</span>
			</header>
			<ul class="food_list">
				<li class="food_list_li food_container" v-for="item in checkoutData.cart.groups[0]" :key="item.id">
					<p>{{item.name}}</p>
					<div>
						<span class="spec">{{item.quantity}}</span>
						<span>¥{{item.price}}</span>
					</div>
				</li>
				<div class="food_list_li food_container" v-if="checkoutData.cart.extra">
					<span>{{checkoutData.cart.extra[0].name}}</span>
					<span>¥ {{checkoutData.cart.extra[0].price}}</span>
				</div>
				<div class="food_list_li food_container">
					<p>配送费</p>
					<span>¥ {{checkoutData.cart.deliver_amount || 0}}</span>
				</div>
				<div class="food_list_li food_container">
					<p>订单¥ {{checkoutData.cart.total}}</p>
					<div>
						<p class="spec">代支付</p>
						<p class="spec">¥{{checkoutData.cart.total}}</p>
					</div>
				</div>
			</ul>
		</section>
		<section class="delivery_payway delivery_container mb">
			<div class="pay_way">
				<div class="pay_way_desc">订单备注</div>
				<router-link :to='{path: "/confirmOrder/Remarks", query: {id: checkoutData.cart.id, sig: checkoutData.sig}}'>
					<span class="ellipsis">{{remarkText||inputText? remarklist: '口味、偏好等'}}</span>
					<svg class="choose_pay_way">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
					</svg>
				</router-link>
			</div>
			<div class="pay_way">
				<div class="pay_way_desc">发票抬头</div>
				<div>
					<span>{{checkoutData.invoice.status_text}}</span>
					<svg class="choose_pay_way">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
					</svg>
				</div>
			</div>
		</section>
		<footer class="delivery_pay">
			<p>待支付 ¥ {{checkoutData.cart.total}}</p>
			<p @click="confirmOrder">确认下单</p>
		</footer>
		<transition name="fade">
			<section class="choose_payway_cover" v-if="showPayWay" @click="showPayWayFun"></section>
		</transition>
		<transition name="slip-up">
			<section class="choose_payway" v-if="showPayWay">
				<header>支付方式</header>
				<p v-for="item in checkoutData.payments" :key="item.id" :class="{choosed: payWayId == item.id}">
					<span>{{item.name}}<span v-if="!item.is_online_payment">{{item.description}}</span></span>
					<svg class="choosed_pay" @click="choosePayWay(item.is_online_payment, item.id)">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
					</svg>
				</p>
			</section>
		</transition>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
	</section>
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import HeadTop from 'components/header/header'
import AlertTip from 'components/common/alertTip'
import { imgBaseUrl } from 'config/env'
import { checkout, getAddressList, placeOrders } from 'api/index'
import { checkCode } from 'common/js/util'
export default {
	data() {
		return {
			shopId: null, // shop的id标识
			geohash: null, // 定位经纬度
			shopCart: null, // 购物车数据
			imgBaseUrl: null, // img域名
			checkoutData: null, //订单满足条件，返回的数据
			imgBaseUrl,
			showPayWay: false, // 展示付快方式选择
			payWayId: 1, // 付款方式
			showAlert: false,
			alertText: null
		}
	},
	created() {
		let query = this.$route.query
		// 获取上个页面传来的shopId
		this.shopId = query.shopId
		// 获取上个页面传来的geohash
		this.geohash = query.geohash
		// 初始化购物车
		this.INIT_BUYCART()
		// 保存shopId
		this.SAVE_SHOPID(this.shopId)
		// 获取购物车数据
		this.shopCart = this.cartList[this.shopId]
	},
	mounted() {
		if (this.geohash) {
			this.initData()
			this.SAVE_GEOHASH(this.geohash)
		}
	},
	computed: {
		...mapState(['cartList', 'userInfo', 'choosedAddress', 'remarkText', 'inputText']),
		remarklist() {
			let str = new String;
			if (this.remarkText) {
				Object.values(this.remarkText).forEach(item => {
					str += item[1] + '，';
				})
			}
			//是否有自定义备注，分开处理
			if (this.inputText) {
				return str + this.inputText;
			}else{
				return str.substr(0, str.lastIndexOf('，')) ;
			}
		}
	},
	methods: {
		...mapMutations(['INIT_BUYCART', 'SAVE_SHOPID', 'SAVE_GEOHASH', 'SAVE_CART_ID_SIG', 'CHOOSE_ADDRESS', 'SAVE_ORDER_INFO', 'SAVE_ORDER_SUCCESS']),
		initData() {
			let newArr = []
			// 处理购物车数据
			Object.values(this.shopCart).forEach(categoryItem => {
				Object.values(categoryItem).forEach(itemValue => {
					Object.values(itemValue).forEach(item => {
						newArr.push({
							attrs: [],
							extra: {},
							id: item.id,
							name: item.name,
							packing_fee: item.packing_fee,
							price: item.price,
							quantity: item.num,
							sku_id: item.sku_id,
							specs: [item.specs],
							stock: item.stock,
						})
					})
				})
			})
			//检验订单是否满足条件
			checkout(this.geohash, [newArr], this.shopId, res => {
				if (checkCode(res.status)) {
					this.checkoutData = res.data
					// 保存下单的cartid和sig
					this.SAVE_CART_ID_SIG({ cart_id: this.checkoutData.cart.id, sig: this.checkoutData.sig })
					this.initAddress()
				}
			})
		},
		initAddress() {
			if (this.userInfo && this.userInfo.user_id) {
				// 默认选择第一个地址
				getAddressList(this.userInfo.user_id).then(res => {
					if (checkCode(res.status)) {
						let addressRes = res.data
						if (addressRes instanceof Array && addressRes.length) {
							this.CHOOSE_ADDRESS({ address: addressRes[0], index: 0 })
						}
					}
				})
			}
		},
		showPayWayFun() {
			this.showPayWay = !this.showPayWay
		},
		choosePayWay(online, id) {
			if (online) {
				this.showPayWay = !this.showPayWay
				this.payWayId = id
			}
		},
		// 确认下单
		confirmOrder() {
			// 用户未登录时弹出提示框
			if (!this.userInfo && !this.userInfo.user_id) {
				this.showAlert = true;
				this.alertText = '请登录';
				return
			// 用户未选择地址则提示
			}else if(!this.choosedAddress){
				this.showAlert = true;
				this.alertText = '请添加一个收货地址';
				return
			}
			// 保存订单信息
			this.SAVE_ORDER_INFO({
				user_id: this.userInfo.user_id,
				cart_id: this.checkoutData.cart.id,
				address_id: this.choosedAddress.id,
				description: this.remarklist,
				entities: this.checkoutData.cart.groups,
				geohash: this.geohash,
				sig: this.checkoutData.sig,
			});
			// 发送订单信息
			placeOrders(this.userInfo.user_id, this.checkoutData.cart.id, this.choosedAddress.id, this.remarklist, this.checkoutData.cart.groups, this.geohash, this.checkoutData.sig)
				.then(res => {
					if (checkCode(res.status)) {
						this.SAVE_ORDER_SUCCESS(res.data);
						this.$router.push('/confirmOrder/payment');
					}
				})
		},
		iconColor(name) {
			switch (name) {
				case '公司':
					return '#4cd964'
				case '学校':
					return '#3190e8'
			}
		},
	},
	watch: {
		userInfo: function(value) {
			if (value && value.user_id) {
				this.initData()
			}
		},
	},
	components: {
		HeadTop,
		AlertTip
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.confirm-order {
	padding-top: 1.95rem;
	padding-bottom: 2rem;
}
.delivery_container {
	margin-top: 0.5rem;
	padding: 0 1rem;
	background-color: #fff;
}
.delivery_address {
	@include fj;
	align-items: center;
	min-height: 3.4rem;
	padding: 0 1rem;
	background: url(../../images/address_bottom.png) left bottom repeat-x;
	background-color: #fff;
	background-size: auto 0.1rem;
	.location_icon {
		@include wh(0.8rem, 0.8rem);
		margin-right: 0.2rem;
		fill: #3190e8;
	}
	.choose_addr_null {
		@include sc(0.8rem, #999);
	}
	.choose_addr {
		flex: 1;
		@include sc(0.6rem, #999);
		.person_desc {
			.person_desc_name {
				@include sc(0.9rem, #666);
				font-weight: 700;
			}
			.person_desc_tag {
				@include sc(0.5rem, #fff);
				border-radius: 0.15rem;
				background-color: #ff5722;
				height: 0.6rem;
				line-height: 0.6rem;
				padding: 0 0.2rem;
				margin-right: 0.3rem;
			}
		}
	}
	.choose_detail_page {
		@include wh(0.6rem, 0.6rem);
		margin-right: 0.2rem;
		fill: #999;
	}
}
.delivery_time {
	@include fj;
	align-items: center;
	min-height: 4rem;
	border-left: 0.12rem solid#3190e8;
	.time_tag {
		font-size: 0.8rem;
	}
	.time_desc {
		text-align: right;
		.bird_detail {
			span {
				@include sc(0.7rem, #3190e8);
			}
		}
		.bird_send {
			@include sc(0.6rem, #fff);
			background-color: #3190e8;
			border-radius: 0.3rem;
			padding: 0 0.1rem;
		}
	}
}
.delivery_payway {
	&.mb {
		margin-bottom: 0.8rem;
	}
	.pay_way {
		@include fj;
		align-items: center;
		line-height: 2rem;
		@include sc(0.6rem, #999);
		opacity: 0.6;
		.pay_way_desc {
			font-weight: 700;
		}
		a{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 11rem;
		}
	}
	.pay_way:nth-of-type(1) {
		border-bottom: 0.02rem solid $bc;
	}
	.choose_pay_way {
		@include wh(0.5rem, 0.5rem);
		fill: #999;
	}
}
.delivery_food {
	.food_head {
		display: flex;
		align-items: center;
		padding: 1rem 0;
		img {
			@include wh(1rem, 1rem);
			margin-right: 0.2rem;
		}
		span {
			@include sc(0.8rem, #333);
		}
	}
	.food_container {
		@include fj;
	}
	.food_list_li {
		padding: 0.4rem 0;
		@include sc(0.7rem, #666);
		.spec {
			margin-right: 0.5rem;
			color: #ff5722;
		}
	}
}
.delivery_pay {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	@include fj;
	align-items: center;
	height: 2rem;
	background-color: #3d3d3f;
	p {
		@include sc(0.8rem, #fff);
	}
	p:nth-of-type(1) {
		flex: 5;
		padding-left: 1rem;
	}
	p:nth-of-type(2) {
		flex: 2;
		text-align: center;
		height: 100%;
		line-height: 2rem;
		background-color: $confirm;
	}
}
.choose_payway_cover{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(90, 90, 90, 0.5);
}
.choose_payway {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	padding-bottom: 1rem;
	header{
		text-align: center;
		@include sc(0.8rem, #666);
		line-height: 1.8rem;
		background-color: #fafafa;
	}
	p{
		@include fj;
		align-items: center;
		padding: 0.8rem 1rem;
		span{
			@include sc(0.7rem, #ccc);
		}
	}
	.choosed_pay {
		@include wh(0.8rem, 0.8rem);
		margin-right: 0.4rem;
		fill: #ccc;
	}
	.choosed{
		svg{
			fill: #4cd964;
		}
		span{
			color: rgb(54, 52, 52);
		}
	}
}
.slip-up-enter-active, .slip-up-leave-active{
	transition: all .3s;
}
.slip-up-enter, .slip-up-leave-active{
	transform: translateY(100%);
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .3s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}
</style>


