import React from 'react';
import ProdutoChart from './ProdutoChart';
import { useIntl } from 'react-intl';

const ProdutoChartPage = () => {
  const intl = useIntl(); // Hook useIntl para acessar as mensagens

  return (
    <div>
      <h1>{intl.formatMessage({ id: 'chart.title' })}</h1> {/* Acessando a mensagem do en.json */}
      <ProdutoChart />
    </div>
  );
};

export default ProdutoChartPage;
