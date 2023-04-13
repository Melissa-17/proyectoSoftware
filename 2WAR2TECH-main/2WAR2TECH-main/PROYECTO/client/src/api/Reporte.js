import axiosClient from "#API/axiosClient.js";

export const axiosGetReport = (JWTtoken,idCxS) => {
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );      
    return axiosClient.get(`/report/califications/${idCxS}`);
}

export const axiosGetUserReport = (JWTtoken,idCxS, idUser) => {
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );      
    return axiosClient.get(`/report/califications/${idCxS}/${idUser}`);
}

export const axiosGetAllCalUserReport = (JWTtoken,idCxS, idUser) => {
    axiosClient.interceptors.request.use(
        async config => {
            config.headers = { 
                'Authorization': `${JWTtoken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
            return config;
        },
        error => {
            Promise.reject(error)
        }
    );      
    return axiosClient.get(`/report/allCalifications/${idCxS}/${idUser}`);
}