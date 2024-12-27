const { ipcRenderer } = require('electron');

const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperature',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      pointStyle: false
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: false
      }
    },
    animation: false
  }
});

const maxDataPoints = 60; // 显示最近60个数据点

ipcRenderer.on('data', (event, temperature) => {
  const labels = chart.data.labels;
  const data = chart.data.datasets[0].data;

  labels.push('');
  data.push(temperature);

  if (data.length > maxDataPoints) {
    chart.data.labels = labels.slice(-maxDataPoints);
    chart.data.datasets[0].data = data.slice(-maxDataPoints);
  }

  chart.update();
});