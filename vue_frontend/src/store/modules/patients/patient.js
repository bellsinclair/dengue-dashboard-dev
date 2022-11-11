/**
Author: Jennifer Horstmann
**/

const state = {
    patientData: [],
};

const mutations = {
    UPDATE_PATIENT_DATA(state, payload) {
        state.patientData = payload;
    },

    UPDATE_PATIENT(state, payload) {
        for (var i = 0; i < state.patientData.length; i++) {
            if (state.patientData[i].id === payload.patient_id) {
                state.patientData.splice(i, 1, payload);
            }
        }
    },
};

const actions = {
    // loads all available patient data
    loadPatients(context) {
        let client = context.rootState.socket.client;
        client.list("patients").then((response) => {
            context.commit("UPDATE_PATIENT_DATA", response);
        }).catch((e) => {
            context.commit('NEW_NOTIFICATION', e.errors, {root: true});
        });
    },


    addPatient(context, payload) {

        var jsonObj = {

            first_name: payload.patient.first_name,
            last_name: payload.patient.last_name,
            admission_date: payload.patient.admission,
            dismissal_date: payload.patient.dismissal,

        }

        let client = context.rootState.socket.client;
        client.create("patients", jsonObj).then(() => {
        }).catch((e) => {
            context.commit('NEW_NOTIFICATION', e.errors, {root: true});
        });

    },

    deletePatient(context, payload) {
        let client = context.rootState.socket.client;

        client.delete("patients", payload.id).then(() => {
        }).catch((e) => {
            context.commit('NEW_NOTIFICATION', e.errors, {root: true});
        });
    },


    editPatient(context, payload) {
        let client = context.rootState.socket.client;

        var jsonObj = {
            first_name: payload.patient.first_name,
            last_name: payload.patient.last_name,
            admission_date: payload.patient.admission,
            dismissal_date: payload.patient.dismissal,
        };


        client.patch("patients", payload.id, jsonObj).then(() => {
        }).catch((e) => {
            context.commit('NEW_NOTIFICATION', e.errors, {root: true});
        });
    },


};

const getters = {
    patientData: (state) => state.patientData,
    getPatientById: (state) => (id) =>
        state.patientData.find((patient) => patient.id === id),
    patientNameById: (state) => (id) => {
        let patient = state.patientData.find((patient) => patient.id === id)
        return patient.first_name + " " + patient.last_name;
    }

};

const patientModule = {
    state,
    mutations,
    actions,
    getters,
};

export default patientModule;
