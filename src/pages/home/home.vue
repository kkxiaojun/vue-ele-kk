<template>
  <div class="home">
    <header>当前城市</header>
    <nav>热门城市</nav>
  </div>
</template>

<script>
import {getCity} from 'api/index'
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      msg: 'welcome to here'
    }
  },
  created: function () {
    getCity('guess', res => {
      if (res.status === 200) {
        this.msg = res.data.name
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
