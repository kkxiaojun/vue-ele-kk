<template>
  <div class="food">
    <head-top :go-back="true" :sign-up="true">
      <p class="search_title" slot="search">food</p>
    </head-top>
		<!-- 分类 -->
		<section class="sort_container">
			<div class="sort_item">
				<div class="sort_title">
					<div class="sort_title_border">
				    <span class="title_txt">食堂早餐</span>
					  <span class="title_icon">></span>
					</div>
				</div>
				<div class="sort_content">
					<ul class="content_nav">
						<li class="content_nav_li">
							<div class="all_shop">全部商家</div>
							<div class="num">
								<span>111</span>
							</div>
						</li>
						<li class="content_nav_li">
							<div class="all_shop">早餐便当</div>
							<div class="num">
								<span>111</span>
							</div>
						</li>
					</ul>
					<div class="content_right">
						fsfsf
					</div>
				</div>
			</div>
			<div class="sort_item">
				<div class="sort_title">食堂早餐</div>
			</div>
			<div class="sort_item">
				<div class="sort_title">食堂早餐</div>
			</div>
		</section>
		<!-- <section class="shop_list_wrap">
		  <shop-list :geohash="geohash"></shop-list>
		</section> -->
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import ShopList from 'components/common/shopList'
export default {
	data() {
		return {
			geohash: '', // 经纬度合集
		}
	},
	created: function() {
		this.geohash = this.$route.query.geohash
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
	.search_title {
		@include center;
		color: #fff;
	}
	.sort_container{
		position: fixed;
		top: 1.95rem;
		right: 0;
		width: 100%;
		display: flex;
		@include fj(center);
		background-color: #fff;
		.sort_item{
			width: 33.33%;
			height: 1.6rem;
			line-height: 1.6rem;
			text-align: center;
			@include sc(0.55rem, #444);
			.sort_title{
				height: 1.2rem;
				line-height: 1.2rem;
				padding-top: 0.25rem;
				.sort_title_border{
					border-right: 0.015rem solid $bc;
					.title_txt{
						
					}
					.title_icon{}
				}
			}
			.sort_content{
				position: absolute;
				top: 1.6rem;
				width: 100%;
				display: flex;
				background-color: #fff;
				.content_nav{
					flex: 1;
					background-color: #f1f1f1;
					.content_nav_li{
						@include fj;
						padding: 0 0.5rem;
					}
				}
				.content_right{
					flex: 1;
				}
			}
		}
	}
	.shop_list_wrap {
		margin-top: 0.6rem;
		padding-bottom: 1.95rem;
		background-color: #fff;
	}
}
</style>


