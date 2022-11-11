/**
 Author: Jennifer Horstmann
 **/

import dcrf from "dcrf-client";

const state = {
    connected: false,
    error: "",
    client: null,
    subClient: null,
    ownNotifications: [],
    is_online: false,
};

const mutations = {

    NEW_NOTIFICATION(state, payload) {
        state.ownNotifications = payload;
    },
    CONNECTED(state, payload) {
        state.is_online = payload;
    },
    CLOSE_SOCKET(state, payload) {
        state.client = payload;
    },
    SET_CLIENT(state, payload) {
        state.client = payload;
    },
};

const actions = {
    setup(context) {
        if (!state.is_online) {
            var client = dcrf.connect(process.env.NODE_ENV === 'production' ? process.env.VUE_APP_WS : 'ws://0.0.0.0:8000/ws/');
            context.commit('SET_CLIENT', client);
            state.client.transport.socket.onopen = function () {
                context.commit('CONNECTED', true);
            }
        }
    },

    closeSocket(context) {
        state.client.transport.socket.onclose = function () {
        };
        state.client.transport.socket.close();
        context.commit('CLOSE_SOCKET', state.client.transport.socket.close());
        context.commit('CONNECTED', false);
    },

    subscriptions(context) {

        state.client.transport.socket.onmessage = function (e) {
            var message = JSON.parse(e.data);

            if (message.stream === "patients") {
                if (message.payload.type === "patient.change") {
                    //after patient data changes, patient data is loaded and mutation is triggered
                    context.dispatch("loadPatients");
                    if (message.payload.action === "update") {
                        // update specific logic might be implemented in here in the future
                    } else if (message.payload.action === "create") {
                        // create specific logic might be implemented in here in the future
                    } else if (message.payload.action === "delete") {
                        // delete specific logic might be implemented in here in the future
                    }
                }
            }

            if (message.stream === "history") {
                if (message.payload.type === "history.change") {
                    //after report data changes, patient data is loaded and mutation is triggered
                    context.dispatch("loadReports");
                    if (message.payload.action === "update") {
                        // update specific logic might be implemented in here in the future
                    } else if (message.payload.action === "create") {
                        // create specific logic might be implemented in here in the future
                    } else if (message.payload.action === "delete") {
                        // delete specific logic might be implemented in here in the future
                    }
                } else if (message.payload.type === "notification") {
                    // distinguish between monitoring interval and fever notifications
                    if (context.rootState.auth.show_notifications) {
                        if (message.payload.data.type === "interval") {
                            context.commit("NEW_NOTIFICATION", [{"Please visit the following patient:": context.getters.patientNameById(message.payload.data.patient)}]);
                        }
                        if (message.payload.data.type === "fever") {
                            context.commit("NEW_NOTIFICATION", [{"The following patient might enter a critical phase:": context.getters.patientNameById(message.payload.data.patient)}]);

                        }
                    }

                }

            }

        };

        state.client.transport.socket.onerror = function () {
            if (!state.is_online) {
                context.commit("NEW_NOTIFICATION", [{"No connection to the server": "Please refresh the page or try again later"}]);
                context.commit("CONNECTED", false);
            }
        };

    },

};

const getters = {
    connected: (state) => state.connected,
    error: (state) => state.error,
    client: (state) => state.client,
    ownNotifications: (state) => state.ownNotifications,

};

const socketModule = {
    state,
    mutations,
    actions,
    getters,
};

export default socketModule;
