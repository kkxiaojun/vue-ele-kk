<template>
  <div class="confirm-order">
    <head-top head-title="确认订单" :go-back="true" :sign-up="false"></head-top>
    <router-link to="/confirmOrder/chooseAddress" class="delivery_address delivery_container">
      <svg class="location_icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#location"></use>
      </svg>
      <div class="choose_addr_null" v-if="!choosedAddress">请选择一个收货地址</div>
      <div class="choose_addr" v-else>
        <p class="person_desc">
          <span class="person_desc_name">zhaoguojun</span>
          <span class="person_desc_sex">先生</span>
          <span class="person_desc_phone">13415454545</span>
        </p>
        <p class="person_desc">
          <span class="person_desc_tag">无</span>
          <span class="person_desc_no">2819</span>
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
          <span>12:00</span>
        </p>
        <span class="bird_send">蜂鸟专送</span>
      </div>
    </section>
    <section class="delivery_payway delivery_container">
      <div class="pay_way">
        <div class="pay_way_desc">支付方式</div>
        <div>
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
      <header class="food_head">
        <img src="" alt="1">
        <span>效果演示</span>
      </header>
      <ul class="food_list">
        <li class="food_list_li food_container">
          <p>dd</p>
          <div>
            <span class="spec">x 1</span>
            <span>¥20</span>
          </div>
        </li>
        <div class="food_list_li food_container">
          <span>餐盒</span>
          <span>¥ 20</span>
        </div>
        <div class="food_list_li food_container">
          <p>配送费</p>
          <span>¥ 4</span>
        </div>
        <div class="food_list_li food_container">
          <p>订单¥130</p>
          <div>
            <p class="spec">代支付</p>
            <p class="spec">¥49</p>
          </div>
        </div>
      </ul>
    </section>
    <section class="delivery_payway delivery_container mb">
      <div class="pay_way">
        <div class="pay_way_desc">订单备注</div>
        <div>
          <span>少辣</span>
          <svg class="choose_pay_way">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </div>
      <div class="pay_way">
        <div class="pay_way_desc">订单备注</div>
        <div>
          <span>少辣</span>
          <svg class="choose_pay_way">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </div>
      </div>
    </section>
    <footer class="delivery_pay">
      <p>待支付 ¥20</p>
      <p>确认下单</p>
    </footer>
    <router-view></router-view>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
export default {
	data() {
		return {
			choosedAddress: true,
		}
	},
	methods: {},
	components: {
		HeadTop,
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
		padding: 1rem 0;
		img {
			@include wh(1rem, 1rem);
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
</style>


