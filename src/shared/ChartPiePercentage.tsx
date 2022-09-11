import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { useEffect, useRef } from 'react';
Chart.register(...registerables);

interface ChartPiePercentageProps {
  data: number[];   // array of percentage
  labels: string[]  // array of labels
}

export function ChartPiePercentage  (props: ChartPiePercentageProps) {
  const host = useRef<HTMLCanvasElement>(null); // <canvas> reference
  const myChart = useRef<Chart | null>(null);   // chartJs Reference

  // Initialize Chart
  useEffect(() => {
    if (!myChart.current) {
      // Create a ChartJS instance and initialized with a default configuration
      myChart.current = new Chart(
        host.current!.getContext('2d') as ChartItem, chartConfiguration,
      );
    }
  }, []);

  // Populate Chart when props.data change
  useEffect(() => {
    // update chart data ( project percentages)
    myChart.current!.data.datasets[0].data = props.data
    // update labels ( project names)
    myChart.current!.data.labels = props.labels;
    // update chart
    myChart.current!.update()
  }, [props.data]);

  return (
    <div style={{ width: '100%'}}>
      <canvas ref={host}></canvas>
    </div>
  )
}

// CHART DEFAULT CONFIGURATION
export const chartConfiguration: ChartConfiguration = {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      label: 'My First Dataset',
      data: [20, 30],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 20
    }]
  },
};


