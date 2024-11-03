import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useIntl } from 'react-intl'; // Importar useIntl para acessar as mensagens

// Registrar os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProdutoChart = () => {
    const [chartData, setChartData] = useState({});
    const intl = useIntl(); // Hook useIntl para acessar as mensagens do react-intl

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/produto/cadastroprodutolistar');
                const produtos = response.data;

                const labels = produtos.map(produto => produto.nome);
                const data = produtos.map(produto => produto.preco);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: intl.formatMessage({ id: 'chart.labels.prices' }), // Acessando a mensagem do en.json
                            data: data,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error) {
                console.error('Erro ao buscar os dados dos produtos', error);
            }
        };

        fetchData();
    }, [intl]); // Adicionar intl como dependência para que o useEffect seja executado quando as mensagens forem carregadas

    return (
        <div>
            <h2>{intl.formatMessage({ id: 'chart.labels.prices' })}</h2>
            {chartData.labels ? <Bar data={chartData} /> : <p>Carregando...</p>}
        </div>
    );
};

export default ProdutoChart;
