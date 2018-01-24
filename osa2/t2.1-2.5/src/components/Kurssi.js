import React from 'react';


const Otsikko = ( {nimi} ) => {
    return (
        <div>
            <h1>{nimi}</h1>
        </div>

    )
}

const Sisalto = ( {osat} ) => {
 
    return (
        <div>
           {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
        </div>

    )
}

const Yhteensa = ( {osat} ) => {

    let yht = osat.reduce(function (a, b) {
        return a + b.tehtavia;
    }, 0)
    return (
        <div>
            <p>Yhteensä {yht} tehtävää</p>
        </div>

    )
}

const Osa = ({ osa }) => {
    return (
        <div>
            <p>{osa.nimi} {osa.tehtavia}</p>
        </div>
    )
}

const Kurssi = ({ kurssi }) => {

    return (
        <div>
            <Otsikko nimi={kurssi.nimi}/>
            <Sisalto osat={kurssi.osat}/>
            <Yhteensa osat={kurssi.osat}/>
        </div>
    )
}


export default Kurssi