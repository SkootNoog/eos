// import axios from "axios";
const axios = require('axios').default;

// class ApiRequest {
//     private route: string;
//     private method: string;
//     private data?: any;
//     private responseType: string;
//
//     constructor(
//         route: string,
//         method: string,
//         responseType: string,
//         data?: any
//     ) {
//         this.route = route;
//         this.method = method;
//         this.data = data;
//         this.responseType = responseType;
//     }
//
//     makeRequest(): Promise<any> {
//         return axios({
//             baseURL: process.env.VUE_APP_API_URL,
//             url: this.route,
//             method: this.method,
//             // headers: {
//             //     ...(access_token ? {Authorization: `Bearer ${access_token}`} : {})
//             // },
//             // withCredentials: !!access_token,
//             data: this.data,
//             responseType: this.responseType,
//         }).then((response:any) => response.data);
//     }
// }
// export default ApiRequest;

export async function apiRequest(
    apiRoute: string,
    method: string = 'get',
    // access_token,
    data: any,
    responseType: string = 'json'
){
    return axios({
        baseURL: process.env.VUE_APP_API_URL,
        url: apiRoute,
        method,
        // headers: {
        //     ...(access_token ? {Authorization: `Bearer ${access_token}`} : {})
        // },
        // withCredentials: !!access_token,
        data,
        responseType,
    })
        .then((response: any) => response.data);
}
