import Axios from 'axios';

const AxiosOrders = Axios.create({
    baseURL: 'https://burgerbuilder-d428b.firebaseio.com/'
});

export default AxiosOrders;

 