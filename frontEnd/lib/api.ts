import axios from 'axios';
import { Organization, Token } from './orgData';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchOrganizations = async (): Promise<Organization[]> => {
    try {
        const response = await apiClient.get('/api/public/getAll');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch organizations:", error);
        return [];
    }
};

export const createOrganization = async (orgData: any): Promise<Organization | null> => {
    try {
        const response = await apiClient.post('/api/public/new/organization', orgData);
        return response.data;
    } catch (error) {
        console.error("Failed to create organization:", error);
        throw error;
    }
};

export const generateToken = async (
    tokenData: Partial<Token>,
    organizationCode: string,
    counterCode: string
): Promise<Token | null> => {
    try {
        const payload = {
            customerName: tokenData.customerName,
            userMobile: tokenData.number, // Re-using number for mobile since form doesn't have it natively, or can adapt
            serviceId: tokenData.serviceId
        };
        const response = await apiClient.post(
            `/api/public/token?organizationCode=${organizationCode}&counterCode=${counterCode}`,
            payload
        );
        return response.data;
    } catch (error) {
        console.error("Failed to generate token:", error);
        return null;
    }
};

export const fetchWaitingList = async (counterNumber: string): Promise<Token[]> => {
    try {
        const response = await apiClient.get(`/admin/api/waiting/list?counterNumber=${counterNumber}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch waiting list:", error);
        return [];
    }
};

export const fetchServingList = async (counterNumber: string): Promise<Token[]> => {
    try {
        const response = await apiClient.get(`/admin/api/serving/list?counterNumber=${counterNumber}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch serving list:", error);
        return [];
    }
};

export const fetchCompletedList = async (counterNumber: string): Promise<Token[]> => {
    try {
        const response = await apiClient.get(`/admin/api/completed/list?counterNumber=${counterNumber}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch completed list:", error);
        return [];
    }
};

export const serveNextToken = async (counterNumber: string): Promise<Token | null> => {
    try {
        const response = await apiClient.post(`/admin/api/next`);
        return response.data;
    } catch (error) {
        console.error("Failed to serve next token:", error);
        return null;
    }
};

export default apiClient;
