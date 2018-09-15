<template>
    <div class="cart_container">
        <section v-if="!food.specifications.length" class="cart_common">
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
        <section class="cart_common" v-else>
            <span class="reduce">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
                </svg>
            </span>
            <span class="num">1</span>
            <span class="add_type" @click="showSpec(food)">多选规格</span>
        </section>
    </div>
</template>
<script>
import { mapState, mapMutations} from 'vuex'
export default {
    data(){
        return {
            
        }
    },
    props: {
        food: {
            type: Object,
            required: true
        },
        shopId: {
            type: [Number, String],
            required: true
        }
    },
    computed: {

    },
    methods: {
        showSpec(food) {
            this.$emit('show-spec', food)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.cart_container {
    .cart_common{
        display: flex;
        align-items: center;
    }
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
    .add_type{
        display: block;
        @include sc(.55rem, #fff);
        padding: .1rem .2rem;
        background-color: $blue;
        border-radius: 0.2rem;
        border: 1px solid $blue;
    }
}
</style>


