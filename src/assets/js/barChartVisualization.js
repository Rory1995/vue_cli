const d3 = require('d3');

function chart(){

    function my(selection){
        let numbers = selection.datum(); // estraiamo i dati da rappresentare


        const scaleLength = d3.scaleLinear() //per creare il mapping dei dati con la rappresentazione visuale
            .domain([0, d3.max(numbers)])
            .range([0, 500]);

        const lAxis = d3.axisTop(scaleLength); // visual scale mapping per l'asse relativa alla lunghezza della barra

        const scalePos = d3.scaleBand() //per avere una buona posizione delle barre rispetto ai dati disponibili
            .domain(d3.range(numbers.length)) //
            .range([0, 300])
            .round(true)
            .paddingInner(0.05)
            .paddingOuter(0.05);

        //============create g groups==========
        selection.selectAll('g.lAxis') // qui creiamo le assi evitando duplicati
            .data([0])
            .join('g')
            .attr('class', 'lAxis')
            .attr('transform', 'translate(20,20)')
            .call(lAxis);


        const gs = selection.selectAll('g.bars') // creo una g per ogni barra, e con gs creo le barre
            .data(numbers)
            .join('g').attr('class', 'bars');

        gs.attr('transform', (d, i) => `translate(20, ${30 + scalePos(i)})`);  //'translate()' -> tutti gli elementi avranno la stessa caratteristica

        gs.selectAll('rect')
            .data( d => [d])
            .join('rect')
            .attr('fill', '#89abf3')
            .attr('height', scalePos.bandwidth())
            .attr('width', scaleLength);

        gs.selectAll('text')
            .data(d => [d])
            .join('text')
            .text((d) => d)
            .attr('x', scaleLength)
            .attr('y', scalePos.bandwidth() / 2);

    }

    return my;
}

export default chart;