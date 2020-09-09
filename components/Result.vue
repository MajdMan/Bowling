<template>
  <div class="result-main"> 
    <div><b-icon v-if="results.success" icon="emoticon"></b-icon>
    <b-icon v-else icon="emoticon-angry"></b-icon></div>
    <span>{{results.success}}</span>
    <div class="result" v-for="(result,key) in results.input" :key="key">Round {{key +1}}  : <br>{{result}}</div>
    <div></div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { IResult } from "../interfaces/app.interface";
export default Vue.extend({
  name: "Result",
  props: {
    results: {
      type: Object,
      required: true,
    } as PropOptions<IResult>,
  },
});
</script>
<style lang="scss">
  .result-main{
    display: flex;
    justify-content: flex-start;
     .result{
       width: 6rem;
       text-align: center;
     }

  }
</style>