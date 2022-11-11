<!--
Author: Jennifer Horstmann
Content: Report table and report editing modal
-->

<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="row">
          <h3 class="mb-0 ml-5 mr-5 pt-2">Report Data</h3>
          <base-button
            @click="
              editModal = true;
              newReport = true;
            "
            class="btn btn-md"
            type="primary"
          >
            Add New Report
          </base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover" thead-classes="thead-light">
        <thead>
          <tr>
            <th></th>
            <!--          TODO: ADMISSION DATE STATT CREATED AT FOR PRESENTATION -->
            <th v-for="(item, i) in tableData" :key="i" class="text-center">
              Day
              {{
                Math.round(
                  Math.abs(
                    (new Date(item.datetime) -
                      new Date(patientData.admission_date)) /
                      (1000 * 3600 * 24) +
                      1
                  )
                )
              }}
            </th>
          </tr>
          <tr>
            <th></th>
            <th v-for="(item, i) in tableData" :key="i" class="text-center">
              {{ item.daytime }}
            </th>

            <!-- <th>
              <select v-model="daytime" class="form-control">
                <option
                  v-bind:value="dayt.time"
                  v-for="dayt in daytimes"
                  v-bind:key="dayt.time"
                  >{{ dayt.time }}
                </option>
              </select>
            </th> -->
          </tr>
        </thead>

        <tbody>
          <tr>
            <th>Time</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{
                new Date(item.datetime).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })
              }}
            </td>
            <!-- <td>
              <base-input
                disabled
                :value="new Date(this.date).toLocaleString()"
                placeholder="Select Datetime"
              ></base-input>
              <base-button
                @click="openDateTimePicker('date-table')"
                icon="fa fa-calendar"
                class="btn btn-md col-md-12"
                type="primary"
              ></base-button>
            </td> -->
          </tr>

          <tr>
            <th>Day of fever</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.day_of_fever }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="day_of_fever"
                v-model.number="day_of_fever"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Fever</th>
            <td v-for="(item, i) in tableData" :key="i">{{ item.fever }} °C</td>
            <!-- <td>
              <base-input
                id="fever"
                v-model="fever"
                placeholder="in °C"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Pulse</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.pulse }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="pulse"
                v-model.number="pulse"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr class="bottom-line">
            <th>Respirations</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.respiration }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="respiration"
                v-model.number="respiration"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Blood<br />Pressure</th>
          </tr>
          <tr>
            <th>Systolic</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.bp_sys }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="bp_sys"
                v-model.number="bp_sys"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Diastolic</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.bp_dia }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="bp_dia"
                v-model.number="bp_dia"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr class="bottom-line">
            <th>Diet</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.diet }}
            </td>
            <!-- <td>
              <base-input id="diet" v-model="diet"></base-input>
            </td> -->
          </tr>

          <tr>
            <th>FLUID<br />INTAKE</th>
          </tr>

          <tr>
            <th>Oral Fluids</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fi_oral }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fi_oral"
                v-model.number="fi_oral"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Parenteral</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fi_parenteral }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fi_parenteral"
                v-model.number="fi_parenteral"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Other</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fi_other }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fi_other"
                v-model.number="fi_other"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>In 8 hrs</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fi_eight_hrs }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fi_eight_hrs"
                v-model.number="fi_eight_hrs"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr class="bottom-line">
            <th>Total</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ calcFiTotal(item) }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fi_total"
                v-model.number="fi_total"
                disabled
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>FLUID<br />OUTPUT</th>
          </tr>

          <tr>
            <th>Urine</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fo_urine }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fo_urine"
                v-model.number="fo_urine"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>UF</th>
            <td v-for="(item, i) in tableData" :key="i">{{ item.fo_uf }} ml</td>
            <!-- <td>
              <base-input
                type="number"
                id="fo_uf"
                v-model.number="fo_uf"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Emesis</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fo_emesis }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fo_emesis"
                v-model.number="fo_emesis"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Drainage</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fo_drainage }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fo_drainage"
                v-model.number="fo_drainage"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>In 8 hrs</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.fo_eight_hrs }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fo_eight_hrs"
                v-model.number="fo_eight_hrs"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Total</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ calcFoTotal(item) }} ml
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="fo_total"
                v-model.number="fo_total"
                disabled
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Pain score</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.pain_score }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="pain_score"
                v-model.number="pain_score"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Abd. Cir.</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.abd_cir }} cm
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="abd_cir"
                v-model.number="abd_cir"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in cm"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Stools</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.stools }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="stools"
                v-model.number="stools"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Urine</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.urine }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="urine"
                v-model.number="urine"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Weight</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.weight }} kg
            </td>
            <!-- <td>
              <base-input
                id="weight"
                v-model.number="weight"
                placeholder="in kg"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Height</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.height }} cm
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="height"
                v-model.number="height"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in cm"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>O2 Sat</th>
            <td v-for="(item, i) in tableData" :key="i">{{ item.o2sat }} %</td>
            <!-- <td>
              <base-input
                type="number"
                id="o2sat"
                v-model.number="o2sat"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in %"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Hematocrit</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.hematocrit }} %
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="hematocrit"
                v-model.number="hematocrit"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in %"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>
              Platelet<br />
              Count
            </th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.platelet }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="platelet"
                v-model.number="platelet"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>
              WBC<br />
              Count
            </th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.wbc }}
            </td>
            <!-- <td>
              <base-input
                type="number"
                id="wbc"
                v-model.number="wbc"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Status</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.status }}
            </td>
            <!-- <td>
              <select v-model="status" class="form-control">
                <option
                  v-bind:value="stat.option"
                  v-for="stat in statusOptions"
                  v-bind:key="stat.option"
                  >{{ stat.option }}
                </option>
              </select>
            </td> -->
          </tr>

          <tr>
            <th>Monitoring<br />Interval</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.monitoring_interval }} hourly
            </td>
            <!-- <td>
              <select v-model="monitoring_interval" class="form-control">
                <option
                  v-for="option in intervals"
                  v-bind:value="option.interval"
                  v-bind:key="option.interval"
                  >{{ option.interval }}
                </option>
              </select>
            </td> -->
          </tr>

          <tr>
            <th>Warning<br />Signs</th>
            <td v-for="(item, i) in tableData" :key="i">
              <div class="wordbreak">
                {{ item.warning_signs }}
              </div>
            </td>
            <!-- <td>
              <base-input
                type="text"
                id="warning_signs"
                v-model="warning_signs"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Additional<br />Info</th>
            <td v-for="(item, i) in tableData" :key="i">
              <div class="wordbreak">
                {{ item.additional }}
              </div>
            </td>
            <!-- <td>
              <base-input
                type="text"
                id="additional"
                v-model="additional"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Medical<br />Advice</th>
            <td v-for="(item, i) in tableData" :key="i">
              <div class="wordbreak">
                {{ item.medical_advice }}
              </div>
            </td>
            <!-- <td>
              <base-input
                type="text"
                id="medical_advice"
                v-model="medical_advice"
              ></base-input>
            </td> -->
          </tr>

          <tr>
            <th>Created<br />By</th>
            <td v-for="(item, i) in tableData" :key="i">
              {{ item.history_user_name }}
            </td>
            <td></td>
          </tr>

          <tr>
            <th>Edit/Delete</th>
            <td v-for="(item, i) in tableData" :key="i">
              <base-button
                @click="showEditModal(item.history_id)"
                class="btn btn-sm"
                icon="fas fa-edit"
                type="primary"
              >
              </base-button>
              <!-- <base-button
                class="btn btn-sm"
                icon="fas fa-trash-alt"
                type="danger"
                v-on:click="deleteReport(item.history_id)"
            >
            </base-button> -->
            </td>
            <!-- <td>
              <div class="col text-center" v-if="this.$route.name !== 'tables'">
                <button class="btn btn-sm btn-primary" v-on:click="addReport">
                  Save new Report
                </button>
              </div>
            </td> -->
          </tr>
        </tbody>
      </table>

      <div></div>
    </div>

    <modal :show.sync="editModal">
      <template slot="header">
        <h2 class="modal-title" v-if="firstEntry">First Report</h2>
        <h2 class="modal-title" v-if="newReport">Add Report</h2>
        <h2 v-else class="modal-title" id="editReport">
          Edit Report<br />

          <small class="text-muted" v-if="currentRecord">
            last updated: {{ formatDate(this.currentRecord.updated_at) }}
            {{ formatTime(this.currentRecord.updated_at) }}
          </small>
        </h2>
        <br />
      </template>

      <div class="row align-items-center">
        <div class="card col-md-12 mt-3">
          <div class="card-body">
            <div class="row align-items-center">
              <label class=" col-md-4 mt--2 pb-3">
                <h5 class="mb-2">Daytime</h5>

                <select v-model="daytime" class="form-control">
                  <option
                    v-bind:value="dayt.time"
                    v-for="dayt in daytimes"
                    v-bind:key="dayt.time"
                    >{{ dayt.time }}
                  </option>
                </select>
              </label>

              <label class="form-control-label mt--2 col-md-4">
                Time of report
                <base-input
                  disabled
                  :value="new Date(this.date).toLocaleString()"
                  class="mt-2"
                  placeholder="Select Datetime"
                ></base-input>
              </label>
              <base-button
                @click="openDateTimePicker('date-modal')"
                icon="fa fa-calendar"
                class="btn btn-md col-md-2 mt--2 picker-button"
                type="primary"
              ></base-button>
              <base-input
                type="number"
                label="Day of fever"
                v-model.number="day_of_fever"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
              <base-input
                label="Fever"
                v-model="fever"
                class="col-md-4"
                placeholder="in °C"
              ></base-input>
              <base-input
                type="number"
                label="Pulse"
                v-model.number="pulse"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                type="number"
                label="Respiration"
                v-model.number="respiration"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                label="Diet"
                v-model="diet"
                class="col-md-4"
              ></base-input>
            </div>
          </div>
        </div>

        <!--  -->

        <div class="card col-md-12 mt-5">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Blood Pressure</h3>
              </div>
            </div>
          </div>

          <div class="card-body">
            <div class="row align-items-center">
              <base-input
                type="number"
                label="Systolic"
                v-model.number="bp_sys"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                type="number"
                label="Diastolic"
                v-model.number="bp_dia"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>
            </div>
          </div>
        </div>

        <div class="card col-md-12 mt-5">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Fluid Intake</h3>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <base-input
                type="number"
                label="Oral Fluids"
                v-model.number="fi_oral"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="Parenteral"
                v-model.number="fi_parenteral"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="Other"
                v-model.number="fi_other"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="In 8 hours"
                v-model.number="fi_eight_hrs"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="Total"
                v-model.number="fi_total"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                disabled
              ></base-input>
            </div>
          </div>
        </div>

        <div class="card col-md-12 mt-5">
          <div class="card-header border-0">
            <div class="row align-items-center">
              <div class="col">
                <h3 class="mb-0">Fluid Output</h3>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row align-items-center">
              <base-input
                type="number"
                label="Urine"
                v-model.number="fo_urine"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="UF"
                v-model.number="fo_uf"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="Emesis"
                v-model.number="fo_emesis"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="Drainage"
                v-model.number="fo_drainage"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="In 8 hours"
                v-model.number="fo_eight_hrs"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in ml"
              ></base-input>

              <base-input
                type="number"
                label="Total"
                v-model.number="fo_total"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                disabled
              ></base-input>
            </div>
          </div>
        </div>

        <div class="card col-md-12 mt-5">
          <div class="card-body">
            <div class="row align-items-center">
              <base-input
                type="number"
                label="Pain Score"
                v-model.number="pain_score"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                type="number"
                label="Abd. Cir."
                v-model.number="abd_cir"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in cm"
              ></base-input>

              <base-input
                type="number"
                label="Stools"
                v-model.number="stools"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                type="number"
                label="Urine"
                v-model.number="urine"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                label="Weight"
                v-model.number="weight"
                class="col-md-4"
                placeholder="in kg"
              ></base-input>

              <base-input
                type="number"
                label="Height"
                v-model.number="height"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in cm"
              ></base-input>

              <base-input
                type="number"
                label="O2 Sat"
                v-model.number="o2sat"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in %"
              ></base-input>

              <base-input
                type="number"
                label="Hematocrit"
                v-model.number="hematocrit"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
                placeholder="in %"
              ></base-input>

              <base-input
                type="number"
                label="Platelet Count"
                v-model.number="platelet"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <base-input
                type="number"
                label="WBC Count"
                v-model.number="wbc"
                class="col-md-4"
                min="0"
                oninput="validity.valid||(value='');"
              ></base-input>

              <label class="col-md-4 mt--2 pb-1">
                <h5 class="mb-2">Status</h5>
                <select v-model="status" class="form-control">
                  <option
                    :value="stat.option"
                    v-for="stat in statusOptions"
                    :key="stat.option"
                    :selected="stat"
                    >{{ stat.option }}
                  </option>
                </select>
              </label>
              <label class=" col-md-4">
                <h5 class="mb-2">Monitoring Interval</h5>

                <select
                  v-model="monitoring_interval"
                  label="Monitoring Interval"
                  class="form-control"
                >
                  <option
                    v-bind:value="mon_interval.interval"
                    v-for="mon_interval in intervals"
                    v-bind:key="mon_interval.interval"
                    >{{ mon_interval.interval }}
                  </option>
                </select>
              </label>

              <label class="col-md-12 mt-5">
                <h5 class="mb-2">Warning Signs</h5>
                <textarea
                  class="form-control col-md-12"
                  rows="5"
                  placeholder="..."
                  v-model="warning_signs"
                ></textarea>
              </label>

              <label class="col-md-12 mt-5">
                <h5 class="mb-2">Additional Info</h5>
                <textarea
                  class="form-control col-md-12"
                  rows="5"
                  placeholder="..."
                  v-model="additional"
                ></textarea>
              </label>

              <label class="col-md-12 mt-5">
                <h5 class="mb-2">Medical Advice</h5>
                <textarea
                  class="form-control col-md-12"
                  rows="5"
                  placeholder="..."
                  v-model="medical_advice"
                ></textarea>
              </label>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <base-button
          type="secondary"
          @click="
            editModal = false;
            clearData();
          "
          >Close
        </base-button>

        <base-button v-if="newReport" type="primary" @click="addReport"
          >Add new report
        </base-button>
        <base-button v-else type="primary" @click="editReport(history_id)"
          >Save changes
        </base-button>
      </template>
    </modal>

    <!-- Datetime picker have to be outside the modal because bootstrap doesn't allow for nested modals -->
    <datetime
      ref="date-table"
      type="datetime"
      v-model="date"
      :backdrop-click="true"
      :auto="true"
    ></datetime>

    <datetime
      ref="date-modal"
      type="datetime"
      v-model="date"
      :backdrop-click="true"
      :auto="true"
    ></datetime>
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";

