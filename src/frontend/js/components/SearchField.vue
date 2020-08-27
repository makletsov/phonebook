<template>
    <div>
        <div class="search-input-group input-group row">
            <input class="form-control col-10"
                   placeholder="Search"
                   v-model="term">
            <button class="form-control btn btn-danger col-1 col-lg-3 col-xl-2 material-icons justify-content-center"
                    type="button"
                    @click="search()">search</button>
            <button class="form-control btn btn-dark col-1 col-lg-3 col-xl-2 material-icons justify-content-center"
                    type="button"
                    @click="clearSearchResult()">close</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SearchField',

        data() {
            return {
                term: ''
            }
        },

        methods: {
            clearSearchResult() {
                //this.term = '';
                //this.loadContacts();
                this.term = '';
                this.$store.dispatch('loadContacts');
            },
            search() {
                this.$store.dispatch('loadContacts', this.term);
            }
        }
    }
</script>
