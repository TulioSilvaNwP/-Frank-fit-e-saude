import { Platform } from 'react-native';

class BaseService {
    static baseUrl = Platform.OS === 'android' 
        ? 'http://10.0.2.2:3000' 
        : 'http://localhost:3000';

    constructor(endpoint) {
        this.url = `${BaseService.baseUrl}${endpoint}`;
    }

    async handleResponse(response) {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        if (response.status === 204) {
            return null;
        }
        return response.json();
    }

    async getAll() {
        const response = await fetch(this.url);
        return this.handleResponse(response);
    }

    async getById(id) {
        const response = await fetch(`${this.url}/${id}`);
        return this.handleResponse(response);
    }

    async create(data) {
        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }

    async update(id, data) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return this.handleResponse(response);
    }

    async delete(id) {
        const response = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        });
        return this.handleResponse(response);
    }
}

export default BaseService;