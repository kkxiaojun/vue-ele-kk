<template>
  <div class="order_page">
    <head-top head-title="订单列表" :go-back="true" :sign-up="true"></head-top>
    <ul class="order_wrap">
      <li class="order_lsit">
        <img src="../../images/add_address.png" alt="">
        <section class="order_list_item">
          <section class="order_desc">
            <div class="order_desc_left">
              <p>效果演示</p>
              <p>19:00:00</p>
            </div>
            <div class="order_desc_right">支付超时</div>
          </section>
          <section></section>
        </section>
      </li>
    </ul>
    <foot-nav></foot-nav>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import FootNav from 'components/footer/footer'
export default {
	components: {
		FootNav,
    HeadTop
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.order_page{
  padding: 1.9rem 0 1.9rem 0;
}
.order_wrap{
  
}
.order_lsit{
  .order_list_item{
    .order_desc{
      .order_desc_left{}
    }
  }
}
</style>


