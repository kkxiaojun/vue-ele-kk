<template>
  <div class="city">
    <head-top :head-title="cityName" :go-back="true" :sign-up="true">
      <router-link to="/home" slot="changeCity" class="change_city">切换城市</router-link>
    </head-top>
    <form action="" class="search_container">
      <input type="text" class="search_input" v-model="keyword" placeholder="请输入地点..." required>
      <div class="search_btn" @click="search">
        <span>提交</span>
      </div>
    </form>
    <div class="history_title">搜索历史</div>
    <section class="search_history">
      <ul class="history_list">
        <li v-for="(item, index) in placeList" :key="index" @click="nextPage(item)">
          <h4 class="list_name">{{item.name}}</h4>
          <p class="list_address">{{item.address}}</p>
        </li>
        <li class="clear_all" v-if="placeList.length" @click="clear">
          <span>清空历史</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import HeadTop from 'components/header/header'
import { getCityById, searchByKeyword } from 'api/index'
import { checkCode, getStore, setStore, removeStore } from 'common/js/util'
export default {
	data() {
		return {
			cityId: '',
			cityName: '城市',
			keyword: '', // 搜索词
			historyList: [], // 搜索历史
			placeList: [], // 搜索结果
		}
	},
	created() {
		this.initData()
		this.cityId = this.$route.params.id
		// 获取城市名
		getCityById(this.cityId, res => {
			if (checkCode(res.status)) {
				this.cityName = res.data.name
			}
		})
	},
	methods: {
		initData() {
			let placeHistory = getStore('placeHistory')
			if (placeHistory) {
				this.placeList = JSON.parse(placeHistory)
			}
		},
		search() {
			if (this.keyword) {
				var params = {
					city_id: this.cityId,
					keyword: this.keyword,
					type: 'search',
				}
				// 根据输入进行搜索
				searchByKeyword(params, res => {
					if (checkCode(res.status)) {
						this.placeList = res.data
					}
				})
			}
		},
		/**
		 * 选择地点
		 */
		nextPage(curPlace) {
			let history = getStore('placeHistory')
			// 是否存在搜索历史
			if (history) {
				let repeat = false
				this.historyList = JSON.parse(history)
				// 判断搜索历史中是否有此记录，无则添加
				for (let index = 0; index < this.historyList.length; index++) {
					if (curPlace.geohash === this.historyList[index].geohash) {
						repeat = true
						break
					}
				}
				if (!repeat) {
					this.historyList.push(curPlace)
				}
			} else {
				this.historyList.push(curPlace)
			}
			setStore('placeHistory', JSON.stringify(this.historyList))
			this.$router.push({
				path: '/msite',
				query: { geohash: curPlace.geohash },
			})
		},
		clear() {
			removeStore('placeHistory')
			this.historyList = []
		},
	},
	components: {
		HeadTop,
	},
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin';
.city {
	padding-top: 2.5rem;
	.change_city {
		right: 0.4rem;
		@include sc(0.6rem, #fff);
		@include ct;
	}
	.search_container {
		padding: 0.3rem 0.5rem;
		background: #fff;
		.search_input {
			display: inline-block;
			@include wh(100%, 100%);
			margin-bottom: 0.4rem;
			padding: 0.2rem;
			border: 1px solid $bc;
			@include borderRadius(0.15rem);
			font-size: 0.6rem;
		}
		.search_btn {
			padding: 0.2rem;
			@include fj(center);
			background-color: $blue;
			border: 1px solid $blue;
			@include borderRadius(0.15rem);
			span {
				@include sc(0.6rem, #fff);
			}
		}
	}
	.history_title {
		padding: 0.5rem;
		@include sc(0.5rem, #666);
	}
	.search_history {
		background: #fff;
		.history_list {
			li {
				padding: 0.4rem;
				border: 1px solid $bc;
				.list_name {
					padding-bottom: 0.3rem;
					@include sc(0.9rem, #666);
				}
				.list_address {
					@include sc(0.7rem, #a5a2a2);
				}
				&.clear_all {
					text-align: center;
				}
			}
		}
	}
}
</style>
