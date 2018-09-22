<template>
  <div class="profile">
    <head-top head-title="我的" :sign-up="true" :go-back="true"></head-top>
    <section class="profile_bar">
      <a href="" class="link">
        <img :src="avatar" />
        <div class="number">
          <p class="username">{{username}}</p>
          <p class="msg">
            <span class="phone_icon">
              <svg class="icon-mobile" fill="#fff">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
              </svg>
            </span>
            <span class="phone_no">{{phone}}</span>
            <!-- <span class="phone_num"></span> -->
          </p>
        </div>
        <span data-v-0fc4ab7a="" class="arrow">
          <svg data-v-0fc4ab7a="" fill="#fff" class="arrow-svg">
            <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
          </svg>
        </span>
      </a>
    </section>
    <section class="user_data">
      <ul class="data_container">
        <li class="data_info_link">
          <p class="balance_top">
            <span class="money">{{balance}}</span>元
          </p>
          <p class="balance_bottom">我的余额</p>
        </li>
        <li class="data_info_link">
          <p class="balance_top">
            <span class="discount">{{discount}}</span>个
          </p>
          <p class="balance_bottom">我的优惠</p>
        </li>
        <li class="data_info_link">
          <p class="balance_top">
            <span class="point">{{point}}</span>分
          </p>
          <p class="balance_bottom">积分</p>
        </li>
      </ul>
    </section>
    <section class="profile_other">
      <a href="" class="welfare">
        <span class="welfare_icon">
          <svg fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
          </svg>
        </span>
        <div class="welfare_detail">
          <span class="txt">我的订单</span>
          <span class="txt_svg">
            <svg data-v-0fc4ab7a="" fill="#bbb">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </a>
      <a href="" class="welfare">
        <span class="welfare_icon">
          <svg fill="#fc7b53">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
          </svg>
        </span>
        <div class="welfare_detail">
          <span class="txt">积分商城</span>
          <span class="txt_svg">
            <svg data-v-0fc4ab7a="" fill="#bbb">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </a>
      <a href="" class="welfare">
        <span class="welfare_icon">
          <svg fill="#ffc636">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
          </svg>
        </span>
        <div class="welfare_detail">
          <span class="txt">饿了么会员卡</span>
          <span class="txt_svg">
            <svg data-v-0fc4ab7a="" fill="#bbb">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </a>
    </section>
    <section class="profile_other">
      <a href="" class="welfare">
        <span class="welfare_icon">
          <svg fill="#4aa5f0">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
          </svg>
        </span>
        <div class="welfare_detail">
          <span class="txt">服务中心</span>
          <span class="txt_svg">
            <svg data-v-0fc4ab7a="" fill="#bbb">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </a>
      <a href="" class="welfare">
        <span class="welfare_icon">
          <svg fill="#fc7b53">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
          </svg>
        </span>
        <div class="welfare_detail">
          <span class="txt">下载饿了么APP</span>
          <span class="txt_svg">
            <svg data-v-0fc4ab7a="" fill="#bbb">
              <use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </a>
    </section>
    <foot-nav></foot-nav>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import FootNav from 'components/footer/footer'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			username: '登录/注册',
			phone: '未绑定手机号',
			balance: 0, // 余额
			discount: 0, // 优惠
			point: 0, // 积分
			avatar: 'common/images/avatar.png', // 头像
		}
	},
	mounted() {
		this.initUserInfo()
	},
	computed: {
		...mapState(['userInfo']),
	},
	methods: {
		initUserInfo() {
			if (this.userInfo) {
				this.username = this.userInfo.username
				this.avatar = this.userInfo.avatar
				this.phone = this.userInfo.mobile ? this.userInfo.mobile : '未绑定手机号'
				this.balance = this.userInfo.balance
				this.discount = this.userInfo.gift_amount
				this.point = this.userInfo.point
			}
		},
	},
	components: {
		HeadTop,
		FootNav,
	},
	watch: {
		userInfo: function() {
			this.initUserInfo()
		},
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.profile {
	p,
	span {
		font-family: Helvetica Neue, Tahoma, Arial;
	}
	.profile_bar {
		padding-top: 1.9rem;
		.link {
			display: flex;
			align-items: center;
			padding: 0.7rem;
			background: $blue;
			img {
				display: inline-block;
				@include wh(2rem, 2rem);
				border-radius: 50%;
			}
			.number {
				display: inline-block;
				flex-grow: 1;
				.username {
					@include sc(0.7rem, #fff);
				}
				.msg {
					@include sc(0.6rem, #fff);
					.phone_icon {
						display: inline-block;
						vertical-align: middle;
						svg {
							@include wh(0.7rem, 0.7rem);
						}
					}
					.phone_no {
						@include sc(0.5rem, #fff);
					}
				}
			}
			.arrow {
				@include wh(0.6rem, 0.6rem);
				display: inline-flex;
			}
		}
	}
	.user_data {
		.data_container {
			display: flex;
			.data_info_link {
				flex: 1;
				padding: 0.5rem 0;
				text-align: center;
				background-color: #fff;
				&:nth-of-type(1),
				&:nth-of-type(2) {
					border-right: 1px solid #f1f1f1;
				}
				.balance_top {
					@include sc(0.4rem, #666);
					.money {
						@include sc(0.8rem, #f90);
					}
					.discount {
						@include sc(0.8rem, #ff5f3e);
					}
					.point {
						@include sc(0.8rem, #6ac20b);
					}
				}
				.balance_bottom {
					padding-top: 0.5rem;
					@include sc(0.5rem, #666);
				}
			}
		}
	}
	.profile_other {
		margin-top: 0.4rem;
		background: #fff;
		.welfare {
			display: flex;
			align-items: center;
			padding-left: 0.7rem;
			.welfare_icon {
				@include wh(0.7rem, 0.7rem);
				display: inline-flex;
				svg {
					@include wh(100%, 100%);
				}
			}
			.welfare_detail {
				width: 100%;
				@include fj;
				padding: 0.4rem 0.3rem;
				border-bottom: 1px solid #f1f1f1;
				@include sc(0.8rem, #333);
				.txt_svg {
					@include wh(0.5rem, 0.5rem);
					display: block;
					svg {
						@include wh(100%, 100%);
					}
				}
			}
		}
	}
}
</style>


