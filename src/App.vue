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


    // per gestire la lunghezza della figura
    const scaleLength = d3.scaleLinear()
        .domain([0, d3.max(numbers)])
        .range([0, 400]);

    //const scalePos= function(d,i) {
    //  return 28 * i + 40
    //}

    // vertical position
    const scalePos= d3.scaleBand()
        .domain(d3.range(numbers.length))
        .range([0, 300])
        .round(true)
        .paddingInner(0.05)
        .paddingOuter(0.05);

  //============create g groups==========
  const gs= svg.selectAll('g.bars')
    .data(numbers)
    .join('g').attr('class','bar')

    gs.attr('transform', (d,i) => `translate(0, ${scalePos(i)})`) //'translate()' -> tutti gli elementi avranno la stessa caratteristica

    gs.append('rect') //aggiunta di un rettangolo per ogni elemento
      .attr('height', scalePos.bandwidth())
      // non necessito di impostare la y perchè dipende dalla classe madre
      .attr('width', scaleLength)
      .attr('fill', '#89abf3');

    gs.append('text')
      .text((d) => d)
      .attr('x', scaleLength)
      .attr('y', scalePos.bandwidth()/2);

  //========== creazione delle barre======
/*

    // join my data, //creo i rettangoli
    const rects= svg.selectAll('rect')
        .data(numbers)
        .join('rect');



    rects
        .attr('x', 20)
        .attr('height', scalePos.bandwidth())
        .attr('y', (d,i) => scalePos(i))
        .attr('width', scaleLength)
        .attr('fill', '#89abf3');


    //========== creazione del testo delle label======

    const labels = svg.selectAll ('text')
        .data(numbers)
        .join('text');

    labels
        .text((d) => d)
        .attr('x', scaleLength)
        .attr('y', (d,i) => scalePos(i))
        .attr('dy', scalePos.bandwidth()/2)
        .attr('dx', 25)
    */

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
