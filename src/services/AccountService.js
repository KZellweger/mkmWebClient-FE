import axios from 'axios'

const ACCOUNT_REST_API_URL = 'http://localhost:8081/account/'

class AccountService {
    getAccountInformation() {
        return axios.get(ACCOUNT_REST_API_URL);
    }
}

export default new AccountService();