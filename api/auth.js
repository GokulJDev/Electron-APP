import { publicGateway } from "../services/gateways";
import { kaira } from "../services/url";

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

export const authLogout = async () => {
    try {
        const token = localStorage.getItem("refresh_token");
        
        if (!token) {
            console.log("No token found");
            return;
        }

        await publicGateway.post(kaira.logout, {
            token: token, // Send the token to the backend
        });

        // Clear local storage
        localStorage.clear();

        // Redirect to home page
        window.location.href = "/";
    } catch (error) {
        console.log(error);
    }
};
  
  