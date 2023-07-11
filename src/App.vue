<template>
  <div class="bg-img" >
    <div class="bg-img event-details"  @click="closeOptions($event)">
      <div class="container position-relative" >
        <div class="header"><span>ADD EVENT DETAILS</span></div>
        <div class="header2"><span>Attract artist to perform</span></div>
        <div class="input-class">
          <label for="input1" class="input-value">
            <span>SUGGESTED SOUND:</span>
            <div
              class="tags"
              v-for="(item, index) in limitedValue"
              :key="index"
            >
              {{ item }}
              <span class="tag-remove" @click="removeTag(index)">&#215;</span>
            </div>
          </label>
          <input
          id="input1"
            ref="tagsInput"
            class="tags-input"
            type="text"
            placeholder="Add more tags here"
            maxlength="18"
            v-model="selectedOption"
            @keyup.enter="updateValue"
            :disabled="value.length >= 5"
            @focus="showOptions"
            @input="updateTagValue($event.target.value)"
            />
          <datalist v-if="isVisible" class="datalist" id="customOptions">
          <option @click="updateTagValue($event.target.value)">Dancing</option>
          <option @click="updateTagValue($event.target.value)">Rock</option>
          <option @click="updateTagValue($event.target.value)">Greate for dinning</option>
          </datalist>

        </div>
        <div class="position-absolute" style="bottom: 13px;">
          <BarChart
            :style="{ 'paddingRight': leftPosition + 10 + 'px', 'paddingLeft': 25 + rightPosition + 'px' }"
            :width="515"
            :height="40"
            :selectedDataBar="chartDataBar"
          />
        </div>
        <div class="budget">
          <div class="header3"><span>YOUR BUDGET</span></div>
          <div class="range-slider">
            <vue-slider
              class="slider-select"
              v-model="values"
              :min="50"
              :max="500"
              step="10"
            />
            <div class="sums">
              <span>50</span>
              <span>500+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
import BarChart from './components/BarChart.vue'

export default {
  name: "BlaBla",
  components: {
    VueSlider,
    BarChart
  },
  data() {
    return {
      selectedOption: "",
      item:'',
      isVisible: false,
      inputValue: "",
      value: [],
      filterChartData: null,
      chartInstance: null,
      selectedDataBar: '',
      selectedDataHeight: '',
      values: [50, 500],
      mockDataChart: [
              250, 120, 120, 140, 160, 280, 400, 350, 270, 290, 300, 340, 350,
              360, 450, 460, 420,
            ]
    };
  },
  methods: {
    removeTag(index) {
      this.value.splice(index, 1)
    },
    updateValue() {
      if (this.inputValue.trim() !== "") {
        this.value.push(this.inputValue)
        this.inputValue = ""
        this.selectedOption = ""
        this.isVisible = true
      }
    },
    showOptions() {
      this.isVisible = !this.isVisible
    },
    updateTagValue(value) {
      this.item = value
      this.selectedOption = value
      this.inputValue = value
      this.isVisible = true
      this.$nextTick(() => {
      this.$refs.tagsInput.focus()
    })
  },
  closeOptions(event) {
    if (event && !event.target.classList.contains('tags-input')) {
    this.isVisible = false
  }
},
  },
  computed: {
    changeChartData() {
      let min = this.values[0]
      let max = this.values[1]
      let mockDataChartTest = this.mockDataChart
      return mockDataChartTest.filter(item => item >= min && item <= max)
    },
    chartDataBar () {
      return {
        labels: this.changeChartData,
        datasets: [{
          // label: this.date,
          data: [ 70, 233, 265, 300, 345, 345, 64, 123, 342, 56, 83, 313, 255, 364, 412, 375, 146],
          backgroundColor: [
            '#D7EB5A'
          ],
          borderWidth: 1,

        }]
      }
    },
    rightPosition () {
      let min = 50
      return this.values[0] - min
    },
    leftPosition () {
      let max = 500
      return max - this.values[1]
    },
    width () {
      let rangeValue = this.values[1] - this.values[0]
      let procentWidth = (rangeValue * 100) / 450
      return ((procentWidth ) * 515) / 100
    },
    limitedValue() {
      return this.value.slice(0, 5)
    }
  }
};
</script>

