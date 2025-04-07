import { privateGateway } from "../services/gateways";
import { kaira } from "../services/url";

export const vrview = (setVrLaunchStatus) => {
    privateGateway
        .get(kaira.launchvr)
        .then((response) => {
            if (response.status === 200) {
                console.log("Unity VR launched 🚀");
                setVrLaunchStatus(true); // Update the state to indicate success
            } else {
                console.error("Failed to launch Unity VR: Server responded with an error");
                setVrLaunchStatus(false); // Update the state to indicate failure
            }
        })
        .catch((error) => {
            console.error("Error launching Unity VR:", error);
            setVrLaunchStatus(false); // Update the state to indicate failure
        });
};