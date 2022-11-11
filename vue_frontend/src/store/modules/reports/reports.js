/**
 Author: Jennifer Horstmann
 **/

const state = {
    reportData: [],
    criticalReports: [],
};

const mutations = {
    UPDATE_REPORT_DATA(state, payload) {
        state.reportData = payload;
    },
    UPDATE_CRITICAL_REPORT_DATA(state, payload) {
        state.criticalReports = payload;
    },
};

const actions = {
    //load all reports
    loadReports(context) {
        let client = context.rootState.socket.client;
        client.list("reports").then((response) => {
            context.commit("UPDATE_REPORT_DATA", response);
        }).catch((e) => {
            context.commit('NEW_NOTIFICATION', e.errors, {root: true});
        })
        ;
    },

    addReport(context, payload) {

        let client = context.rootState.socket.client;

        context.dispatch('formatJson', payload).then((jsonObj) => {

            client.patch("reports", payload.id, jsonObj).then((report) => {
                context.commit("UPDATE_REPORT_DATA", [report]);
            }).catch((e) => {
                context.commit('NEW_NOTIFICATION', e.errors, {root: true});
            })
            ;
        });
    },

    createReport(context, payload) {

        let client = context.rootState.socket.client;

        context.dispatch('formatJson', payload).then((jsonObj) => {

            client.create("reports", jsonObj).then((report) => {
                context.commit("UPDATE_REPORT_DATA", [report]);
            }).catch((e) => {
                context.commit('NEW_NOTIFICATION', e.errors, {root: true});
            })
            ;
        });
    },

    editReport(context, payload) {
        let client = context.rootState.socket.client;

        context.dispatch('formatJson', payload).then((jsonObj) => {
            client.patch("history", payload.id, jsonObj).then(() => {
            }).catch((e) => {
                context.commit('NEW_NOTIFICATION', e.errors, {root: true});
            })
            ;
        });

    },

    deleteReport(context, payload) {
        let client = context.rootState.socket.client;

        client.delete("history", payload.id).then(() => {
        }).catch((e) => {
            context.commit('NEW_NOTIFICATION', e.errors, {root: true});
        });
    },

    formatJson(context, payload) {

        var jsonObj = {

            daytime: payload.report.daytime,
            day_of_fever: payload.report.day_of_fever,
            fever: payload.report.fever,
            pulse: payload.report.pulse,
            respiration: payload.report.respiration,
            bp_sys: payload.report.bpSys,
            bp_dia: payload.report.bpDia,
            diet: payload.report.diet,
            fi_oral: payload.report.fiOral,
            fi_parenteral: payload.report.fiParenteral,
            fi_other: payload.report.fiOther,
            fi_eight_hrs: payload.report.fiEightHrs,
            fi_total: payload.report.fiTotal,
            fo_urine: payload.report.foUrine,
            fo_uf: payload.report.foUf,
            fo_emesis: payload.report.foEmesis,
            fo_drainage: payload.report.foDrainage,
            fo_eight_hrs: payload.report.foEightHrs,
            fo_total: payload.report.foTotal,
            pain_score: payload.report.painScore,
            abd_cir: payload.report.abdCir,
            stools: payload.report.stools,
            urine: payload.report.urine,
            weight_ht: payload.report.weightHt,
            weight: payload.report.weight,
            height: payload.report.height,
            o2sat: payload.report.o2sat,
            hematocrit: payload.report.hematocrit,
            platelet: payload.report.platelet,
            wbc: payload.report.wbc,
            additional: payload.report.additional,
            medical_advice: payload.report.medical_advice,
            warning_signs: payload.report.warning_signs,
            status: payload.report.status,
            datetime: payload.report.updatedAt,
            monitoring_interval: payload.report.monitoringInterval,
            changed_by: context.rootGetters.user_id,
        };

        var fullJson = {};

        if (payload.report.patient !== null) {
            fullJson = Object.assign(jsonObj, {patient_id: payload.report.patient});
        }

        return fullJson;

    },

};


const getters = {
    reportData: (state) => state.reportData,
    getReportById: (state) => (id) =>
        state.reportData.find((report) => report.patient === id),

    criticalReports: (state, getters) => {
        var criticalArray = [];
        for (var i = 0; i < state.reportData.length; i++) {
            // if (state.reportData[i].history.length > 0) {
            //     if (state.reportData[i].history[0].status === "critical" && (getters.getPatientById(state.reportData[i].history[0].patient).dismissal_date === null)) {
            //
            //         var history = state.reportData[i].history.reverse();
            //         var sortHistory = [].slice.call(history).sort(function (a, b) {
            //             return (new Date(a.datetime) - new Date(b.datetime));
            //         });
            //         criticalArray.push(sortHistory.pop());
            //     }
            // }

            if (state.reportData[i].history.length > 0) {

                var history = state.reportData[i].history.reverse();
                var sortHistory = [].slice.call(history).sort(function (a, b) {
                    return (new Date(a.datetime) - new Date(b.datetime));
                });

                if (sortHistory[sortHistory.length-1].status === "critical" && (getters.getPatientById(state.reportData[i].history[0].patient).dismissal_date === null)) {
                    criticalArray.push(sortHistory.pop());
                }
            }
        }
        return criticalArray;
    },
};

const reportModule = {
    state,
    mutations,
    actions,
    getters,
};

export default reportModule;
