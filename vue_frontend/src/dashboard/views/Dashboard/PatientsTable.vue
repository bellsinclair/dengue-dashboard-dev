<!--
Author: Jennifer Horstmann
Content: Component displaying either the currently active patients or the dismissed patients, based on the prop value "active"
-->

<template>
  <div class="card" v-if="patientData">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">
            {{ title }}
            <i
              v-if="active === true"
              class="far fa-question-circle text-muted"
              v-b-popover.hover.top="
                'Table shows all currently active patients. As soon as a patient is provided with a dismissal date the patient is moved to the dismissed patients table.'
              "
            ></i>
            <i
              v-else
              class="far fa-question-circle text-muted"
              v-b-popover.hover.top="
                'Table shows all dismissed patients as soon as a dismissal date is set.'
              "
            ></i>
          </h3>
        </div>
        <div class="col text-right">
          <base-button
            v-if="active === true"
            type="btn btn-sm btn-primary"
            icon="fas fa-plus"
            @click="
              patientModal = true;
              newPatient = true;
            "
            v-b-popover.hover.top="'Add a new Patient'"
          >
            new Patient
          </base-button>
          <modal :show.sync="patientModal">
            <template slot="header">
              <div v-if="newPatient">
                <h2 class="modal-title">New Patient</h2>
              </div>
              <div v-else>
                <h2 class="modal-title">Edit Patient</h2>
              </div>
            </template>
            <div class="row align-items-center text-left">
              <div class="card col-md-12 mt-3">
                <div class="card-body">
                  <div class="row align-items-center">
                    <base-input
                      label="First Name"
                      v-model="first_name"
                      class="col-md-6"
                    >
                    </base-input>
                    <base-input
                      label="Last Name"
                      v-model="last_name"
                      class="col-md-6"
                    ></base-input>

                    <label class="form-control-label mt--3 col-md-4">
                      Admission
                      <base-input
                        disabled
                        :value="new Date(this.admission).toLocaleString()"
                        class="mt-3"
                      ></base-input>
                    </label>

                    <base-button
                      @click="openPicker('admission-picker')"
                      icon="fa fa-calendar"
                      class="btn btn-md col-md-2 mt--2 picker-button"
                      type="primary"
                    ></base-button>

                    <label
                      class="form-control-label mt-md--3 mt-sm-10 col-md-3"
                    >
                      Dismissal
                      <base-input
                        disabled
                        :value="new Date(this.dismissal).toLocaleString()"
                        class="mt-3"
                      ></base-input>
                    </label>
                    <base-button
                      @click="openPicker('dismissal-picker')"
                      icon="fa fa-calendar"
                      class="btn btn-md col-md-1 mt--2 picker-button"
                      type="primary"
                    ></base-button>

                    <base-button
                      type="danger"
                      icon="fas fa-times"
                      class="col-md-1 btn btn-md ml-4 mt--2 mt-sm-10"
                      @click="dismissal = null"
                    >
                    </base-button>
                  </div>
                </div>
              </div>
            </div>
            <template slot="footer">
              <base-button type="secondary" @click="patientModal = false"
                >Close
              </base-button>
              <template v-if="newPatient">
                <base-button type="primary" @click="addPatient()"
                  >Save patient
                </base-button>
              </template>
              <template v-else>
                <base-button type="primary" @click="editPatient()"
                  >Save changes
                </base-button>
              </template>
            </template>
          </modal>

          <!-- Datepicker have to be outside the modal, because bootstrap doesn't allow for two modals to be inside each other -->
          <datetime
            ref="admission-picker"
            type="datetime"
            v-model="admission"
            :backdrop-click="true"
            :auto="true"
          ></datetime>

          <datetime
            ref="dismissal-picker"
            type="datetime"
            v-model="dismissal"
            :backdrop-click="true"
            :auto="true"
          ></datetime>
        </div>
      </div>
    </div>

    <div v-if="active === true">
      <div class="table-responsive">
        <base-table thead-classes="thead-light" :data="tableData">
          <template slot="columns">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admission</th>
            <th>Dismissal</th>
            <th>
              Edit/Delete
              <i
                class="far fa-question-circle"
                v-b-popover.hover.top="'Edit/Delete Patient'"
              ></i>
            </th>
            <th>
              Report
              <i
                class="far fa-question-circle"
                v-b-popover.hover.top="'See/Edit Patient Report'"
              ></i>
            </th>
          </template>

          <template slot-scope="{ row }" v-if="row.dismissal_date === null">
            <th scope="row">
              <router-link :to="'/patients/' + row.id"
                >{{ row.id }}
              </router-link>
            </th>
            <td>
              {{ row.first_name }}
            </td>
            <td>
              {{ row.last_name }}
            </td>
            <td>
              {{
                new Intl.DateTimeFormat("en-GB").format(
                  new Date(row.admission_date)
                )
              }}
            </td>
            <td>
              <template v-if="row.dismissal_date === null">
                <i class="far fa-clock"></i>
              </template>
              <template v-else>
                {{
                  new Intl.DateTimeFormat("en-GB").format(
                    new Date(row.dismissal_date)
                  )
                }}
              </template>
            </td>
            <td>
              <base-button
                class="btn btn-sm"
                icon="fas fa-edit"
                type="primary"
                @click="
                  initializePatientModal(row.id);
                  edit = true;
                "
              ></base-button>
              <!-- <base-button class="btn btn-sm" icon="fas fa-trash-alt" type="danger"
                           @click="deletePatient(row.id)"></base-button> -->
            </td>
            <td>
              <router-link :to="'/patients/' + row.id">
                <base-button
                  class="btn btn-sm"
                  icon="fas fa-chart-bar"
                  type="primary"
                  @click="'/patients/' + row.id"
                >
                  Patient Report
                </base-button>
              </router-link>
            </td>
          </template>
        </base-table>
      </div>
    </div>

    <div v-else-if="active === false">
      <div class="table-responsive">
        <base-table thead-classes="thead-light" :data="tableData">
          <template slot="columns">
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Admission</th>
            <th>Dismissal</th>
            <th>
              Edit/Delete
              <i
                class="far fa-question-circle"
                v-b-popover.hover.top="'Edit/Delete Patient'"
              ></i>
            </th>
            <th>
              Report
              <i
                class="far fa-question-circle"
                v-b-popover.hover.top="'See/Edit Patient Report'"
              ></i>
            </th>
          </template>

          <template slot-scope="{ row }" v-if="row.dismissal_date">
            <th scope="row">
              <router-link :to="'/patients/' + row.id"
                >{{ row.id }}
              </router-link>
            </th>
            <td>
              {{ row.first_name }}
            </td>
            <td>
              {{ row.last_name }}
            </td>
            <td>
              {{
                new Intl.DateTimeFormat("en-GB").format(
                  new Date(row.admission_date)
                )
              }}
            </td>
            <td>
              <template v-if="row.dismissal_date === null">
                <i class="far fa-clock"></i>
              </template>
              <template v-else>
                {{
                  new Intl.DateTimeFormat("en-GB").format(
                    new Date(row.dismissal_date)
                  )
                }}
              </template>
            </td>
            <td>
              <base-button
                class="btn btn-sm"
                icon="fas fa-edit"
                type="primary"
                @click="
                  initializePatientModal(row.id);
                  edit = true;
                "
              ></base-button>
              <!-- <base-button
                class="btn btn-sm"
                icon="fas fa-trash-alt"
                type="danger"
                @click="deletePatient(row.id)"
              ></base-button> -->
            </td>
            <td>
              <router-link :to="'/patients/' + row.id">
                <base-button
                  class="btn btn-sm"
                  icon="fas fa-chart-bar"
                  type="primary"
                  @click="'/patients/' + row.id"
                >
                  Patient Report
                </base-button>
              </router-link>
            </td>
          </template>
        </base-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Datetime } from "vue-datetime";

