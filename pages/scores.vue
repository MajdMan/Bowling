<template>
  <div class="scores-main">
    <div class="button-container">
      <b-button  type="is-success" @click="getScore">New game</b-button>
    </div>
    <h1 class="heading">Rounds</h1>
    <div class="round-wrapper">
      <div v-for="(round,key) in points" :key="key">
        <Round :round="round" :roundNumber="key+ 1" />
      </div>
    </div>
    <h1 class="heading">Calculated Results</h1>
    <div class="result-wrapper">
      <div v-for="(calculatedResult,index) in calculatedResults" :key="index" class="result-calc">
        Round {{index +1}}:
        <br />
        {{calculatedResult }}
      </div>
    </div>
    <div class="validated-result">
      <div class="button-container">
        <b-button class="button" type="is-success"  @click="verify">Verify</b-button>
      </div>
      <Result :results="varifiedResults" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IRound, IResponse, IResult } from "../interfaces/app.interface";
import { calculate,isValidPoints } from "../logic/calculateScore";
import Round from "../components/Round.vue";
import Result from "../components/Result.vue";

export default Vue.extend({
  name: "score",
  created() {
    this.getScore();
  },
  components: {
    Round,
    Result,
  },
  data() {
    const score: number[] = [];
    const points: IRound[] = [];
    const varifiedResults: IResult = {
      success: false,
      input:[]
    } ;
    const token: string = "";
    return {
      score,
      token,
      points,
      varifiedResults,
    };
  },
  computed: {
    calculatedResults(): number[] {
      if (isValidPoints(this.points)) {
              return calculate(this.points);
      }
      return [];
    },
  },
  methods: {
    getScore():void {
      const self = this;
      this.varifiedResults.success  = false;
      this.varifiedResults.input = [];
      this["$axios"]
        .$get("http://13.74.31.101/api/points")
        .then((res: IResponse) => {
          (self.token = res.token), (self.points = res.points);
        }).catch(()=> {
          //Do something smart
        });
    },
    verify() :void {
      this["$axios"]
        .$post("http://13.74.31.101/api/points", {
          points: this.calculatedResults,
          token: this.token,
        })
        .then((res: IResult) => {
          this.varifiedResults = res;
        })
        .catch(()=> {
          //Do something smart
        });
    },
  },
});
</script>
<style lang="scss">
.scores-main {
  .round-wrapper {
    display: flex;
    justify-content: flex-start;
    width: 10rem;
  }
  .result-wrapper {
    display: flex;
    justify-content: flex-start;

    .result-calc {
      border: 1px solid black;
      width: 6rem;
      text-align: center;
    }
  }
  .button-container{
    margin-top: 2rem;
    margin-bottom:2rem ;
  }
}
</style>

