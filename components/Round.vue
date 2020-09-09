<template>
  <div class="round-main">
    <div class="round-number-contrainer">Round {{roundNumber}}</div>
    <div class="round-box-wrapper">
      <div class="round" v-for="(validthrow,key) in round" :key="key">{{validthrow}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { IRound } from "../interfaces/app.interface";
export default Vue.extend({
  name: "Round",
  props: {
    round: {
      type: Array,
      required: true,
    } as PropOptions<IRound>,
    roundNumber: {
      type: Number,
      required: true,
    },
  },
});
</script>
<style lang="scss">
.round-main {
  border: 1px solid black;
  height: 6rem;
  width: 6rem;
  .round-box-wrapper {
    display: flex;
    justify-content: flex-end;

    .round {
      border: 1px solid black;
      width: 2rem;
      text-align: center;
    }
  }
  .round-number-contrainer {
    border: 1px solid black;
    text-align: center;
  }
}
</style>