export default {
  name: "patients-table",
  components: {
    datetime: Datetime
  },
  props: ["title", "active"],
  data() {
    return {
      datepicker: false,
      patientModal: false,
      newPatient: true,
      patientId: null,
      edit: false,
      admission: null,
      dismissal: null,
      first_name: null,
      last_name: null,
      tableData: this.patientData
    };
  },
  methods: {
    openPicker(pickerName) {
      var input = this.$refs[pickerName].$el.firstChild.nextElementSibling;

      if (!input) {
        return;
      }

      input.click();
    },

    initializePatientModal(id) {
      let data = this.tableData.find(patient => patient.id === id);

      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.admission = data.admission_date;
      this.dismissal = data.dismissal_date;

      this.patientId = id;

      this.newPatient = false;
      this.patientModal = true;
    },

    addPatient() {
      var jsonObj = {
        first_name: this.first_name,
        last_name: this.last_name,
        admission: this.admission == "" ? null : this.admission,
        dismissal: this.dismissal == "" ? null : this.dismissal
      };

      this.$store.dispatch("addPatient", { patient: jsonObj });
      this.patientModal = false;
    },
    editPatient() {
      var jsonObj = {
        first_name: this.first_name,
        last_name: this.last_name,
        admission: this.admission,
        dismissal: this.dismissal
      };

      this.$store.dispatch("editPatient", {
        id: this.patientId,
        patient: jsonObj
      });

      this.first_name = null;
      this.last_name = null;
      this.admission = null;
      this.dismissal = null;

      this.patientModal = false;
    },
    deletePatient(id) {
      if (confirm("Do you really want to delete this Patient?")) {
        this.$store.dispatch("deletePatient", { id: id });
      } else {
        return;
      }
    }
  },
  watch: {
    patientData() {
      this.tableData = this.patientData;
    }
  },
  beforeDestroy() {
    clearInterval(this.patientData);
  },
  async created() {},
  computed: {
    ...mapGetters(["patientData"])
  }
};
</script>
<style>
.datetime-picker {
  margin-top: 0.5rem;
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
  z-index: 5700 !important;
}

.vdatetime-popup {
  z-index: 5900 !important;
}

.vdatetime-overlay {
  z-index: 5800 !important;
}

.picker-button {
  margin-right: 0 !important;
  max-width: 75% !important;
}

@media (min-width: 576px) {
  .modal-dialog {
    /*width: 745px;*/
    /*max-width: 745px;*/
    width: 80% !important;
    max-width: 800px !important;
  }
}
</style>
