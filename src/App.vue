<template>
  <div id="app">
    <h1>D3 Visualization within Vue</h1>
    <svg width="800" height="600" id="viz"></svg>

  </div>
</template>

<script>
const d3 = require('d3');

export default {
  name: 'App',
  components: {

  },
  mounted() {
    let numbers = [100, 250, 160, 80, 200];
    // select visual enviroment SVG
    const svg = d3.select('#viz');

    // join my data
    const rects= svg.selectAll('rect')
        .data(numbers)
        .join('rect');

    // update: join()
    const scaleLength = d3.scaleLinear()
    .domain([0, d3.max(numbers)])
    .range([0, 400]);

    const scalePos= function(d,i) {
      return 28 * i + 40
    }
    rects
        .attr('x', 20)
        .attr('height', 19)
        .attr('y', scalePos)
        .attr('width', scaleLength);

    }
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
