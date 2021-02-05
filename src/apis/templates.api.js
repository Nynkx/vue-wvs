import axios from 'axios';

const templates = axios.create({
    baseURL: 'https://wvs.foxit.co.jp/api/templates'
});

templates.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem("token");

        config.headers = Object.assign(
            {
            Authorization: `Bearer ${token}`,
            },
            config.headers
        );

    return config;
    },
    function(err) {
        console.log(err);
    }
);


export default templates;
