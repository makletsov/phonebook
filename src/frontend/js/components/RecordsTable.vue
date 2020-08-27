<template>
    <div>
        <table class="table table-sm">
            <thead class="thead-light">
            <tr>
                <th>
                    <input type="checkbox"
                           :disabled="isNoContactsExists"
                           :checked="isAllContactsChecked"
                           @input="toggleAllContacts($event)">
                </th>
                <th>№</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Phone</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(contact, index) in $store.state.contacts"
                :key="contact.id">
                <td>
                    <input type="checkbox"
                           :value="contact.id"
                           v-model="checkedIds">
                </td>
                <td>{{ index + 1 }}</td>
                <td>{{ contact.firstName }}</td>
                <td>{{ contact.lastName }}</td>
                <td>{{ contact.phone }}</td>
                <td>
                    <button type="button"
                            class="close"
                            @click="getConfirmation([contact.id])">&times;</button>
                </td>
            </tr>
            </tbody>
        </table>
        <div v-show="isSomeContactsChecked">
            <button type="button"
                    class="btn btn-dark"
                    @click="getConfirmation(checkedIds)"
            >Delete</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RecordsTable',

        data() {
            return {
                checkedIds: [],
            }
        },

        computed: {
            isNoContactsExists() {
                return this.$store.state.contacts.length === 0;
            },
            isAllContactsChecked() {
                return this.$store.state.contacts.length === this.checkedIds.length;
            },
            isSomeContactsChecked() {
                return this.checkedIds.length !== 0;
            }
        },

        methods: {
            toggleAllContacts(e) {
                if (e.target.checked) {
                    this.checkedIds = this.$store.state.contacts.map(function (contact) {
                        return contact.id;
                    });
                } else {
                    this.clearCheckedContactsList();
                }
            },
            clearCheckedContactsList: function () {
                this.checkedIds = [];
            },
            getConfirmation(ids) {
                this.$store.commit('setToDelete', ids);
                this.$store.commit('toggleModal');
                this.clearCheckedContactsList();
            }
        }
    }
</script>

<style scoped>

</style>