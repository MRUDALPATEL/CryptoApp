import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chart } from "react-chartjs-2";
import { useGetCryptoHistoryQuery } from "../Services/CryptoApi";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CandlestickController,
  CandlestickElement
);

const CryptoChartPage = () => {
  const { coinId } = useParams();
  const [chartType, setChartType] = useState("line");
   const [timePeriod, setTimePeriod] = useState('7d');

  const { data: coinHistory, isLoading, error } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod: "7d",
  });

  useEffect(() => {
    console.log("coinHistory:", coinHistory);
  }, [coinHistory]);

  if (isLoading) return <div>Loading chart data...</div>;
  if (error || !coinHistory?.data?.history?.length) {
    return <div>Error loading chart data.</div>;
  }

  const history = coinHistory?.data?.history
    ?.filter((h) => h?.price)
    .map((h) => ({
      x: new Date(h.timestamp * 1000),
      y: parseFloat(h.price),
    }));

  // LINE & BAR
  const lineData = {
    labels: history.map((h) => h.x),
    datasets: [
      {
        label: "Price (USD)",
        data: history.map((h) => h.y),
        borderColor: "#00f",
        backgroundColor: "rgba(0,0,255,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: history.map((h) => h.x),
    datasets: [
      {
        label: "Price (USD)",
        data: history.map((h) => h.y),
        backgroundColor: "#00f",
      },
    ],
  };

  // CANDLESTICK
  const candleData = {
    datasets: [
      {
        label: "Candlestick",
        data: history.map((h) => ({
          x: h.x,
          o: h.y * 0.95, // mock values if open/high/low missing
          h: h.y * 1.05,
          l: h.y * 0.9,
          c: h.y,
        })),
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "white" } },
    },
    scales: {
      x: { type: "time", time: { unit: "day" }, ticks: { color: "white" } },
      y: { ticks: { color: "white" } },
    },
  };

  const chartDataMap = { line: lineData, bar: barData, candlestick: candleData };

  return (
    <div className="p-6 bg-gray-900 text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Crypto Chart</h1>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        >
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="candlestick">Candlestick</option>
        </select>
        <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-3 py-1 rounded"
          >
            <option value="24h">24h</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="1y">1 Year</option>
          </select>
      </div>

      <Chart
        key={chartType} // Force chart to remount on type change
        type={chartType === "candlestick" ? "candlestick" : chartType}
        data={chartDataMap[chartType]}
        options={chartOptions}
      />
    </div>
  );
};

export default CryptoChartPage;
