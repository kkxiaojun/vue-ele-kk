<template>
  <div class="remark-address">
    <head-top head-title="订单备注" :go-back="true" :sign-up="true"></head-top>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
export default {
	components: {
		HeadTop,
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.remark-address {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	z-index: 101;
	padding-top: 1.95rem;
}
.footer {

}
</style>


