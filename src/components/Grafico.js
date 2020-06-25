import React from 'react';
import {Bar} from 'react-chartjs-2';

class Grafico extends React.Component{
    constructor(props){
        super(props);
        const legendas = [];
        const dados = [];
        const cores = [];
        let total = 0;
        this.props.dados.forEach(conta =>
            {
                legendas.push(conta.nome);
                if(conta.tipo === 'Entrada'){
                    total += Number(conta.valor)
                    dados.push(Number(conta.valor));
                    cores.push('rgba( 0, 244, 00 , 0.80)');
                }else{
                    total -= Number(conta.valor)
                    dados.push(-Number(conta.valor));
                    cores.push('rgba( 244, 0, 0 , 0.80)');
                }
            }
        );
        legendas.push('Total');
        dados.push(total);
        if(total > 0){
            cores.push('rgba( 0, 244, 00 , 0.80)');
        }else{
            cores.push('rgba( 244, 0, 0 , 0.80)');
        }
        this.state = {
            chartData:{
                labels: legendas,
                datasets:[
                    {
                        label: 'Dinheiro',
                        data: dados,
                        backgroundColor: cores
                    }
                ]
            }
        }
    }

    render(){
        return(
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    options={{maintainAspectRatio: false }}
                    height={500}
                    width={100}
                />
            </div>
        );
    }
}

export default Grafico;