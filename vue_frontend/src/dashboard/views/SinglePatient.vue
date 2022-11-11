<!--
Author: Jennifer Horstmann
-->

<template>
  <div class="singlePatient">
    <base-header
      type=""
      class="pb-6 pb-8 pt-5 pt-md-8"
      style="background-color:#dbe5f3"
    >
      <h1>{{ patientData.first_name }} {{ patientData.last_name }}</h1>
      <h5 class="mb-5 text-uppercase text-muted">
        (Admission:
        {{ new Date(patientData.admission_date).toLocaleDateString("en-GB") }})
      </h5>

      <base-alert type="success text-center" v-if="this.status === 'febrile'"
        ><i class="fa fa-exclamation-triangle mr-2"></i> Patient is in the
        febrile phase
      </base-alert>

      <base-alert type="danger text-center" v-if="this.status === 'critical'"
        ><i class="fa fa-exclamation-triangle mr-2"></i> Patient is in the
        critical phase
      </base-alert>

      <base-alert type="primary text-center" v-if="this.status === 'recovery'"
        ><i class="fa fa-exclamation-triangle mr-2"></i> Patient is in the
        recovery phase
      </base-alert>

      <template v-if="this.reportData == null">
        <new-patient
          :show="true"
          :id="this.id"
          :patient="patientData"
        ></new-patient>
      </template>
    </base-header>

    <!--Charts-->

    <!--    BEGIN CHARTS -->

    <div v-if="charts1">
      <div class="container-fluid mt--7">
        <template v-if="this.reportData">
          <div class="row">
            <div class="col-xl-8 mb-5 mb-xl-0">
              <card type="default" header-classes="bg-transparent">
                <div slot="header" class="row align-items-center">
                  <div class="col">
                    <h6
                      v-if="feverChart.activeIndex === 0"
                      class="text-muted text-uppercase ls-1 mb-1"
                    >
                      Today ({{ new Date().toLocaleDateString() }})
                    </h6>
                    <h6 v-else class="text-light text-uppercase ls-1 mb-1">
                      Course
                    </h6>
                    <h5 class="h3 text-white mb-0">Fever/Pulse</h5>

                    <small class="text-white">Fever in °C</small>
                  </div>
                  <div class="col">
                    <ul class="nav nav-pills justify-content-end">
                      <li class="nav-item mr-2 mr-md-0">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: feverChart.activeIndex === 0 }"
                          @click.prevent="initBigChart(0)"
                        >
                          <span class="d-none d-md-block">Day</span>
                          <span class="d-md-none">D</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: feverChart.activeIndex === 1 }"
                          @click.prevent="initBigChart(1)"
                        >
                          <span class="d-none d-md-block">Course</span>
                          <span class="d-md-none">C</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <line-chart
                  :height="350"
                  :v-if="feverChart.loaded"
                  :chart-data="feverChart.chartData"
                  :options="feverChart.options"
                >
                </line-chart>
              </card>
            </div>

            <div class="col-xl-4">
              <card header-classes="bg-transparent">
                <div slot="header" class="row align-items-center">
                  <div class="col">
                    <h6
                      v-if="redBarChart.activeIndex === 0"
                      class="text-muted text-uppercase ls-1 mb-1"
                    >
                      Today ({{ new Date().toLocaleDateString() }})
                    </h6>
                    <h6 v-else class="text-uppercase text-muted ls-1 mb-1">
                      Course
                    </h6>
                    <h5 class="h3 mb-0">Fluid Input/Output</h5>
                    <small>in ml</small>
                  </div>

                  <div class="col">
                    <ul class="nav nav-pills justify-content-end">
                      <li class="nav-item mr-2 mr-md-0">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: redBarChart.activeIndex === 0 }"
                          @click.prevent="initBarChart(0)"
                        >
                          <span class="d-none d-md-block">Day</span>
                          <span class="d-md-none">D</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: redBarChart.activeIndex === 1 }"
                          @click.prevent="initBarChart(1)"
                        >
                          <span class="d-none d-md-block">Course</span>
                          <span class="d-md-none">C</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <bar-chart
                  :height="350"
                  ref="barChart"
                  :chart-data="redBarChart.chartData"
                >
                </bar-chart>
              </card>
            </div>
          </div>
          <!-- End charts-->
        </template>

        <!--End tables-->
      </div>
    </div>
    <div v-else>
      <div class="container-fluid mt--7">
        <template v-if="this.reportData">
          <div class="row">
            <div class="col-xl-8 mb-5 mb-xl-0">
              <card type="default" header-classes="bg-transparent">
                <div slot="header" class="row align-items-center">
                  <div class="col">
                    <h6
                      v-if="respChart.activeIndex === 0"
                      class="text-muted text-uppercase ls-1 mb-1"
                    >
                      Today ({{ new Date().toLocaleDateString() }})
                    </h6>
                    <h6 v-else class="text-light text-uppercase ls-1 mb-1">
                      Course
                    </h6>
                    <h5 class="h3 text-white mb-0">
                      Respirations/Blood Pressure
                    </h5>

                    <small class="text-white">-</small>
                  </div>
                  <div class="col">
                    <ul class="nav nav-pills justify-content-end">
                      <li class="nav-item mr-2 mr-md-0">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: respChart.activeIndex === 0 }"
                          @click.prevent="initRespChart(0)"
                        >
                          <span class="d-none d-md-block">Day</span>
                          <span class="d-md-none">D</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: respChart.activeIndex === 1 }"
                          @click.prevent="initRespChart(1)"
                        >
                          <span class="d-none d-md-block">Course</span>
                          <span class="d-md-none">C</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <line-chart
                  :height="350"
                  :v-if="respChart.loaded"
                  :chart-data="respChart.chartData"
                  :extra-options="respChart.extraOptions"
                >
                </line-chart>
              </card>
            </div>

            <div class="col-xl-4">
              <card header-classes="bg-transparent">
                <div slot="header" class="row align-items-center">
                  <div class="col">
                    <h6
                      v-if="balanceChart.activeIndex === 0"
                      class="text-muted text-uppercase ls-1 mb-1"
                    >
                      Today ({{ new Date().toLocaleDateString() }})
                    </h6>
                    <h6 v-else class="text-uppercase text-muted ls-1 mb-1">
                      Course
                    </h6>
                    <h5 class="h3 mb-0">Fluid Balance</h5>
                    <small>in ml</small>
                  </div>

                  <div class="col">
                    <ul class="nav nav-pills justify-content-end">
                      <li class="nav-item mr-2 mr-md-0">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: balanceChart.activeIndex === 0 }"
                          @click.prevent="initBalanceChart(0)"
                        >
                          <span class="d-none d-md-block">Day</span>
                          <span class="d-md-none">D</span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link py-2 px-3"
                          href="#"
                          :class="{ active: balanceChart.activeIndex === 1 }"
                          @click.prevent="initBalanceChart(1)"
                        >
                          <span class="d-none d-md-block">Course</span>
                          <span class="d-md-none">C</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                <bar-chart
                  :height="350"
                  ref="balanceChart"
                  :chart-data="balanceChart.chartData"
                >
                </bar-chart>
              </card>
            </div>
          </div>
          <!-- End charts-->
        </template>

        <!--End tables-->
      </div>
    </div>

    <!--    CHART SWITCH -->

    <div class="divider"></div>

    <div class="container-fluid">
      <!--      <div class="col">-->
      <ul class="nav nav-pills justify-content-end">
        <li class="nav-item mb-2 mr-2 mr-md-0">
          <a
            class="nav-link py-2 px-3"
            href="#"
            :class="{ active: charts1 === true }"
            @click.prevent="charts1 = true"
          >
            <span class="d-none d-md-block">1</span>
            <span class="d-md-none">1</span>
          </a>
        </li>
        <li class="nav-item mb-2 mr-2 mr-md-0">
          <a
            class="nav-link py-2 px-3"
            href="#"
            :class="{ active: charts1 === false }"
            @click.prevent="charts1 = false"
          >
            <span class="d-none d-md-block">2</span>
            <span class="d-md-none">2</span>
          </a>
        </li>
      </ul>
      <!--    </div>-->
    </div>

    <!--    END CHARTS -->

    <!-- INPUT NEW REPORT -->
    <div class="container-fluid mt--2">
      <template v-if="this.reportData">
        <div class="row mt-5">
          <div class="col-xl-12 mb-5 mb-xl-0">
            <report
              v-bind:id="this.id"
              v-bind:data="this.reportData.history"
            ></report>
          </div>
        </div>

        <!--Tables-->
        <div class="row mt-5">
          <div class="col-xl-12 mb-5 mb-xl-0">
            <reports-table v-bind:id="this.id"></reports-table>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "../components/Charts/config";
