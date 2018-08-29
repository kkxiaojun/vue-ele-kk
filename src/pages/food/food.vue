<template>
  <div class="food">
    <head-top :go-back="true" :sign-up="true">
      <p class="search_title" slot="search">food</p>
    </head-top>
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
.food {
	padding-top: 2.5rem;
	.food_title {
		@include center;
		color: #fff;
	}
}
</style>


