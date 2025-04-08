import { privateGateway } from "../services/gateways";
import { kaira } from "../services/url";

export const vrview = (projectName) => {
    privateGateway
        .get(kaira.launchvr)
        .then((response) => {
            if (response.status === 200) {
                console.log("Unity VR launched 🚀");
            } else {
                console.error("Failed to launch Unity VR: Server responded with an error");
            }
        })
        .catch((error) => {
            console.error("Error launching Unity VR:", error);
        });
};

export const fetchProjects = (setRecentProjects) => {
    privateGateway
      .get(kaira.vrproject)
      .then((response) => {
        if (response.status === 200 && response.data?.projects) {
          console.log("Projects fetched successfully 🚀");
          setRecentProjects(response.data.projects);
        } else {
          console.error("Unexpected response format or server error");
          setRecentProjects([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setRecentProjects([]);
      });
  };
  