<template>
  <div class="choose-address">
    <head-top head-title="收货地址" :go-back="true"></head-top>
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
.choose-address {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	z-index: 101;
	padding-top: 1.95rem;
}
</style>


