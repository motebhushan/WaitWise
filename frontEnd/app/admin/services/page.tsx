"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Trash2,
    Search,
    Briefcase,
    ExternalLink,
    MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Initial dummy services
const initialServices = [
    { id: "s1", name: "Healthcare", slug: "hospital", orgCount: 12, status: "active", createdAt: "2024-01-15" },
    { id: "s2", name: "Banking", slug: "bank", orgCount: 8, status: "active", createdAt: "2024-01-20" },
    { id: "s3", name: "Education", slug: "education", orgCount: 5, status: "inactive", createdAt: "2024-02-05" },
    { id: "s4", name: "Retail", slug: "retail", orgCount: 15, status: "active", createdAt: "2024-02-10" },
];

export default function ServicesManagement() {
    const [services, setServices] = useState(initialServices);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newServiceName, setNewServiceName] = useState("");

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddService = () => {
        if (!newServiceName.trim()) return;
        const newService = {
            id: `s${services.length + 1}`,
            name: newServiceName,
            slug: newServiceName.toLowerCase().replace(/ /g, "-"),
            orgCount: 0,
            status: "active",
            createdAt: new Date().toISOString().split('T')[0]
        };
        setServices([newService, ...services]);
        setNewServiceName("");
        setIsAdding(false);
    };

    const handleDeleteService = (id: string) => {
        setServices(services.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Categories</h1>
                    <p className="text-muted-foreground">Manage the high-level services available on WaitWise.</p>
                </div>
                <Button onClick={() => setIsAdding(true)} className="rounded-xl shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Service
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search services..."
                        className="pl-10 rounded-xl glass border-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Add Service Inline Header */}
            {isAdding && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-[2rem] border-primary/30 flex items-center gap-4 bg-primary/5"
                >
                    <div className="flex-1">
                        <Input
                            autoFocus
                            placeholder="Enter service name (e.g., Post Office, Gym)"
                            className="bg-background border-none text-lg font-bold placeholder:font-normal focus-visible:ring-0 h-12"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddService()}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" className="rounded-xl" onClick={() => setIsAdding(false)}>Cancel</Button>
                        <Button className="rounded-xl" onClick={handleAddService}>Create Service</Button>
                    </div>
                </motion.div>
            )}

            {/* Services Table/Cards */}
            <div className="grid gap-4">
                {filteredServices.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="glass border-white/5 hover:border-primary/20 transition-all duration-300">
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between p-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center">
                                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-lg">{service.name}</h3>
                                                <Badge variant={service.status === 'active' ? 'default' : 'secondary'} className="rounded-full text-[10px] px-2 h-5">
                                                    {service.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 tracking-tight">
                                                Slug: <code className="bg-muted px-1 rounded">/{service.slug}</code> • {service.orgCount} Organizations
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                        <div className="hidden md:block text-right mr-8">
                                            <p className="font-medium text-foreground">Created on</p>
                                            <p>{service.createdAt}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors"
                                            onClick={() => handleDeleteService(service.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="rounded-xl">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
