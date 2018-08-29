<template>
  <div class="search">
    <head-top :go-back="true" :sign-up="true">
      <p class="search_title" slot="search">搜索</p>
    </head-top>
    <section class="search_container">
      <input type="text" placeholder="请输入地点...">
      <span class="search_btn">提交</span>
    </section>
    <foot-nav></foot-nav>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import FootNav from 'components/footer/footer'
export default {
	components: {
		HeadTop,
		FootNav,
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.search {
	padding-top: 2.5rem;
	.search_title {
		@include center;
		color: #fff;
	}
	.search_container {
		padding: 0.5rem 0.3rem;
		background: #fff;
		input {
			width: 80%;
			padding: 0.5rem 0.3rem;
			border: 1px solid $bc;
			@include borderRadius(0.2rem);
			font-size: 0.7rem;
		}
		.search_btn {
			width: 17%;
			display: inline-block;
			@include sc(0.7rem, #fff);
			padding: 0.45rem 0.3rem;
			@include borderRadius(0.2rem);
			background-color: $blue;
			text-align: center;
		}
	}
}
</style>


