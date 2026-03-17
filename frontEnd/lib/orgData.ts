export interface Token {
    id?: string;
    tokenId?: string;
    tokenNumber?: string;
    number?: string;
    customerName: string;
    serviceId: string;
    counterId?: string; // Assigned counter (e.g., "c1", "c2")
    status: "waiting" | "serving" | "completed" | "skipped";
    arrivalTime: string;
}

export interface AnalyticsData {
    labels: string[];
    values: number[];
}

export interface Service {
    id: string;
    name: string;
    description: string;
    waitTime: number;
    activeCounters: number;
}

export interface Organization {
    id?: string;
    organizationId?: number | string;
    organizationCode?: string;
    name: string;
    category: "bank" | "hospital" | "others";
    address: string;
    waitTime: number; // in minutes
    distance: string; // e.g., "1.2 km"
    availableCounters: number;
    description: string;
    image: string;
    services?: Service[];
    tokens?: Token[];
    analytics?: {
        busyHours: AnalyticsData;
        weeklyTraffic: AnalyticsData;
    };
}

export const organizations: Organization[] = [
    {
        id: "sbi-narkhed",
        name: "SBI Narkhed Bank",
        category: "bank",
        address: "Main Road, Narkhed, Maharashtra",
        waitTime: 20,
        distance: "0.2 km",
        availableCounters: 5,
        description: "State Bank of India, Narkhed branch providing comprehensive banking services.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756eaa539?auto=format&fit=crop&q=80&w=400",
        services: [
            { id: "s1", name: "Cashier Counter", description: "Deposit and withdrawal of cash.", waitTime: 10, activeCounters: 2 },
            { id: "s2", name: "Account Opening", description: "Open new savings or current accounts.", waitTime: 45, activeCounters: 1 },
            { id: "s3", name: "Loan Consultation", description: "Discuss personal, home, or car loans.", waitTime: 30, activeCounters: 1 },
            { id: "s4", name: "Passbook Updating", description: "Get your passbook printed and updated.", waitTime: 5, activeCounters: 1 },
        ],
        tokens: [
            { id: "t1", number: "B-001", customerName: "Rahul Sharma", serviceId: "s1", counterId: "c1", status: "serving", arrivalTime: "10:15 AM" },
            { id: "t2", number: "B-002", customerName: "Priya Patil", serviceId: "s1", counterId: "c1", status: "waiting", arrivalTime: "10:20 AM" },
            { id: "t3", number: "A-001", customerName: "Amit Deshmukh", serviceId: "s2", counterId: "c2", status: "serving", arrivalTime: "09:45 AM" },
            { id: "t4", number: "L-001", customerName: "Suresh Gupta", serviceId: "s3", counterId: "c3", status: "waiting", arrivalTime: "10:30 AM" },
            { id: "t5", number: "B-003", customerName: "Sneha Rao", serviceId: "s1", counterId: "c1", status: "waiting", arrivalTime: "10:35 AM" },
        ],
        analytics: {
            busyHours: {
                labels: ["10 AM", "11 AM", "12 PM", "01 PM", "02 PM", "03 PM", "04 PM"],
                values: [45, 60, 85, 70, 50, 40, 30]
            },
            weeklyTraffic: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                values: [120, 150, 140, 130, 200, 250]
            }
        }
    },
    {
        id: "h1",
        name: "City General Hospital",
        category: "hospital",
        address: "123 Health Ave, Metropolis",
        waitTime: 15,
        distance: "0.8 km",
        availableCounters: 4,
        description: "Specialized in emergency care and cardiology.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=400",
        services: [
            { id: "hs1", name: "Emergency Room", description: "24/7 emergency medical services.", waitTime: 5, activeCounters: 3 },
            { id: "hs2", name: "General OPD", description: "Routine health checkups.", waitTime: 40, activeCounters: 5 },
            { id: "hs3", name: "Pharmacy", description: "Prescription medicines and health supplies.", waitTime: 10, activeCounters: 2 },
        ]
    },
    {
        id: "h2",
        name: "St. Mary's Medical Center",
        category: "hospital",
        address: "45 Care Road, East Side",
        waitTime: 45,
        distance: "2.5 km",
        availableCounters: 2,
        description: "Multi-specialty hospital with premium patient care.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: "b1",
        name: "Global Trust Bank",
        category: "bank",
        address: "10 Capital Street, Financial District",
        waitTime: 10,
        distance: "0.5 km",
        availableCounters: 6,
        description: "Top-tier banking services with priority counters.",
        image: "https://images.unsplash.com/photo-1541339907198-e08756eaa539?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: "b2",
        name: "Union Savings & Credit",
        category: "bank",
        address: "88 Community Way, Suburbia",
        waitTime: 25,
        distance: "3.2 km",
        availableCounters: 3,
        description: "Focused on community savings and student loans.",
        image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&q=80&w=400",
    },
    {
        id: "o1",
        name: "Urban Service Center",
        category: "others",
        address: "Civic Square, Downtown",
        waitTime: 30,
        distance: "1.5 km",
        availableCounters: 5,
        description: "Government services and document processing.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=400",
    },
];
