<template>
  <Bar
    :options="chartOptions"
    :data="selectedDataBar"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    selectedDataBar: {
      type: Object
    },
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chartData: {
        labels: [
          " artist1",
          "artist2",
          "artist3",
          "artist4",
          "artist5",
          "artist6",
          "artist7",
          "artist8",
          "artist99",
          "artist10",
          "artist11",
          "artist12",
          "artist13",
          "artist14",
          "artist15",
          "artist16",
          "artist17",
          "artist18",
        ],
        datasets: [
          {
            barPercentage: 0,
            barThickness: 1,
            maxBarThickness: 15,
            skipNull: true,
            minBarLength: 1,
            data: [
              250, 120, 120, 140, 160, 280, 400, 350, 270, 290, 300, 340, 350,
              360, 450, 460, 420,
            ],
            backgroundColor: ["#D7EB5A"],
          },
        ],
      },
      chartOptions: {
        responsive: false,
        // eslint-disable-next-line vue/no-computed-properties-in-data
        barThickness: this.getNewBarThickness,
        barPercentage: 1,
        indexAxis: "x",
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    getNewBarThickness() {
      if (this.selectedDataBar.labels.length <= 10) {
        console.log(this.selectedDataBar.labels.length)
        return 25
      }
    }
  }
}
</script>