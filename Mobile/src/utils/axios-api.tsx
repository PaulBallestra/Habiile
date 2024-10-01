import axios from 'axios';
import { Platform } from 'react-native';

// Axios instance
export const instanceAxios = axios.create({
  baseURL:
    // nesting ternaries conditions
    !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    // in dev, api requests for android platforms works with 10.0.2.2 route
    ? Platform.OS === 'android' ? 'http://10.0.2.2:8080/api'
    // if the platform is ios, put http://localhost:8080/api as the url
    : 'http://localhost:8080/api'
    // if the project is in production, put /api as the url
    : '/api',
});
