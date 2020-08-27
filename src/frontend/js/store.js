import Vue from 'vue';
import Vuex from "vuex";
import {get, post} from "./ajax";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        contacts: [],
        toDelete: [],
        showModal: false
    },

    mutations: {
        setContacts(state, data) {
            state.contacts = data;
        },
        setShowModal(state, showModal) {
            state.showModal = showModal;
        },
        setNeedSingleDeletionConfirmation(state, needConfirmation) {
            state.needSingleDeletionConfirmation = needConfirmation;
        },
        setNeedCheckedDeletionConfirmation(state, needConfirmation) {
            state.needCheckedDeletionConfirmation = needConfirmation;
        },
        setToDelete(state, contacts) {
            state.toDelete = contacts;
        },
        toggleModal(state) {
            state.showModal = !state.showModal;
        }
    },

    actions: {
        loadContacts (context, term) {
            get('/contacts', {
                term: term
            }).done(function (data) {
                context.commit('setContacts', data);
            }).fail(function () {
                alert('Contacts list load error!');
            });
        },
        deleteContacts(context, identities) {
            post('/contacts/delete', {
                ids: identities
            }).done(function (data) {
                if (!data.success) {
                    alert(data.message);
                    return;
                }

                context.dispatch('loadContacts');
            }).fail(function () {
                alert('Contact deletion error!');
            });
        },
        addContact(context, contact) {
            post('contacts/add', {
                contact
            }).done(function () {
                context.dispatch('loadContacts');
            }).fail(function (data) {
                if (!data.responseJSON.success) {
                    alert(data.responseJSON.message);
                }
            });
        }
    }
});

export {store};