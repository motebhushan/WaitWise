import axios from 'axios';
import { Organization, Token } from './orgData';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchOrganizations = async (): Promise<Organization[]> => {
    // try {
    //     const response = await apiClient.get('/api/public/getAll');
    //     return response.data;
    // } catch (error) {
    //     console.error("Failed to fetch organizations:", error);
    //     return [];
    // }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    organizationId: 1,
                    organizationCode: "HOSP123",
                    name: "City Hospital",
                    category: "hospital",
                    description: "Main city hospital with multiple departments.",
                    address: "123 Main St, City Center",
                    availableCounters: 3,
                    waitTime: 15,
                    distance: "2.5 km",
                    image: "https://api.dicebear.com/7.x/shapes/svg?seed=hosp1",
                    active: true,
                    services: [
                        { id: "s101", name: "General Checkup", description: "Standard health consultation", activeCounters: 2, waitTime: 10 },
                        { id: "s102", name: "Consultation", description: "Specialist consultation", activeCounters: 1, waitTime: 20 },
                        { id: "s103", name: "Pharmacy", description: "Prescription pickup", activeCounters: 1, waitTime: 5 }
                    ],
                    counters: [
                        { counterId: 201, counterNumber: "C001", name: "General Reception", status: "active" },
                        { counterId: 202, counterNumber: "C002", name: "Specialist Desk", status: "active" },
                        { counterId: 203, counterNumber: "C003", name: "Pharmacy Counter", status: "active" }
                    ]
                },
                {
                    organizationId: 2,
                    organizationCode: "BANK456",
                    name: "First National Bank",
                    category: "bank",
                    description: "Central branch for all banking needs.",
                    address: "456 Finance Blvd, Downtown",
                    availableCounters: 5,
                    waitTime: 5,
                    distance: "1.2 km",
                    image: "https://api.dicebear.com/7.x/shapes/svg?seed=bank1",
                    active: true,
                    services: [
                        { id: "s104", name: "Deposit/Withdrawal", description: "Basic teller services", activeCounters: 3, waitTime: 5 },
                        { id: "s105", name: "Loan Information", description: "Speak to a loan officer", activeCounters: 2, waitTime: 15 }
                    ],
                    counters: [
                        { counterId: 204, counterNumber: "C004", name: "Teller 1", status: "active" },
                        { counterId: 205, counterNumber: "C005", name: "Teller 2", status: "active" }
                    ]
                }
            ]);
        }, 500); 
    });
};

export const createOrganization = async (orgData: any): Promise<Organization | null> => {
    // try {
    //     const response = await apiClient.post('/api/public/new/organization', orgData);
    //     return response.data;
    // } catch (error) {
    //     console.error("Failed to create organization:", error);
    //     throw error;
    // }
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock create org called with:", orgData);
            resolve({
                ...orgData,
                organizationId: Math.floor(Math.random() * 1000).toString(),
                id: Math.floor(Math.random() * 1000).toString()
            });
        }, 500);
    });
};

export const generateToken = async (
    tokenData: Partial<Token>,
    organizationCode: string,
    counterCode: string
): Promise<Token | null> => {
    // try {
    //     const payload = {
    //         customerName: tokenData.customerName,
    //         userMobile: tokenData.number, // Re-using number for mobile since form doesn't have it natively, or can adapt
    //         serviceId: tokenData.serviceId
    //     };
    //     const response = await apiClient.post(
    //         `/api/public/token?organizationCode=${organizationCode}&counterCode=${counterCode}`,
    //         payload
    //     );
    //     return response.data;
    // } catch (error) {
    //     console.error("Failed to generate token:", error);
    //     return null;
    // }
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Mock generate token called with:", tokenData, organizationCode, counterCode);
            resolve({
                id: `TKN-${Math.floor(Math.random() * 10000)}`,
                number: `A-${Math.floor(Math.random() * 100)}`,
                serviceId: tokenData.serviceId || 'unknown',
                customerName: tokenData.customerName || 'unknown',
                status: 'waiting',
                arrivalTime: '10:00 AM',
                counterId: counterCode
            } as any);
        }, 800);
    });
};

export const fetchWaitingList = async (counterNumber: string): Promise<Token[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "T1", number: "A-10", service: "General", status: "waiting", estimatedTime: "5 mins", counter: counterNumber } as any,
                { id: "T2", number: "A-11", service: "Specialist", status: "waiting", estimatedTime: "10 mins", counter: counterNumber } as any,
            ]);
        }, 500);
    });
};

export const fetchServingList = async (counterNumber: string): Promise<Token[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "T3", number: "A-09", service: "General", status: "serving", estimatedTime: "0 mins", counter: counterNumber } as any,
            ]);
        }, 500);
    });
};

export const fetchCompletedList = async (counterNumber: string): Promise<Token[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "T4", number: "A-08", service: "Pharmacy", status: "completed", estimatedTime: "0 mins", counter: counterNumber } as any,
                { id: "T5", number: "A-07", service: "General", status: "completed", estimatedTime: "0 mins", counter: counterNumber } as any,
            ]);
        }, 500);
    });
};

export const serveNextToken = async (counterNumber: string): Promise<Token | null> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: "T1", number: "A-10", service: "General", status: "serving", estimatedTime: "0 mins", counter: counterNumber } as any);
        }, 500);
    });
};

export default apiClient;
