import axios from 'axios';

class AxiosService {

    hostName = "http://localhost";
    port = ":8081";
    baseUrl = this.hostName + this.port;


    constructor() {
        this.getPeopleListUrl = this.baseUrl + "/people";
        this.getPeopleDetails = this.baseUrl + "/people/{id}";
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
            }
        }
    }

    getPeopleList() {
        return axios.get(this.getPeopleListUrl, this.getHeaders());
    }

    getPeopleDetailsById(id) {
        return axios.get(this.getPeopleDetails.replace("{id}", id), this.getHeaders())
    }


}

export { AxiosService }