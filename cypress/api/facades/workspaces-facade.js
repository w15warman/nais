import { apiClient } from '../client';

const WORKSPACES = '/api/workspaces';

export class WorkspacesFacade {
    constructor(client = apiClient) {
        this.client = client;
    }

    createNewWorkspace() {
        return this.client.post(WORKSPACES);
    }
}

export const workspacesFacade = new WorkspacesFacade();