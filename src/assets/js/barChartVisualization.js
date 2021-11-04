const d3 = require('d3');

function chart(){
    // qui ci sono tutte le proprietà della nostra visualizzazione
    let width=600;
    let heigth= 300;

    const scaleLength = d3.scaleLinear() //per creare il mapping dei dati con la rappresentazione visuale
        //.domain([0, d3.max(numbers)])
        .range([0, width]);

    const lAxis = d3.axisTop(scaleLength); // visual scale mapping per l'asse relativa alla lunghezza della barra

    const scalePos = d3.scaleBand() //per avere una buona posizione delle barre rispetto ai dati disponibili
        //.domain(d3.range(numbers.length)) //
        .range([0, heigth])
        .round(true)
        .paddingInner(0.05)
        .paddingOuter(0.05)

    // qui abbiamo tutte le funzioni per modificare i numeri per la nostra visualizzazione ed utilizzare i diversi scale
    function my(selection){
        let numbers = selection.datum(); // estraiamo i dati da rappresentare

        scaleLength.domain([0, d3.max(numbers)])
        scalePos.domain(d3.range(numbers.length))

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

    my.width = function(value){ // per rendere width modificabile dall'esterno
        if(arguments.length) return width;
        width = value;
        scaleLength.range([0, width]);
        return my;
    }
    my.height = function(value){ // per rendere width modificabile dall'esterno
        if(arguments.length) return heigth;
        heigth= value;
        scalePos.range([0, heigth - 50]);
        return my;
    }

    return my;
}

export default chart; // per rendere la funzione importabile
