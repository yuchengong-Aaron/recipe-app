import axios from "axios";

const ACCOUNT_API_BASE_URL = `${process.env.REACT_APP_BACKEND_API_URL}/account`;

class AccountService {
    
    findUsername(username) {
        return axios.post(ACCOUNT_API_BASE_URL + "/find-username", username);
    }

    findEmail(email) {
        return axios.post(ACCOUNT_API_BASE_URL + "/find-email", email);
    }

    register(account) {
        return axios.post(ACCOUNT_API_BASE_URL + "/registration", account);
    }

    verify(verificationCode) {
        return axios.get(`${ACCOUNT_API_BASE_URL}/verify?code=${verificationCode}`);
    }

    verifyNewEmail(verificationCode) {
        return axios.get(`${ACCOUNT_API_BASE_URL}/verify-change-email?code=${verificationCode}`);
    }

    authorizePasswordReset(code) {
        return axios.get(`${ACCOUNT_API_BASE_URL}/authorize-password-reset?code=${code}`);
    }

    resendEmail(email) {
        return axios.post(ACCOUNT_API_BASE_URL + "/resend-email", email);
    }

    emailPasswordReset(email) {
        return axios.post(ACCOUNT_API_BASE_URL + "/forgot-password", email);
    }

    changePassword(newPassword) {
        return axios.post(ACCOUNT_API_BASE_URL + "/change-password", newPassword);
    }

    login(formData) {
        return axios.post(ACCOUNT_API_BASE_URL + "/auth/login", formData);
    }

    validate() {
        return axios.get(ACCOUNT_API_BASE_URL + "/auth/validation", 
            { 
                headers: {
                    authorization: 'bearer ' + localStorage.getItem("accessToken")
                }
            }
        );
    }

    getCurrentUser(id) {
        return axios.get(`${ACCOUNT_API_BASE_URL}/current-user?id=${id}`, 
            { 
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        );
    }

    editProfile(updatedProfile) {
        return axios.post(ACCOUNT_API_BASE_URL + "/edit-profile", 
            updatedProfile, 
            { 
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        );
    }

    checkEmail(email) {
        return axios.get(`${ACCOUNT_API_BASE_URL}/check-email?email=${email}`);
    }

    changeEmail(emailRequest) {
        return axios.post(ACCOUNT_API_BASE_URL + "/change-email", 
            emailRequest,
            { 
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        );
    }

    deleteAccount(request) {
        return axios.delete(ACCOUNT_API_BASE_URL + "/delete-account", 
            { 
                data: { 
                    id: request.accountId ,
                    password: request.password
                },
                headers: {
                    authorization: "bearer " + localStorage.getItem("accessToken")
                }
            }
        );
    }
}

export default new AccountService();