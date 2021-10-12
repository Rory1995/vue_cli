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
    let numbers = [100, 250, 160, 80, 200, 300, 125, 260];

    // select visual enviroment SVG
    const svg = d3.select('#viz');

    // join my data, //creo i rettangoli
    const rects= svg.selectAll('rect')
        .data(numbers)
        .join('rect');

    // per gestire la lunghezza della figura
    const scaleLength = d3.scaleLinear()
    .domain([0, d3.max(numbers)])
    .range([0, 400]);

    //const scalePos= function(d,i) {
    //  return 28 * i + 40
    //}

    // per lo spazio tra i rettangoli
    const scalePos= d3.scaleBand()
        .domain(d3.range(numbers.length))
        .range([0, 300])
        .round(true)
        .paddingInner(0.05)
        .paddingOuter(0.05);

    rects
        .attr('x', 20)
        .attr('height', scalePos.bandwidth())
        .attr('y', (d,i) => scalePos(i))
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
