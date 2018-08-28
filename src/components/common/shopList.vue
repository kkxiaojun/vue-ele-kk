<template>
  <div>
    <header class="shop_title">
				<svg class="title_icon">
	    		<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    	</svg>
				<span class="title_txt">附近商家</span>
	</header>
	<ul class="shop_list">
				<li class="each_shop">
					<section class="shop_img">
						<img src="../../images/avatar.png" alt="">
					</section>
					<section class="shop_right">
						<header class="shop_detail">
							<span class="shop_name">KFC</span>
							<ul class="shop_detail_ul">
								<li class="shop_detail_li">包</li>
								<li class="shop_detail_li">邮</li>
							</ul>
						</header>
						<section class="score_num">
							<section class="score_num_left">
								<span>****</span>
								<span>4.7</span>
								<span>116单</span>
							</section>
							<section class="score_num_right">
								<span>蜂鸟送</span>
								<span>准时</span>
							</section>
						</section>
						<section class="shop_distance">
							<section class="shop_distance_left">
								<span>起送</span>
								<span>4.7</span>
								<span>配送费</span>
							</section>
							<section class="shop_distance_right">
								<span>公里</span>
								<span>/</span>
								<span>分钟</span>
							</section>
						</section>
					</section>
				</li>
				<li class="each_shop">
					<section class="shop_img">
						<img src="../../images/avatar.png" alt="">
					</section>
					<section class="shop_right">
						<header class="shop_detail">
							<span class="shop_tip">品牌</span>
							<span class="shop_name">KFC</span>
							<ul class="shop_detail_ul">
								<li>包</li>
								<li>邮</li>
							</ul>
						</header>
						<section class="score_num">
							<section class="score_num_left">
								<span>****</span>
								<span>4.7</span>
								<span>116单</span>
							</section>
							<section class="score_num_right">
								<span>蜂鸟送</span>
								<span>准时</span>
							</section>
						</section>
						<section class="shop_distance">
							<section class="shop_distance_left">
								<span>起送</span>
								<span>4.7</span>
								<span>配送费</span>
							</section>
							<section class="shop_distance_right">
								<span>公里</span>
								<span>/</span>
								<span>分钟</span>
							</section>
						</section>
					</section>
				</li>
	</ul>
  </div>
</template>
<script>
export default {}
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
.shop_list {
	.each_shop {
		display: flex;
		padding: 0.2rem 0.5rem;
		.shop_img {
			img {
				@include wh(4rem, 4rem);
			}
		}
		.shop_right {
			display: flex;
			flex-direction: column;
			flex: auto;
			.shop_detail {
				@include fj;
				.shop_name::before {
					content: '品牌';
					display: inline-block;
					font-size: 0.5rem;
					line-height: 0.6rem;
					color: #333;
					background-color: #ffd930;
					padding: 0 0.1rem;
					border-radius: 0.1rem;
					margin-right: 0.2rem;
				}
				.shop_name {
				}
				.shop_detail_ul {
					display: flex;
					.shop_detail_li {
					}
				}
			}
			.score_num {
				@include fj;
				@include sc(0.6rem, #666);
			}
			.shop_distance {
				@include fj;
				@include sc(0.6rem, #666);
			}
		}
	}
}
</style>