export default {
  name: "report",
  props: ["data", "id"],
  components: {
    datetime: Datetime
  },
  data() {
    return {
      newPatient: true,
      newReport: false,
      editModal: false,
      firstEntry: null,
      currentRecord: null,
      edit: false,
      date: null,
      time: new Date().toLocaleTimeString(),
      daytime: null,
      fever: null,
      day_of_fever: null,
      history_id: null,
      updated_at: null,
      pulse: null,
      respiration: null,
      bp_sys: null,
      bp_dia: null,
      diet: null,
      fi_oral: null,
      fi_parenteral: null,
      fi_other: null,
      fi_eight_hrs: null,
      fi_total: null,
      fo_urine: null,
      fo_uf: null,
      fo_emesis: null,
      fo_drainage: null,
      fo_eight_hrs: null,
      fo_total: null,
      pain_score: null,
      abd_cir: null,
      stools: null,
      urine: null,
      weight_ht: null,
      weight: null,
      height: null,
      additional: null,
      medical_advice: null,
      warning_signs: null,
      o2sat: null,
      hematocrit: null,
      platelet: null,
      wbc: null,
      monitoring_interval: null,
      status: null,
      intervals: [
        { interval: 1 },
        { interval: 2 },
        { interval: 4 },
        { interval: 6 }
      ],
      daytimes: [{ time: "D" }, { time: "E" }, { time: "N" }],
      statusOptions: [
        { option: "febrile" },
        { option: "critical" },
        { option: "recovery" }
      ],
      notes: [],
      tableData: null,
      columns: []
    };
  },
  created() {
    if (this.reportData !== null) {
      var history = this.reportData.history.reverse();
      var sortHistory = [].slice.call(history).sort(function(a, b) {
        return new Date(a.datetime) - new Date(b.datetime);
      });
      this.tableData = sortHistory;
    }

    this.calcTimedelta(this.tableData);
  },
  computed: {
    reportData() {
      try {
        var reports = this.$store.getters.getReportById(Number(this.id));
        return reports;
      } catch (e) {
        console.log(e);
      }
      return null;
    },

    patientData() {
      return this.$store.getters.getPatientById(
        Number(this.tableData[0].patient)
      );
    }
  },
  watch: {
    reportData() {
      var history = this.$store.getters
        .getReportById(Number(this.id))
        .history.reverse();
      var sortHistory = [].slice.call(history).sort(function(a, b) {
        return new Date(a.datetime) - new Date(b.datetime);
      });
      this.tableData = sortHistory;
      this.calcTimedelta(history);
    }
  },
  methods: {
    calcFoTotal(report) {
      return (
        report.fo_drainage + report.fo_emesis + report.fo_uf + report.fo_urine
      );
    },

    calcFiTotal(report) {
      return report.fi_oral + report.fi_other + report.fi_parenteral;
    },

    openDateTimePicker(pickerName) {
      var input = this.$refs[pickerName].$el.firstChild.nextElementSibling;

      if (!input) {
        return;
      } else {
        input.click();
      }
    },

    calcTimedelta(historyObj) {
      for (var i = 0; i < historyObj.length; i++) {
        var timedelta =
          new Date(historyObj[i].datetime) - new Date(historyObj[i].created_at);
        var day = Math.round(Math.abs(timedelta / (1000 * 3600 * 24))) + 1;
        if (this.columns.indexOf(day) === -1) {
          this.columns.push(day);
        }
      }
    },

    showEditModal(reportId) {
      let record = this.data.find(record => record.history_id === reportId);
      this.currentRecord = record;

      this.history_id = record.history_id;
      this.daytime = record.daytime;
      this.date = this.currentRecord.datetime;
      this.time = this.formatTime(this.currentRecord.datetime);
      this.respiration = record.respiration;
      this.day_of_fever = record.day_of_fever;
      this.fever = record.fever;
      this.pulse = record.pulse;
      this.bp_sys = record.bp_sys;
      this.bp_dia = record.bp_dia;
      this.diet = record.diet;
      this.fi_oral = record.fi_oral;
      this.fi_other = record.fi_other;
      this.fi_parenteral = record.fi_parenteral;
      this.fi_total = record.fi_total;
      this.fo_urine = record.fo_urine;
      this.fo_uf = record.fo_uf;
      this.fo_emesis = record.fo_emesis;
      this.fo_drainage = record.fo_drainage;
      this.fo_eight_hrs = record.fo_eight_hrs;
      this.fo_total = record.fo_total;
      this.pain_score = record.pain_score;
      this.abd_cir = record.abd_cir;
      this.stools = record.stools;
      this.urine = record.urine;
      this.weight = record.weight;
      this.height = record.height;
      this.additional = record.additional;
      this.medical_advice = record.medical_advice;
      this.warning_signs = record.warning_signs;
      this.o2sat = record.o2sat;
      this.hematocrit = record.hematocrit;
      this.platelet = record.platelet;
      this.wbc = record.wbc;
      this.status = record.status;
      this.monitoring_interval = record.monitoring_interval;

      this.editModal = true;
    },
    editReport(reportId) {
      this.edit = true;

      var jsonObj = {
        updatedAt: new Date(this.date),
        daytime: this.daytime,
        respiration: this.respiration,
        day_of_fever: this.day_of_fever,
        fever: this.fever,
        pulse: this.pulse,
        bpSys: this.bp_sys,
        bpDia: this.bp_dia,
        diet: this.diet,
        fiOral: this.fi_oral,
        fiParenteral: this.fi_parenteral,
        fiOther: this.fi_other,
        fiEightHrs: this.fi_eight_hrs,
        fiTotal: this.fi_oral + this.fi_parenteral + this.fi_other,
        foUrine: this.fo_urine,
        foUf: this.fo_uf,
        foEmesis: this.fo_emesis,
        foDrainage: this.fo_drainage,
        foEightHrs: this.fo_eight_hrs,
        foTotal: this.fo_urine + this.fo_uf + this.fo_emesis + this.fo_drainage,
        painScore: this.pain_score,
        abdCir: this.abd_cir,
        stools: this.stools,
        urine: this.urine,
        weightHt: this.weight_ht,
        weight: this.weight,
        height: this.height,
        additional: this.additional,
        medical_advice: this.medical_advice,
        warning_signs: this.warning_signs,
        o2sat: this.o2sat,
        hematocrit: this.hematocrit,
        wbc: this.wbc,
        platelet: this.platelet,
        status: this.status,
        monitoringInterval: this.monitoring_interval
      };

      this.$store.dispatch("editReport", { id: reportId, report: jsonObj });
      this.clearData();

      this.editModal = false;
    },

    clearData() {
      (this.date = null),
        (this.daytime = null),
        (this.respiration = null),
        (this.day_of_fever = null),
        (this.fever = null),
        (this.pulse = null),
        (this.bp_sys = null),
        (this.bp_dia = null),
        (this.diet = null),
        (this.fi_oral = null),
        (this.fi_parenteral = null),
        (this.fi_other = null),
        (this.fi_eight_hrs = null),
        (this.fi_oral = null),
        (this.fi_parenteral = null),
        (this.fi_other = null),
        (this.fi_total = null),
        (this.fo_urine = null),
        (this.fo_uf = null),
        (this.fo_emesis = null),
        (this.fo_drainage = null),
        (this.fo_eight_hrs = null),
        (this.fo_urine = null),
        (this.fo_uf = null),
        (this.fo_emesis = null),
        (this.fo_drainage = null),
        (this.fo_total = null),
        (this.pain_score = null),
        (this.abd_cir = null),
        (this.stools = null),
        (this.urine = null),
        (this.weight_ht = null),
        (this.weight = null),
        (this.height = null),
        (this.additional = null),
        (this.medical_advice = null),
        (this.warning_signs = null),
        (this.o2sat = null),
        (this.hematocrit = null),
        (this.wbc = null),
        (this.platelet = null),
        (this.status = null),
        (this.monitoring_interval = null);
    },

    deleteReport(reportId) {
      if (confirm("Do you really want to delete this Report?")) {
        this.newPatient = false;
        this.$store.dispatch("deleteReport", { id: reportId });
      } else {
        return;
      }
    },

    addReport() {
      if (this.firstEntry) {
        this.deleteReport(this.reportData.history[0].history_id);
      }
      this.newPatient = false;
      this.firstEntry = false;

      var jsonObj = {
        patient: this.id,
        updatedAt: new Date(this.date),
        // updatedAt: new Date(this.date.toLocaleDateString() + "T" + this.time + "Z"),
        daytime: this.daytime,
        respiration: this.respiration,
        day_of_fever: this.day_of_fever,
        fever: this.fever,
        pulse: this.pulse,
        bpSys: this.bp_sys,
        bpDia: this.bp_dia,
        diet: this.diet,
        fiOral: this.fi_oral,
        fiParenteral: this.fi_parenteral,
        fiOther: this.fi_other,
        fiEightHrs: this.fi_eight_hrs,
        fiTotal: this.fi_oral + this.fi_parenteral + this.fi_other,
        foUrine: this.fo_urine,
        foUf: this.fo_uf,
        foEmesis: this.fo_emesis,
        foDrainage: this.fo_drainage,
        foEightHrs: this.fo_eight_hrs,
        foTotal: this.fo_urine + this.fo_uf + this.fo_emesis + this.fo_drainage,
        painScore: this.pain_score,
        abdCir: this.abd_cir,
        stools: this.stools,
        urine: this.urine,
        weightHt: this.weight_ht,
        additional: this.additional,
        medical_advice: this.medical_advice,
        warning_signs: this.warning_signs,
        o2sat: this.o2sat,
        hematocrit: this.hematocrit,
        platelet: this.platelet,
        wbc: this.wbc,
        status: this.status,
        monitoringInterval: this.monitoring_interval
      };

      this.$store.dispatch("addReport", {
        id: this.tableData[0].id,
        report: jsonObj
      });

      this.clearData();
      this.editModal = false;
    },

    formatTime(date) {
      var time = new Date(date);
      var offset = time.getTimezoneOffset();

      offset = Math.abs(offset / 60);
      time.setHours(time.getHours() - offset);

      return time.toLocaleTimeString();
    },

    formatDate(date) {
      var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      };
      return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    }
  }
};
</script>
<style>
/*from https://stackoverflow.com/questions/19651293/how-to-use-word-wrapbreak-word-for-a-div-without-specifying-width */

.wordbreak {
  display: table;
  table-layout: fixed;
  width: 100%;
  word-break: break-all;
  white-space: -moz-pre-wrap; /* Mozilla */
  white-space: -o-pre-wrap; /* Opera 7 */
  white-space: pre-wrap; /* CSS 2.1 */
  white-space: pre-line; /* CSS 3 */
  word-wrap: break-word; /* IE */
}

thead {
  background-color: #f6f9fc;
}

tbody th:first-child,
td:first-child {
  z-index: 3;
  position: sticky;
  left: 0px;
  background-color: #f6f9fc;
}

.bottom-line {
  border-bottom-color: rgba(0, 0, 0, 0.05);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

/*#editReport {*/
/*  width: 745px;*/
/*  max-width: 745px;*/
/*}*/

/* DATETIME PICKER */

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
