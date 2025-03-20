import { privateGateway } from "../services/gateways";
import { kaira } from "../services/url";

export const fetchProfileDetails = async (setProfileDetails) => {
    privateGateway
        .get(kaira.profile)
        .then((response) => {
            setProfileDetails(response.data.profile);
        })
        .catch((error) => {
            console.error('Error fetching profile details:', error);
        });
};