<!--
Author: Jennifer Horstmann
-->
<template>
    <div>
        <base-header type="" class="pb-6 pb-8 pt-5 pt-md-8" style="background-color:#dbe5f3">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <patients-table title="Current Patients" :active="true"></patients-table>
                </div>
            </div>

        </div>

              <div class="container-fluid mt-5">
            <div class="row">
                <div class="col">
                    <patients-table title="Dismissed Patients" :active="false"></patients-table>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
  import PatientsTable from "./Dashboard/PatientsTable";
  export default {
    name: 'tables',
    components: {
      PatientsTable
    },
    beforeMount() {
      this.$store.dispatch("loadPatients");
    }
  };
</script>
<style></style>
