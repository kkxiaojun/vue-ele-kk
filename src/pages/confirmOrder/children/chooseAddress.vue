<template>
  <div class="choose-address">
    <head-top head-title="选择地址" :go-back="true" :sign-up="true"></head-top>
		<router-link to="/confirmOrder/chooseAddress/addAddress" class="add_icon_footer" >
			<img src="../../../images/add_address.png" height="24" width="24">
			<span>新增收货地址</span>
		</router-link>
		<ul class="address_list">
			<li class="delivery_address delivery_container" v-for="(item, index) in deliverable" :key="index" @click.prevent.stop="chooseAddress(item, index)">
				<svg class="choosed_address" :class="{default_address: defaultIndex == index}">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
				</svg>
				<div class="choose_addr">
					<p class="person_desc">
						<span class="person_desc_name">{{item.name}}</span>
						<span class="person_desc_sex">{{item.sex == 1? '先生' : '女士'}}</span>
						<span class="person_desc_phone">{{item.phone}}</span>
					</p>
					<p class="person_desc">
						<span class="person_desc_tag" v-if="item.tag" :style="{backgroundColor: iconColor(item.tag)}">{{item.tag}}</span>
						<span class="person_desc_no">{{item.address_detail}}</span>
					</p>
				</div>
			</li>
		</ul>
		<section>
		<ul class="address_list" v-if="deliverdisable.length">
			<li class="delivery_address delivery_container" v-for="(item, index) in deliverdisable" :key="index">
				<svg class="choosed_address">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
				</svg>
				<div class="choose_addr">
					<p class="person_desc">
						<span class="person_desc_name">{{item.name}}</span>
						<span class="person_desc_sex">{{item.sex == 1? '先生' : '女士'}}</span>
						<span class="person_desc_phone">{{item.phone}}</span>
					</p>
					<p class="person_desc">
						<span class="person_desc_tag" v-if="item.tag" :style="{backgroundColor: '#ccc', color: '#fff'}">{{item.tag}}</span>
						<span class="person_desc_no">{{address_detail}}</span>
					</p>
				</div>
			</li>
		</ul>
		</section>
		<alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
		<router-view></router-view>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import AlertTip from 'components/common/alertTip'
import { mapState, mapMutations } from 'vuex'
import { getAddressList } from 'api/index'
import { checkCode } from 'common/js/util'
export default {
	data() {
		return {
			id: null,
			sig: null,
			addressList: [], // 地址列表
			deliverable: [], //有效地址列表
			deliverdisable: [], //无效地址列表
			showAlert: false,
			alertText: null,
		}
	},
	created() {
		let query = this.$route.query
		this.id = query.id
		this.sig = query.sig
	},
	mounted() {

	},
	computed: {
		...mapState(['userInfo', 'newAddress', 'addressIndex']),
		defaultIndex() {
			if (this.addressIndex) {
				return this.addressIndex
			} else {
				return 0
			}
		},
	},
	methods: {
		...mapMutations(['CHOOSE_ADDRESS']),
		initData: function() {
			this.addressList = [];
			this.deliverable = [];
			this.deliverdisable = [];
			if (this.userInfo && this.userInfo.user_id) {
				getAddressList(this.userInfo.user_id)
					.then(res => {
						if (checkCode(res.status)) {
							this.addressList = res.data
							//将当前所有地址访问有效无效两种
							this.addressList.forEach(item => {
								if (item.is_deliverable) {
									this.deliverable.push(item);
								}else{
									this.deliverdisable.push(item);
								}
							})
						}
					})
			}
		},
		chooseAddress(address, index) {
			this.CHOOSE_ADDRESS({address, index})
			// 成功后返回上一页面
			this.$router.go(-1)
		},
		iconColor(name){
			switch(name){
				case '公司': return '#4cd964';
				case '学校': return '#3190e8';
			}
		},
	},
	watch: {
		userInfo: function (value) {
			if (value && value.user_id) {
				this.initData()
			}
		},
	},
	components: {
		HeadTop,
		AlertTip,
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
	.default_address {
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
.add_icon_footer {
	position: absolute;
	left: 0;
	right: 0;
	bottom: 1rem;
	z-index: 101;
	text-align: center;
	img,
	span {
		@include sc(0.8rem, $blue);
		vertical-align: middle;
	}
}
</style>