<style>
.bg-img {
  background: url("./assets/image2.png");
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.event-details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 50px;
  gap: 74px;
  width: 817px;
  height: 678px;
  background: rgba(22, 22, 22, 0.7);
  border-radius: 20px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  height: 24px;
  display: flex;
  /* 2. Headline */

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 24px;
  /* identical to box height, or 114% */

  letter-spacing: 3px;
  text-transform: uppercase;

  color: #ffffff;
}

.header2 {
  width: 571px;
  height: 27px;
  padding: 18px;
  display: flex;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  /* identical to box height, or 27px */
  text-align: center;
  letter-spacing: 3px;
  color: #ffffff;
  justify-content: center;
  align-items: flex-start;
}

.input-class {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.tags-input {
  border: 1px solid #b8b8b8;
  border-radius: 50px;
  width: 717px;
  height: 40px;
  padding-left: 30px;
  background: rgba(22, 22, 22, 0.7);
  color: #ffffff;
  position: relative;
}

.tags-input::placeholder {
  text-align: left;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  /* identical to box height, or 171% */

  letter-spacing: -0.01em;
  font-feature-settings: "calt" off;

  color: #ffffff;
}

.input-value {

  height: 22px;
  padding: 20px;
  margin-bottom: 40px;
  /* category */

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-feature-settings: "calt" off;

  /* white */

  color: #ffffff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.tags {
  /* width: 19%;
    height: 20px; */
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1em;
  color: #ffffff;
  background: rgba(22, 22, 22, 0.7);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
  text-transform: capitalize;
  border: 1px solid #fff;
  margin: 2px;

  flex: none;
  order: 0;
  flex-grow: 0;
}
.tag-remove {
  display: inline-flex;
  cursor: pointer;
  color: rgb(236, 236, 236);
  margin-right: 2px;
}
.selected-value {
  height: 20px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;

  color: #ffffff;
}
.header3 {
  margin-top: 42px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */
  text-align: center;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-feature-settings: "calt" off;
  /* white */
  color: #ffffff;
}
.slider-select .vue-slider-process {
  background-color: yellow;
  background: #d7eb5a;
  border-radius: 10px;
  cursor: pointer;
}
.slider-select .vue-slider-piecewise {
  background-color: yellow;
}
.slider-select.vue-slider-wrapper {
  border-color: yellow;
}
.vue-slider-dot-handle {
  background: #49306b;
  width: 30px;
  height: 30px;
  position: absolute;
  top: -8px;
}
.vue-slider-rail {
  background-color: #ccc;
  border-radius: 15px;
  height: 7px;
}
.vue-slider-dot-tooltip-inner {
  font-family: "Helvetica";
  display: block;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 150%;
  /* identical to box height, or 27px */
  position: relative;
  left: 8px;
  color: #d7eb5a;
  background: none;
  opacity: 0.6;
}
.vue-slider-dot-tooltip-inner-top::after {
  display: none;
}
.sums {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 21px;
  font-family: "Helvetica";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 150%;
  /* identical to box height, or 27px */
  color: #ffffff;
  opacity: 0.6;
}
.range-slider {
  width: 515px;
  margin-top: 82px;
  height: 20px;
  position: relative;
}
.chartjs-render-monitor .chartjs-size-monitor {
  opacity: 0;
  overflow: hidden !important;
}
.bar-slider {
  width: 70%;
  position: relative;
  height: 40px;
  top: -100px;
  /* width: inherit; */
}

.datalist {
  display: flex;
  flex-direction: column;
  top: 125px;
  min-width: 100%;
  padding-left: 32px;
  background: rgba(22, 22, 22, 0.9);
  position: absolute;
  z-index: 45665465;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 35px;
  /* or 250% */
  letter-spacing: -0.01em;
  font-feature-settings: "calt" off;
  color: #ffffff;
  cursor: pointer;
}
</style>
