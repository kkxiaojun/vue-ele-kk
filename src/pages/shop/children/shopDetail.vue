<template>
    <div class="shop_detail">
        <head-top head-title="商家详情" :sign-up="true" :go-back="true"></head-top>
        <section class="ceil_container">
            <header class="ceil_head">
                <p class="ceil_tilte">活动与属性</p>
            </header>
            <ul class="ceil_ul">
                <li class="ceil_ul_li" v-for="item in shopDetail.activities" :key="item.id">
                    <span class="li_head" :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </ul>
            <ul class="ceil_ul">
                <li class="ceil_ul_li" v-for="item in shopDetail.supports" :key="item.id">
                    <span class="li_head" :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
                    <span>{{item.description}}(APP专享)</span>
                </li>
            </ul>
        </section>
        <section class="ceil_container">
            <header class="ceil_head">
                <p class="ceil_tilte">食品监督安全公示</p>
                <p>
                    <span class="ceil_confirm">企业认证详情</span>
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" version="1.1" class="right_arrow">
                        <path d="M0 0 L8 7 L0 14" stroke="#ccc" stroke-width="1" fill="none" />
                    </svg>
                </p>
            </header>
            <section class="ceil_content">
                <div>
                    <svg class="shop_status" v-if="shopDetail.status == 1">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
                    </svg>
                    <svg class="res-well" v-else>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
                    </svg>
                </div>
                <div class="check_date">
                    <p>
                        <span>监督检查结果：</span>
                        <span class="shop_status_well" v-if="shopDetail.status == 1">良好</span>
                        <span class="shop_status_bad" v-else>差</span>
                    </p>
                    <p>
                        <span>检查日期：</span>
                        <span>{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
                    </p>
                </div>
            </section>
        </section>
        <section class="ceil_container">
            <header class="ceil_head">
                <p class="ceil_tilte">商家信息</p>
            </header>
            <p class="ceil_info">{{shopDetail.name}}</p>
            <p class="ceil_info">地址：{{shopDetail.address}}</p>
            <p class="ceil_info">营业时间：[{{shopDetail.opening_hours[0]}}]</p>
            <p class="ceil_info ceil_info_flex">
                <span>营业执照</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg></p>
            <p class="ceil_info ceil_info_flex">
                <span>餐饮服务许可证</span>
                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
                    <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
                </svg>
            </p>
        </section>
    </div>
</template>
<script>
import HeadTop from 'components/header/header'
import { mapState } from 'vuex'
import {imgBaseUrl} from 'config/env'
export default {
	data() {
		return {
            imgBaseUrl,
        }
    },
    computed:{
        ...mapState(['shopDetail'])
    },
	components: {
		HeadTop,
	},
}
</script>

<style lang="scss" scoped>
@import '~common/scss/mixin';
.shop_detail {
	position: absolute;
	top: 1.95rem;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ebebeb;
	z-index: 120;
}
.ceil_container{
    margin-top: 0.4rem;
    padding-bottom: 0.4rem;
    background-color: #fff;
    .ceil_head{
        @include fj;
        margin-bottom: 0.5rem;
        line-height: 1.7rem;
        border-bottom: 0.02rem solid $bc;
        .ceil_tilte{
            @include sc(0.7rem, #666);
            padding-left: 0.6rem;
        }
        .ceil_confirm{
            @include wh(0.6rem, 0.6rem);
            @include sc(0.7rem, #999);
        }
        .right_arrow{
            width: 0.6rem;
            height: 0.6rem;
            vertical-align: middle;
        }
    }
    .ceil_ul{
        padding: 0 0.5rem;
        .ceil_ul_li{
            margin-bottom: 0.5rem; 
            @include sc(0.65rem, #666);
            .li_head{
                @include borderRadius(0.2rem);
                @include sc(0.65rem, #fff);
                padding: 0.05rem;
            }
        }
    }
    .ceil_content{
        display: flex;
        padding: .6rem;
        svg{
            @include wh(2rem, 2rem);
            margin-right: .6rem;
        }
        .check_date{
            span{
                @include sc(.55rem, #666);
            }
            .shop_status_well{
                color: rgb(126, 211, 33);
            }
            .shop_status_bad{
                color: red;
            }
        }
    }
    .ceil_info{
        @include sc(0.6rem, #666);
        padding: 0.5rem;
        margin-left: 0.6rem;
        border-bottom: 0.025rem solid #f5f5f5;
    }
    .ceil_info_flex{
        @include fj;
    }
}
</style>