import LineChart from "../components/Charts/LineChart";
import BarChart from "../components/Charts/BarChart";

// Tables
import ReportsTable from "./Dashboard/ReportsTable";

import Report from "./Dashboard/Report";
import NewPatient from "./NewPatient";

export default {
  components: {
    NewPatient,
    LineChart,
    BarChart,
    ReportsTable,
    Report
  },
  name: "patient",
  props: ["id"],
  data() {
    return {
      charts1: true,
      loaded: false,
      status: "",
      redBarChart: {
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "",
              data: []
            }
          ]
        },
        extraOptions: chartConfigs.barChartOptions
      },
      balanceChart: {
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "",
              data: []
            }
          ]
        },
        extraOptions: chartConfigs.barChartOptions
      },
      feverChart: {
        loaded: false,
        activeIndex: 0,
        chartData: {},
        options: {}
      },
      respChart: {
        loaded: false,
        activeIndex: 0,
        chartData: {},
        extraOptions: chartConfigs.blueChartOptions
      }
    };
  },
  methods: {
    calcTimedelta(historyObj) {
      var timedelta =
        new Date(historyObj.datetime) -
        new Date(this.patientData.admission_date);
      return (
        "Day " + (Math.round(Math.abs(timedelta / (1000 * 3600 * 24))) + 1)
      );
    },

    weekFeverChart() {
      var feverArray = [];
      var pulseArray = [];
      var columnArray = [];
      var sameDays = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              columnArray.indexOf(this.calcTimedelta(sortHistory[i])) === -1
            ) {
              columnArray.push(this.calcTimedelta(sortHistory[i]));
              sameDays = sortHistory.filter(
                el =>
                  new Date(el.datetime).getDate() ===
                  new Date(sortHistory[i].datetime).getDate()
              );

              var tmpFeverArray = [];
              var tmpPulseArray = [];

              for (var x in sameDays) {
                tmpFeverArray.push(parseFloat(sameDays[x].fever));
                tmpPulseArray.push(parseInt(sameDays[x].pulse));
              }
              feverArray.push(Math.max(...tmpFeverArray));
              pulseArray.push(Math.max(...tmpPulseArray));
            }
            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Fever",
            data: feverArray
          },
          {
            label: "Pulse",
            data: pulseArray,
            borderColor: "#fb6340",
            backgroundColor: "#fb6340",
            fill: false
          }
        ]
      };

      let options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 50,
                stepSize: 10
              }
            }
          ]
        }
      };

      this.feverChart.options = options;
      console.log(this.feverChart);

      this.feverChart.chartData = chartData;
    },

    dayFeverChart() {
      var feverArray = [];
      var pulseArray = [];
      var columnArray = [];
      var fever = null;
      var pulse = null;
      var column = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              new Date(sortHistory[i].datetime).getDate() ===
              new Date().getDate()
            ) {
              fever = sortHistory[i].fever;
              pulse = sortHistory[i].pulse;
              column = sortHistory[i].daytime;

              feverArray.push(parseFloat(fever));
              pulseArray.push(parseFloat(pulse));
              columnArray.push(column);
            }
            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Fever",
            data: feverArray
          },
          {
            label: "Pulse",
            data: pulseArray,
            borderColor: "#fb6340",
            backgroundColor: "#fb6340",
            fill: false
          }
        ]
      };

      let options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 50,
                stepSize: 10
              }
            }
          ]
        }
      };

      this.feverChart.options = options;

      this.feverChart.chartData = chartData;
    },

    dayFluidChart() {
      var fluidInputArray = [];
      var fluidOutputArray = [];
      var fluid8hInputArray = [];
      var fluid8hOutputArray = [];
      var columnArray = [];

      var fluidInput = null;
      var fluidOutput = null;
      var fluid8hInput = null;
      var fluid8hOutput = null;
      var column = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              new Date(sortHistory[i].datetime).getDate() ===
              new Date().getDate()
            ) {
              fluidInput = sortHistory[i].fi_total;
              fluidOutput = sortHistory[i].fo_total;
              fluid8hInput = sortHistory[i].fi_eight_hrs;
              fluid8hOutput = sortHistory[i].fo_eight_hrs;
              column = sortHistory[i].daytime;
              fluidInputArray.push(parseFloat(fluidInput));
              fluidOutputArray.push(parseFloat(fluidOutput));
              fluid8hInputArray.push(parseFloat(fluid8hInput));
              fluid8hOutputArray.push(parseFloat(fluid8hOutput));
              columnArray.push(column);
            }
            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Total Input",
            data: fluidInputArray,
            borderColor: "#2dce89",
            backgroundColor: "#2dce89"
          },
          {
            label: "Total Output",
            data: fluidOutputArray,
            borderColor: "#5e72e4",
            backgroundColor: "#5e72e4"
          },
          {
            label: "8h Input",
            data: fluid8hInputArray,
            borderColor: "#adb5bd",
            backgroundColor: "#adb5bd"
          },
          {
            label: "8h Output",
            data: fluid8hOutputArray,
            borderColor: "#212529",
            backgroundColor: "#212529"
          }
        ]
      };
      this.redBarChart.chartData = chartData;
    },

    weekFluidChart() {
      var columnArray = [];
      var fluidInputArray = [];
      var fluidOutputArray = [];
      var fluid8hInputArray = [];
      var fluid8hOutputArray = [];
      var sameDays = null;

      var sortHistory = [].slice
        .call(this.reportData.history)
        .sort(function(a, b) {
          return new Date(a.datetime) - new Date(b.datetime);
        });

      if (this.reportData != null) {
        if (this.reportData.history) {
          for (var i = 0; i < sortHistory.length; i++) {
            if (
              columnArray.indexOf(this.calcTimedelta(sortHistory[i])) === -1
            ) {
              columnArray.push(this.calcTimedelta(sortHistory[i]));
              sameDays = sortHistory.filter(
                el =>
                  new Date(el.datetime).getDate() ===
                  new Date(sortHistory[i].datetime).getDate()
              );

              var tmpInputArray = [];
              var tmpOutputArray = [];
              var tmp8hInputArray = [];
              var tmp8hOutputArray = [];

              for (var x in sameDays) {
                tmpInputArray.push(parseFloat(sameDays[x].fi_total));
                tmpOutputArray.push(parseInt(sameDays[x].fo_total));
                tmp8hInputArray.push(parseFloat(sameDays[x].fi_eight_hrs));
                tmp8hOutputArray.push(parseInt(sameDays[x].fo_eight_hrs));
              }
              fluidInputArray.push(tmpInputArray.reduce((a, b) => a + b));
              fluidOutputArray.push(tmpOutputArray.reduce((a, b) => a + b));
              fluid8hInputArray.push(tmp8hInputArray.reduce((a, b) => a + b));
              fluid8hOutputArray.push(tmp8hOutputArray.reduce((a, b) => a + b));
            }

            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Total Input",
            data: fluidInputArray,
            borderColor: "#2dce89",
            backgroundColor: "#2dce89"
          },
          {
            label: "Total Output",
            data: fluidOutputArray,
            borderColor: "#5e72e4",
            backgroundColor: "#5e72e4"
          },
          {
            label: "8h Input",
            data: fluid8hInputArray,
            borderColor: "#adb5bd",
            backgroundColor: "#adb5bd"
          },
          {
            label: "8h Output",
            data: fluid8hOutputArray,
            borderColor: "#212529",
            backgroundColor: "#212529"
          }
        ]
      };
      this.redBarChart.chartData = chartData;
    },

    checkStatus() {
      if (this.reportData != null) {
        if (this.reportData.history != null) {
          if (this.reportData.history) {
            var sortHistory = [].slice
              .call(this.reportData.history)
              .sort(function(a, b) {
                return new Date(a.datetime) - new Date(b.datetime);
              });
          }
        }
        this.status = sortHistory[sortHistory.length - 1].status;
      }
    },

    dayRespChart() {
      var respArray = [];
      var diaArray = [];
      var sysArray = [];
      var columnArray = [];
      var respiration = null;
      var systolic = null;
      var diastolic = null;
      var column = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              new Date(sortHistory[i].datetime).getDate() ===
              new Date().getDate()
            ) {
              respiration = sortHistory[i].respiration;
              diastolic = sortHistory[i].bp_dia;
              systolic = sortHistory[i].bp_sys;
              column = sortHistory[i].daytime;

              respArray.push(parseInt(respiration));
              diaArray.push(parseFloat(diastolic));
              sysArray.push(parseFloat(systolic));
              columnArray.push(column);
            }
            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Respirations",
            data: respArray
          },
          {
            label: "Systolic",
            data: sysArray,
            borderColor: "#fb6340",
            backgroundColor: "#fb6340",
            fill: false
          },
          {
            label: "Diastolic",
            data: diaArray,
            borderColor: "#f3a4b5",
            backgroundColor: "#f3a4b5",
            fill: false
          }
        ]
      };
      this.respChart.chartData = chartData;
    },
    weekRespChart() {
      var respArray = [];
      var diaArray = [];
      var sysArray = [];
      var columnArray = [];
      var sameDays = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              columnArray.indexOf(this.calcTimedelta(sortHistory[i])) === -1
            ) {
              columnArray.push(this.calcTimedelta(sortHistory[i]));
              sameDays = sortHistory.filter(
                el =>
                  new Date(el.datetime).getDate() ===
                  new Date(sortHistory[i].datetime).getDate()
              );

              var tmpRespArray = [];
              var tmpDiaArray = [];
              var tmpSysArray = [];

              for (var x in sameDays) {
                tmpRespArray.push(parseFloat(sameDays[x].respiration));
                tmpDiaArray.push(parseInt(sameDays[x].bp_dia));
                tmpSysArray.push(parseInt(sameDays[x].bp_sys));
              }
              respArray.push(Math.max(...tmpRespArray));
              diaArray.push(Math.max(...tmpDiaArray));
              sysArray.push(Math.max(...tmpSysArray));
            }

            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Respirations",
            data: respArray
          },
          {
            label: "Systolic",
            data: sysArray,
            borderColor: "#fb6340",
            backgroundColor: "#fb6340",
            fill: false
          },
          {
            label: "Diastolic",
            data: diaArray,
            borderColor: "#f3a4b5",
            backgroundColor: "#f3a4b5",
            fill: false
          }
        ]
      };
      this.respChart.chartData = chartData;
    },

    dayBalanceChart() {
      var balanceArray = [];
      var columnArray = [];

      var fluidInput = null;
      var fluidOutput = null;
      var column = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              new Date(sortHistory[i].datetime).getDate() ===
              new Date().getDate()
            ) {
              fluidInput = sortHistory[i].fi_total;
              fluidOutput = sortHistory[i].fo_total;
              column = sortHistory[i].daytime;
              balanceArray.push(
                parseFloat(fluidInput) - parseFloat(fluidOutput)
              );
              columnArray.push(column);
            }
            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Balance",
            data: balanceArray,
            borderColor: "#2dce89",
            backgroundColor: "#2dce89"
          }
        ]
      };
      this.balanceChart.chartData = chartData;
    },

    weekBalanceChart() {
      var columnArray = [];
      var balanceArray = [];
      var sameDays = null;

      if (this.reportData != null) {
        if (this.reportData.history) {
          var sortHistory = [].slice
            .call(this.reportData.history)
            .sort(function(a, b) {
              return new Date(a.datetime) - new Date(b.datetime);
            });

          for (var i = 0; i < sortHistory.length; i++) {
            if (
              columnArray.indexOf(this.calcTimedelta(sortHistory[i])) === -1
            ) {
              columnArray.push(this.calcTimedelta(sortHistory[i]));
              sameDays = sortHistory.filter(
                el =>
                  new Date(el.datetime).getDate() ===
                  new Date(sortHistory[i].datetime).getDate()
              );

              var tmpInputArray = [];
              var tmpOutputArray = [];
              var tmpBalanceArray = [];

              for (var x in sameDays) {
                tmpInputArray.push(parseFloat(sameDays[x].fi_total));
                tmpOutputArray.push(parseInt(sameDays[x].fo_total));
                tmpBalanceArray.push(
                  parseFloat(sameDays[x].fi_total) -
                    parseInt(sameDays[x].fo_total)
                );
              }
              balanceArray.push(tmpBalanceArray.reduce((a, b) => a + b));
            }

            this.loaded = true;
          }
        }
      }

      let chartData = {
        labels: columnArray,
        datasets: [
          {
            label: "Balance",
            data: balanceArray.reverse(),
            borderColor: "#2dce89",
            backgroundColor: "#2dce89"
          }
        ]
      };
      this.balanceChart.chartData = chartData;
    },

    initBigChart(index) {
      this.feverChart.activeIndex = index;
      if (index === 0) {
        this.dayFeverChart();
      } else if (index === 1) {
        this.weekFeverChart();
      }
    },

    initBarChart(index) {
      this.redBarChart.activeIndex = index;
      if (index === 0) {
        this.dayFluidChart();
      } else if (index === 1) {
        this.weekFluidChart();
      }
    },

    initRespChart(index) {
      this.respChart.activeIndex = index;
      if (index === 0) {
        this.dayRespChart();
      } else if (index === 1) {
        this.weekRespChart();
      }
    },

    initBalanceChart(index) {
      this.balanceChart.activeIndex = index;
      if (index === 0) {
        this.dayBalanceChart();
      } else if (index === 1) {
        this.weekBalanceChart();
      }
    }
  },
  watch: {
    reportData() {
      this.checkStatus();
      this.initBigChart(0);
      this.initBarChart(0);
      this.initRespChart(0);
      this.initBalanceChart(0);
    }
  },
  computed: {
    reportData() {
      return this.$store.getters.getReportById(Number(this.id));
    },

    patientData() {
      return this.$store.getters.getPatientById(Number(this.id));
    },

    ownNotifications() {
      return this.$store.getters.ownNotifications;
    }
  },
  async mounted() {
    //this.checkStatus();
    this.initBigChart(0);
    this.initBarChart(0);
    this.initRespChart(0);
    this.initBalanceChart(0);
  },
  created() {
    this.checkStatus();
  }
};
</script>
<style scoped>
.divider {
  height: 1.5rem !important;
}

.singlePatient {
  min-height: 100vh !important;
}

.datetime-picker input {
  border: 1px solid #cad1d7;
  border-radius: 0.375rem;
  height: calc(1.5em + 1.25rem + 2px);
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  font-size: 0.875rem;
  min-width: 0 !important;
  display: block;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: #8898aa;
  background-color: #fff;
  background-clip: padding-box;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.vdatetime-popup {
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  z-index: 1000 !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  -webkit-transform: translate(-50%, -50%) !important;
  transform: translate(-50%, -50%) !important;
  width: 340px !important;
  max-width: calc(100% - 30px) !important;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3) !important;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3) !important;
}

input.vdatetime-input {
  display: none !important;
}

.modal {
  z-index: 700 !important;
}

.vdatetime-popup {
  z-index: 900 !important;
}

.vdatetime-overlay {
  z-index: 800 !important;
}
</style>
