import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.scss';

import 'bootstrap/dist/js/bootstrap.bundle';
import Vue from 'vue';

import {store} from './store';

import SearchField from "./components/SearchField.vue";
import RecordsTable from "./components/RecordsTable.vue";
import AddRecordForm from "./components/AddRecordForm.vue";
import DeleteConfirmation from "./components/DeleteConfirmation.vue";

new Vue({
    el: '#app',

    store: store,

    components: {
        'search-field': SearchField,
        'records-table': RecordsTable,
        'add-record-form': AddRecordForm,
        'delete-confirmation': DeleteConfirmation
    },

    mounted() {
        this.$store.dispatch('loadContacts');
    }
});