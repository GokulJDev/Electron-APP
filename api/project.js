import { privateGateway } from "../services/gateways";
import { kaira } from "../services/url";

export const fetchDashboardData = async (setProjectStats, setRecentProjects) => {
    privateGateway
        .get(kaira.dashboard)
        .then((response )=> {
            setProjectStats(response.data.stats);
            setRecentProjects(response.data.projects);
        })
        .catch ((error) =>{
            console.error('Error fetching dashboard data:', error);
        });
};

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

export const updateProjectDetails = async (projectData) => {
    const proj = localStorage.getItem('projectId');
    const formData = new FormData();
    formData.append('name', projectData.name);
    formData.append('description', projectData.description);
    formData.append('tags', projectData.tags);
    formData.append('image', projectData.image);
  
    try {
      const response = await privateGateway
      .put(`${kaira.update}/${proj}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Project details updated successfully:', response.data);
      return response;
  
    } catch (error) {
      console.error('Error updating project details:', error);
      return { status: 500 }; // Still return something so your saveChanges doesn't break
    }
  };
  

export const createBlenderProject = async (floorPlan, setModelUrl) => {
    privateGateway
        .post(kaira.blenderProject, { image: floorPlan }, { responseType: 'blob' })
        .then((response) => {
            const blob = new Blob([response.data], { type: 'model/gltf-binary' });
            const url = URL.createObjectURL(blob);
            setModelUrl(url); // Update the state with the URL
        })
        .catch((error) => {
            console.error('Error creating Blender project:', error);
        });
};