<template>
  <div class="home">
    <head-top :sign-up="false" :go-back="false">
      <span slot='logo' class="head_logo">guoguo</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准时请在城市列表中选择</span>
      </div>
      <a class="cur_city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </a>
    </nav>
    <section class="hot_city_container">
      <h4 class="city_title">热门城市</h4>
      <ul class="city_list clear">
        <li class="left" v-for="(item, index) in hotCity" :key="index">
          <router-link :to="'/city/'+item.id">{{item.name}}</router-link>
        </li>
      </ul>
    </section>
    <section class="list_city_container">
      <div v-for="(letter, key, index) in groupCityDesc" :key="key" class="city_letter">
        <h4 class="city_title">{{key}}
          <span v-if="index === 0">（按字母顺序排列）</span>
        </h4>
        <ul class="city_list clear">
          <li class="left ellipsis" v-for="(item, index) in letter" :key="index">
            <router-link :to="'/city/'+item.id">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import HeadTop from 'components/header/header'
import { getCity } from 'api/index'
import { checkCode } from 'common/js/util'
export default {
	name: 'Home',
	data() {
		return {
			guessCity: '广州', // 当前城市
			hotCity: [], // 热门城市
			groupCity: {}, // a-z所有城市
		}
	},
	computed: {
		// 按字母顺序A-Z排序
		groupCityDesc() {
			let arr = {}
			for (let i = 65; i <= 90; i++) {
				if (this.groupCity[String.fromCharCode(i)]) {
					arr[String.fromCharCode(i)] = this.groupCity[String.fromCharCode(i)]
				}
			}
			return arr
		},
	},
	created() {
		getCity('guess', res => {
			if (checkCode(res.status)) {
				this.guessCity = res.data.name
			}
		})
		getCity('hot', res => {
			if (checkCode(res.status)) {
				this.hotCity = res.data
			}
		})
		getCity('group', res => {
			if (checkCode(res.status)) {
				this.groupCity = res.data
			}
		})
	},
	components: {
		HeadTop,
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '~common/scss/mixin';
.home {
	.city_nav {
		margin-bottom: 0.4rem;
		padding-top: 2.35rem;
		border-top: 1px solid $bc;
		background-color: $fc;
		.city_tip {
			@include fj;
			padding: 0.4rem;
			span:nth-of-type(1) {
				@include sc(0.55rem, #666);
			}
			span:nth-of-type(2) {
				@include sc(0.55rem, #666);
			}
		}
		.cur_city {
			@include fj;
			align-items: center;
			@include font(0.8rem, 1.8rem);
			padding: 0 0.4rem;
			border-top: 1px solid $bc;
			border-bottom: 2px solid $bc;
			span:nth-of-type(1) {
				color: $blue;
			}
			.arrow_right {
				fill: #999;
				@include wh(0.6rem, 0.6rem);
			}
		}
	}
	.hot_city_container {
		background-color: #fff;
		margin-bottom: 0.4rem;
		a {
			@include sc(0.7rem, $blue);
		}
	}
	.list_city_container {
		a {
			@include sc(0.6rem, #666);
		}
		.city_letter {
			background-color: #fff;
			margin-bottom: 0.4rem;
		}
	}
	.city_title {
		@include sc(0.7rem, #666);
		padding: 0.4rem;
		border: 1px solid $bc;
		span {
			@include sc(0.4rem, #666);
		}
	}
	.city_list {
		li {
			width: 25%;
			height: 1.75rem;
			line-height: 1.75rem;
			text-align: center;
			padding: 0 0.3rem;
			border-right: 1px solid $bc;
			border-bottom: 1px solid $bc;
		}
	}
}
</style>
