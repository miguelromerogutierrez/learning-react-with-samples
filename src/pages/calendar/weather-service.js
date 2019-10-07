import axios from 'axios';

export const getWeather = () => axios.get('https://api.openweathermap.org/data/2.5/weather?id=3530597&APPID=98c355d73f22c6eb33c4bc0bd22031fe').then(({data}) => data);
