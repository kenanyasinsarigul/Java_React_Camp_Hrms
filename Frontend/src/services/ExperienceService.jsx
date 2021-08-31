import axios from "axios";

export default class ExperienceService {

    add(experience) {
        return axios.post("http://localhost:8080/api/experiences/add", experience)
    }

    delete(experienceId) {
        return axios.delete(`http://localhost:8080/experiences/delete?experianceId=${experienceId}`)
    }

    getByCvId(cvId) {
        return axios.get(`http://localhost:8080/api/experiences/getByCvId?id=${cvId}`)
    }
}