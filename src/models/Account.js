import Immutable from 'immutable'

const AccountRecord = new Immutable.Record({
    userId: 0,
    userName: '',
    userType: '',
    firstName: '',
    lastName: '',
    registrationDate: '',
    totalBalance: 0
})

class Account extends AccountRecord {
    constructor(account) {
        super(account);
    }

    getUserId() {
        return this.get('userId')
    }

    getUserName() {
        return this.get('userName')
    }

    getUserType() {
        return this.get('userType')
    }

    getFirstName() {
        return this.get('firstName')
    }

    getLastName() {
        return this.get('lastName')
    }

    getRegistrationDate() {
        return this.get('registrationDate')
    }

    getTotalBalance() {
        return this.get('totalBalance')
    }
}

export default Account