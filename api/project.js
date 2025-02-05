import { privateGateway } from "../services/gateways";
import { kaira } from "../services/url";

export const namecheck = async (projectName, setNameExists) => {
    privateGateway
        .get(`${kaira.project}/check-name`, { params: { name: projectName } })
        .then((response) => {
            setNameExists(response.data.exists);
        })
        .catch((error) => {
            console.error('Error checking project name:', error);
            return false;
        });
};


export const projectentry = async (projectData) => {
    const formData = new FormData();
    formData.append('name', projectData.projectName);
    formData.append('description', projectData.description);
    formData.append('tags', projectData.tags);
    formData.append('image', projectData.image);

    privateGateway
        .post(kaira.project, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            localStorage.setItem('projectId', response.data.projectId);
            localStorage.setItem('project', response.data.project);
            localStorage.setItem('projectName', response.data.projectName);
            console.log(response.data);
            window.location.href = `/project/${response.data.projectName}`;
        })
        .catch((error) => {
            console.error('Error creating project:', error);
        });
};

export const getDetails = (setProjectDetails, setFloorPlan) => {
    const projectName = localStorage.getItem('projectName');
    if (projectName) {
        privateGateway
            .get(`${kaira.projectData}/${projectName}`)
            .then((response) => {
                setProjectDetails(response.data);
                setFloorPlan(response.data.floorPlan);
            })
            .catch((error) => {
                console.error('Error fetching project details:', error);
            });
    }
};

export const updateProjectDetails=(projectData) =>{
    const formData = new FormData();
    formData.append('name', projectData.projectName);
    formData.append('description', projectData.description);
    formData.append('tags', projectData.tags);
    formData.append('image', projectData.image);

    privateGateway
        .put(`${kaira.projectData}/${projectName}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log('Project details updated successfully:', response.data);
            window.location.href = `/project/${response.data.projectName}`;
        })
        .catch((error) => {
            console.error('Error updating project details:', error);
        });
};


