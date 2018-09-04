<template>
  <div class="shop">
    <section class="shop_top">
      <img class="shop_left" src="" alt="">
      <section class="shope_middle">
        <header class="shop_title">xiaoguo</header>
        <p class="send_way">sfs/sfds/sfd</p>
        <p class="notice">公告：sss</p>
      </section>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <section class="shop_content"></section>
  </div>
</template>
<script>
import { getShopList } from 'api/index'
import { mapState } from 'vuex'
import { checkCode } from 'common/js/util'
export default {
	data() {
		return {
			imgBaseUrl: '//elm.cangdu.org/img/', // pic地址
		}
	},
	mounted() {
	},
	methods: {
	}
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.shop_top{
  @include fj;
  .shope_left{}
  .shop_middle{
    display: flex;
    flex-wrap: column;
  }
  .shop_right{}
}
.shop_content{}
</style>

