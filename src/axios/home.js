import http from './http';

export function getSelf(params) {
    return http.get('https://i.snssdk.com/api/amos/spring_travel/covid/info', params);
}