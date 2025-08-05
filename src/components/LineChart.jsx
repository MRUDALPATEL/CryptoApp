import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import 'chartjs-adapter-date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ Proper registration for Chart.js v3+
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
const coinTimestamp = [];

const historyData = coinHistory?.data?.history || [];

for (let i = 0; i < historyData.length; i++) {
  const { price, timestamp } = historyData[i];
  coinPrice.push(price);
  coinTimestamp.push(
    new Date(timestamp * 1000).toLocaleDateString("en-GB") // Adjust format if needed
  );
}



  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        borderColor: '#0071bd',
        backgroundColor: '#0071bd',
        tension: 0.3,
      },
    ],
  };

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    y: {
      beginAtZero: false,
    },
  },
};

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <div className=" h-[400px] w-full">
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default LineChart;
