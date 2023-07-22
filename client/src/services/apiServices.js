import axios from "axios";
import { getToken } from "./tokenServices.js";
import VueAxios from "vue-axios";

const BASE_URL = "http://localhost:3000";

class ApiService {
    static vueInstance;

    static init(app) {
        ApiService.vueInstance = app;
        ApiService.vueInstance.use(VueAxios, axios);
        ApiService.vueInstance.axios.defaults.baseURL = BASE_URL;
    }

    static setHeader() {
        ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
        ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
    }

    static query(resource, params) {
        return ApiService.vueInstance.axios.get(resource, params);
    }

    static get(resource, slug = "") {
        return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
    }

    static post(resource, params) {
        return ApiService.vueInstance.axios.post(`${resource}`, params);
    }

    static update(resource, slug, params) {
        return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
    }

    static put(resource, params) {
        return ApiService.vueInstance.axios.put(`${resource}`, params);
    }

    static delete(resource) {
        return ApiService.vueInstance.axios.delete(resource);
    }
}

export default ApiService;