<template>
  <div class="choose-address">
    <head-top head-title="选择地址" :go-back="true" :sign-up="true"></head-top>
		<router-link to="/confirmOrder/chooseAddress/addAddress" class="add_icon_footer" >
			<img src="../../../images/add_address.png" height="24" width="24">
			<span>新增收货地址</span>
		</router-link>
		<ul class="address_list">
			<li class="delivery_address delivery_container">
				<svg class="choosed_address" :class="{default_address: true}">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
				</svg>
				<div class="choose_addr">
					<p class="person_desc">
						<span class="person_desc_name">1</span>
						<span class="person_desc_sex">女士</span>
						<span class="person_desc_phone">134</span>
					</p>
					<p class="person_desc">
						<span class="person_desc_tag">无</span>
						<span class="person_desc_no">xio</span>
					</p>
				</div>
			</li>
		</ul>
		<router-view></router-view>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
export default {
	data() {
		return {
			id: null,
			sig: null,
			addressList: [], // 地址列表
		}
	},
	created() {
		let query = this.$route.query
		this.id = query.id
		this.sig = query.sig
	},
	components: {
		HeadTop,
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.choose-address {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	z-index: 101;
	padding-top: 1.95rem;
}
.delivery_address {
	@include fj;
	align-items: center;
	padding: 0.5rem 1rem;
	background-color: #fff;
	border-bottom: 0.03rem solid $bc; 
	.choosed_address {
		@include wh(0.8rem, 0.8rem);
		margin-right: 0.4rem;
		fill: #ccc;
	}
	.default_address{
		fill: #4cd964;
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
}
.add_icon_footer{
	position: absolute;
	left: 0;
	right: 0;
	bottom: 1rem;
	z-index: 101;
	text-align: center;
	img,span{
		@include sc(0.8rem, $blue);
		vertical-align: middle;
	}
}
</style>


