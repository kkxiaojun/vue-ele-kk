<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
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
    getCity(res => {
      if (res.status === 200) {
        this.msg = res.data.name
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
