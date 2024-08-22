import { RESTDataSource } from '@apollo/datasource-rest';

class GithubApi extends RESTDataSource {
    baseURL = 'https://api.github.com/';

    willSendRequest(_path, request) {
        request.headers['Accept'] = 'application/vnd.github+json';
        request.headers['User-Agent'] = 'tomouchuu';
    }

    // per_page
    getEvents(limit = 10) {
        return this.get(
            `users/tomouchuu/events/public`, {
                params: {
                    per_page: limit.toString()
                }
            }
        );
    }
}

export default GithubApi;