export class ApiClient {
    constructor({basePath = '', headers = {}} = {}) {
        this.basePath = basePath;
        this.headers = headers;
    }

    request({method = 'GET', path, qs, body, headers = {}, failOnStatusCode = false}) {
        return cy.request({
            method,
            url: `${this.basePath}${path}`,
            qs,
            body,
            headers: {...this.headers, ...headers},
            failOnStatusCode,
        }).then((response) => logApiCall(method, body, response));
    }

    get(path, options = {}) {
        return this.request({...options, method: 'GET', path});
    }

    post(path, body, options = {}) {
        return this.request({...options, method: 'POST', path, body});
    }

    put(path, body, options = {}) {
        return this.request({...options, method: 'PUT', path, body});
    }

    delete(path, options = {}) {
        return this.request({...options, method: 'DELETE', path});
    }
}

function logApiCall(method, body, response) {
    const title = `${method} ${response.allRequestResponses[0]['Request URL']} → ${response.status}`;

    Cypress.log({name: 'api', message: title, consoleProps: () => ({body, response: response.body})});
    cy.task('log', `${title}\n  Request body: ${prettyfy(body)}\n  Response: ${prettyfy(response.body)}`, {log: false});

    return cy.wrap(response, {log: false});
}

function prettyfy(value) {
    if (value === undefined || value === '') return '<empty>';
    return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
}

export const apiClient = new ApiClient();