<!--
Author: Jennifer Horstmann
Content: Modal for the report of a new patient
-->

<template>
  <div class="card mt-5">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">New Report</h3>
        </div>
        <div class="col text-right">
          <base-button size="sm" type="primary">Add</base-button>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-md-4">
          <base-input addon-left-icon="ni ni-calendar-grid-58">
            <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                v-model="dates.simple"
            >
            </flat-picker>
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input placeholder="Fever"></base-input>
        </div>
        <div class="col-md-4">
          <base-input placeholder="Heartrate"></base-input>
        </div>
        <div class="col-md-4">
          <base-input placeholder="Pulse"></base-input>
        </div>
        <div class="col-md-4">
          <base-input placeholder="Fluid Input"></base-input>
        </div>
        <div class="col-md-4">
          <base-input placeholder="Fluid Output"></base-input>
        </div>
        <div class="col-md-2">
          <base-dropdown>
            <base-button
                slot="title"
                type="secondary"
                class="dropdown-toggle"
            >
              Status
            </base-button>
            <a class="dropdown-item" href="#">ok</a>
            <a class="dropdown-item" href="#">critical</a>
          </base-dropdown>
        </div>
        <div class="col-md-2">
          <base-dropdown>
            <base-button
                slot="title"
                type="secondary"
                class="dropdown-toggle"
            >
              Interval
            </base-button>
            <a class="dropdown-item" href="#">1</a>
            <a class="dropdown-item" href="#">2</a>
            <a class="dropdown-item" href="#">3</a>
            <a class="dropdown-item" href="#">4</a>
            <a class="dropdown-item" href="#">5</a>
            <a class="dropdown-item" href="#">6</a>
          </base-dropdown>
        </div>
        <div class="col text-right">
          <base-button size="md" type="primary">Save</base-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

// Datepicker

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    flatPicker,
  },

  name: "report-form",
  data() {
    return {
      dates: {
        simple: new Date(),
      },
    }
  }
};

</script>

<style>
</style>
