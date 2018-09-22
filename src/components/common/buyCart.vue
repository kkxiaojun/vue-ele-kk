<template>
  <div class="cart_wrap">
    <section v-if="!food.specifications.length" class="cart_common">
      <span class="reduce">
        <svg @click="removeOutCart(food.category_id, food.item_id, food.specfoods[0].food_id, food.specfoods[0].name, food.specfoods[0].price, 
                '', food.specfoods[0].packing_fee, food.specfoods[0].sku_id, food.specfoods[0].stock)" v-if="foodNum">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
        </svg>
      </span>
      <span class="num" v-if="foodNum">{{foodNum}}</span>
      <span class="add">
        <svg class="add_icon" @touchstart="addToCart(food.category_id, food.item_id, food.specfoods[0].food_id, food.specfoods[0].name, 
                food.specfoods[0].price, '', food.specfoods[0].packing_fee, food.specfoods[0].sku_id, food.specfoods[0].stock, $event)">
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
      <span class="num" v-if="foodNum">{{foodNum}}</span>
      <span class="add_type" @click="showSpec(food)">多选规格</span>
    </section>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
			showMoveBall: [], // 下落小球的显示与隐藏
		}
	},
	props: {
		food: {
			type: Object,
			required: true,
		},
		shopId: {
			type: [Number, String],
			required: true,
		},
	},
	computed: {
		...mapState(['cartList']),
		/**
		 * 监听cartList变化，更新商铺的购物车信息shopCart，返回一个新的对象
		 */
		shopCart: function() {
			return Object.assign({}, this.cartList[this.shopId])
		},
		/**
		 * shopCart变化的时候重新计算当前商品的数量
		 */
		foodNum: function() {
			let category_id = this.food.category_id
			let item_id = this.food.item_id
			if (this.shopCart && this.shopCart[category_id] && this.shopCart[category_id][item_id]) {
				let num = 0
				Object.values(this.shopCart[category_id][item_id]).forEach((item, index) => {
					num += item.num
				})
				return num
			} else {
				return 0
			}
		},
	},
	methods: {
		...mapMutations(['ADD_CART', 'REDUCE_CART']),
		//移出购物车
		removeOutCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock) {
			if (this.foodNum > 0) {
				this.REDUCE_CART({
					shopid: this.shopId,
					category_id,
					item_id,
					food_id,
					name,
					price,
					specs,
					packing_fee,
					sku_id,
					stock,
				})
			}
		},
		//加入购物车，计算按钮位置。
		addToCart(category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock, event) {
			this.ADD_CART({
				shopid: this.shopId,
				category_id,
				item_id,
				food_id,
				name,
				price,
				specs,
				packing_fee,
				sku_id,
				stock,
			})
			let elLeft = event.target.getBoundingClientRect().left
			let elBottom = event.target.getBoundingClientRect().bottom
			// this.showMoveBall.push(true);
			// this.$emit('show-move-ball', this.showMoveBall, elLeft, elBottom);
		},
		showSpec(food) {
			this.$emit('show-spec', food)
		},
	},
}
</script>
<style lang="scss" scoped>
@import '~common/scss/mixin';
.cart_wrap {
	.cart_common {
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
	.add_type {
		display: block;
		@include sc(0.55rem, #fff);
		padding: 0.1rem 0.2rem;
		background-color: $blue;
		border-radius: 0.2rem;
		border: 1px solid $blue;
	}
}
</style>


