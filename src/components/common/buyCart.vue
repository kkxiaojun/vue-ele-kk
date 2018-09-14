<template>
    <div class="cart_container">
        <section v-if="foods.specifications.length">
            <span class="reduce">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                </svg>
            </span>
            <span class="num">1</span>
            <span class="add">
                <svg class="add_icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
                </svg>
            </span>
        </section>
        <section v-else>
            <span class="reduce">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                </svg>
            </span>
            <span class="num">1</span>
            <span class="add_type">多选规格</span>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {
            
        }
    },
    props: {
        foods: {
            type: Array,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.cart_container {
    display: flex;
    align-items: center;
    .reduce {
        svg {
            @include wh(0.9rem, 0.9rem);
            fill: #3190e8;
        }
    }
    .num {
        @include sc(0.6rem, #999);
        text-align: center;
        min-width: 1rem;
    }
    .add {
        svg {
            @include wh(0.9rem, 0.9rem);
            fill: #3190e8;
        }
    }
}
</style>


