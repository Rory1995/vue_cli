<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <h1>D3 Visualization within Vue</h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col><p>Click to shuffle the numbers</p></b-col>
        <b-col><b-button  @click="shuffleNumbers">Shuffle</b-button></b-col>
      </b-row>
      <b-row>
        <b-col>
          <svg :width="width" :height="height" id="viz"></svg>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <svg :width="width/2" :height="height/2" id="vizSmall"></svg>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
const d3 = require('d3');
import chart from "@/assets/js/barChartVisualization";


export default {
  name: 'App',
  components: {},

  data() {
    return {
      numbers: [100, 250, 160, 80, 200, 300, 125, 260],
      width: 650,
      height: 500,
    }
  },
  mounted() {
    this.refreshChart(this.numbers);
  },
  watch: {
    numbers(newVal) {
      this.refreshChart(newVal);
    }
  },

  methods: {
    refreshChart(ListOfNumbers) {
      // const svg = d3.select('#viz');
      const barChart = chart()//.width(this.width).height(this.height);
      const smallChart = chart()//.width(this.width/2).height(this.height/2);


      d3.select('#viz').datum(ListOfNumbers).call(barChart);
      d3.select('#vizSmall').datum(ListOfNumbers).call(smallChart);


    },
    shuffleNumbers(){
      const N = Math.round(Math.random()*10);
      this.numbers = d3.range(N).map(d => Math.round(d+Math.random()*400));
    }
  },
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
