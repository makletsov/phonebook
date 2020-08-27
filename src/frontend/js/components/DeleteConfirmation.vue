<template>
    <div>
        <div v-show="$store.state.showModal"
             class="modal-backdrop show"></div>
        <transition name="fade">
            <div v-show="$store.state.showModal"
                 class="modal"
                 :class="[$store.state.showModal ? 'show' : 'fade']">
                <div class="modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                Delete confirmation
                            </h5>
                            <button type="button"
                                    class="close"
                                    aria-label="Close"
                                    @click="$store.commit('toggleModal')">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure?
                        </div>
                        <div class="modal-footer">
                            <button type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                    @click="$store.commit('toggleModal')">No</button>
                            <button type="button"
                                    class="btn btn-primary"
                                    @click="deleteContacts">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'DeleteConfirmation',

        methods: {
            deleteContacts() {
                this.$store.dispatch('deleteContacts', this.$store.state.toDelete);
                this.$store.commit('toggleModal');
                this.$store.commit('setToDelete', []);
            }
        }
    }
</script>
