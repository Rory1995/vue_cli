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

  data(){
    return {
        numbers: [100, 250, 160, 80, 200, 300, 125, 260],
    }
  },
  mounted() {
    this.refreshChart(this.numbers);
  },
    watch: {
      numbers(newVal){
        this.refreshChart(newVal);
      }

    },

    methods: {
      refreshChart(ListOfNumbers){
        const svg = d3.select('#viz');


        const scaleLength = d3.scaleLinear()
            .domain([0, d3.max(ListOfNumbers)])
            .range([0, 500]);

        const lAxis = d3.axisTop(scaleLength)

        const scalePos = d3.scaleBand()
            .domain(d3.range(ListOfNumbers.length))
            .range([0, 300])
            .round(true)
            .paddingInner(0.05)
            .paddingOuter(0.05);

        //============create g groups==========
        svg.selectAll('g.lAxis')
            .data(0)
            .join('g')
            .attr('class', 'lAxis')
            .attr('transform', 'translate(20,20)')
            .call(lAxis);


        const gs = svg.selectAll('g.bars')
            .data(ListOfNumbers)
            .join('g').attr('class', 'bar')

        gs.attr('transform', (d, i) => `translate(20, ${30 + scalePos(i)})`) //'translate()' -> tutti gli elementi avranno la stessa caratteristica

        gs.selectAll('rect')
            .data( d => [d])
            .join('rect')
              .attr('height', scalePos.bandwidth())
              // non necessito di impostare la y perchè dipende dalla classe madre
              .attr('width', scaleLength)
              .attr('fill', '#89abf3');

        gs.append('text')
            .data(d => [d])
            .join('text')
            .text((d) => d)
            .attr('x', scaleLength)
            .attr('y', scalePos.bandwidth() / 2);


        }
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
