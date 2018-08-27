<template>
  <div class="msite">
    <head-top :sign-up="false" :go-back="false">
      <router-link to="/search" class="msite_search" slot="search">
	    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
	      <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
	      <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
	    </svg>
      </router-link>
      <router-link to="/home" class="msite_title" slot="msiteTitle">
        <span class="text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <section class="nav_swiper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </section>
    <foot-nav></foot-nav>
  </div>
</template>
<script>
import HeadTop from 'components/header/header'
import FootNav from 'components/footer/footer'
import '@/plugins/swiper/swiper.min.js'
import '@/plugins/swiper/swiper.min.css'
export default {
  data() {
    return {
      msiteTitle: '上下九'
    }
  },
  mounted() {
    new Swiper('.swiper-container', {
      // 如果需要分页器
      pagination: '.swiper-pagination',
      loop: true,
    })
  },
  components: {
      HeadTop,
      FootNav
  }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.msite{
  padding-top: 2rem;
  .msite_search{
    left: 0.5rem;
    @include ct;
    @include wh(0.75rem, 1rem);
  }
  .msite_title{
    @include center;
    .text{
        @include sc(1rem, #fff);
    }
  }
  .nav_swiper{
    height: 10rem;
    background: #fff;
    .swiper-container{
        height: 100%;
    }
  }
}
</style>


