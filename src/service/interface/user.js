import ajax from '../http';
//api
export const test = () => ajax.get('/apis/tags');
