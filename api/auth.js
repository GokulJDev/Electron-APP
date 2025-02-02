import { publicGateway } from "../services/gateways"
import { kaira } from "../services/url"

export const authLogin = async (credentialData)=> {
    publicGateway
    .post(kaira.login, credentialData)
    .then((response) => {
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        console.log(response.data);

        window.location.href = '/dashboard';
    })
    .catch((error) => {
        console.log(error);
    });
};