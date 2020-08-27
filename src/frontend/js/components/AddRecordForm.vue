<template>
    <form class="needs-validation" novalidate>
        <div class="form-group">
            <label>First name</label>
            <input type="text"
                   class="form-control"
                   placeholder="First name"
                   v-model="newContact.firstName.value"
                   :class="{ 'is-valid': newContact.firstName.isValid, 'is-invalid': newContact.firstName.isInvalid }"
                   required>
            <div class="invalid-feedback">
                {{ newContact.firstName.error }}
            </div>
        </div>
        <div class="form-group">
            <label>Last name</label>
            <input type="text"
                   class="form-control"
                   placeholder="Last name"
                   v-model="newContact.lastName.value"
                   :class="{ 'is-valid': newContact.lastName.isValid, 'is-invalid': newContact.lastName.isInvalid }"
                   required>
            <div class="invalid-feedback">
                {{ newContact.lastName.error }}
            </div>
        </div>
        <div class="form-group">
            <label>Phone</label>
            <input type="text"
                   class="form-control"
                   placeholder="Phone"
                   v-model="newContact.phone.value"
                   :class="{ 'is-valid': newContact.phone.isValid, 'is-invalid': newContact.phone.isInvalid }"
                   required>
            <div class="invalid-feedback">
                {{ newContact.phone.error }}
            </div>
        </div>
        <div class="add-button-row row justify-content-center">
            <button type="button"
                    class="col-8 col-sm-5 col-lg-11 btn btn-dark mt-3"
                    @click="addContact">Add note</button>
        </div>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                newContact: {
                    firstName: {
                        value: '',
                        error: '',
                        isValid: false,
                        isInvalid: false
                    },
                    lastName: {
                        value: '',
                        error: '',
                        isValid: false,
                        isInvalid: false
                    },
                    phone: {
                        value: '',
                        error: '',
                        isValid: false,
                        isInvalid: false
                    }
                }
            }
        },

        methods: {
            addContact() {
                function checkPropertyText(property, regexp) {
                    const check = property.match(regexp);

                    return check && check.length === 1 && property === check[0];
                }

                function normalisePhoneNumber(phone) {
                    return phone.replace(/[()\- ]/g, "");
                }

                function validateProperty(property, regexp, propertyString) {
                    if (!property.value) {
                        property.error = 'Insert ' + propertyString + '!';
                        property.isValid = false;
                        property.isInvalid = true;
                    } else if (!checkPropertyText(property.value, regexp)) {
                        property.error = 'Insert correct ' + propertyString + '!';
                        property.isValid = false;
                        property.isInvalid = true;
                    } else {
                        property.error = '';
                        property.isValid = true;
                        property.isInvalid = false;
                    }
                }

                function isPhoneRepetitive(phone) {
                    return this.$store.state.contacts.some(function (contact) {
                        return contact.phone === phone;
                    });
                }

                for (let property in this.newContact) {
                    if (this.newContact.hasOwnProperty(property)) {
                        this.newContact[property].value = this.newContact[property].value.trim();
                    }
                }

                const nameRegExp = /[a-zA-Zа-яА-ЯёЁ]+[-?a-zA-Zа-яА-ЯёЁ]*/g;

                validateProperty(this.newContact.firstName, nameRegExp, 'first name');
                validateProperty(this.newContact.lastName, nameRegExp, 'last name');

                const phoneRegExp = /^\+?[0-9]+/g;

                this.newContact.phone.value = normalisePhoneNumber(this.newContact.phone.value);

                validateProperty(this.newContact.phone, phoneRegExp, 'phone number');

                if (isPhoneRepetitive.call(this, this.newContact.phone.value)) {
                    this.newContact.phone.error = 'A contact with the given phone number is already exist!';
                    this.newContact.phone.isValid = false;
                    this.newContact.phone.isInvalid = true;
                }

                if (this.newContact.firstName.isInvalid
                    || this.newContact.lastName.isInvalid
                    || this.newContact.phone.isInvalid) {
                    return;
                }

                let contact =  {
                    firstName: this.newContact.firstName.value,
                    lastName: this.newContact.lastName.value,
                    phone: this.newContact.phone.value
                }

                this.$store.dispatch('addContact', contact);

                for (let property in this.newContact) {
                    if (this.newContact.hasOwnProperty(property)) {
                        this.newContact[property].value = '';
                        this.newContact[property].isInvalid = false;
                        this.newContact[property].isValid = false;
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>