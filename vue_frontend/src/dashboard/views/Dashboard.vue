<!--
Author: Jennifer Horstmann
-->

<template>
  <div>
    <base-header type="" class="pb-6 pb-8 pt-5 pt-md-8" style="background-color:#dbe5f3">
      <!-- CRITICAL PATIENTS -->
      <critical-table></critical-table>
    </base-header>

    <div class="container-fluid mt--7">
      <!-- CURRENT PATIENTS -->
      <div class="row mt-5">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <patients-table title="Current Patients" :active="true"></patients-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// Tables
import PatientsTable from "./Dashboard/PatientsTable";
import CriticalTable from "./Dashboard/CriticalTable";
import {mapGetters} from "vuex";


export default {
  components: {
    PatientsTable,
    CriticalTable,

  },
  data() {
    return {
      notificationModal: false,
    };
  },

  methods: {

    enableNotifications(bool) {
      this.$store.dispatch("enableNotifications", bool);
    },

  }, // end methods

  computed: {
    ...mapGetters(["patientData"]),
  },
  created() {
    this.$store.dispatch("setup"); // TEST
    this.$store.dispatch("loadPatients");
    this.$store.dispatch("loadReports");
    this.$store.dispatch("subscriptions");
  },

};
</script>
<style></style>
