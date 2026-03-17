"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Trash2,
    Search,
    Building2,
    MapPin,
    Clock,
    Edit3,
    Globe,
    MoreVertical,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchOrganizations } from "@/lib/api";
import { Organization } from "@/lib/orgData";
import { useEffect } from "react";
import Image from "next/image";
import { AddOrganizationModal } from "@/components/admin/AddOrganizationModal";

export default function OrganizationsManagement() {
    const [orgs, setOrgs] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const loadOrgs = async () => {
            const data = await fetchOrganizations();
            setOrgs(data);
            setIsLoading(false);
        };
        loadOrgs();
    }, []);

    // Filter orgs based on search
    const filteredOrgs = orgs.filter(o =>
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        setOrgs(orgs.filter(o => (o.id || String(o.organizationId)) !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Organization Management</h1>
                    <p className="text-muted-foreground">Add and manage specific locations for your services.</p>
                </div>
                <Button onClick={() => setIsAdding(true)} className="rounded-xl shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4 mr-2" />
                    Register New Organization
                </Button>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search organizations or categories..."
                        className="pl-10 rounded-xl glass border-border"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                    <Button variant="outline" className="rounded-xl glass gap-2 border-white/10">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                    <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-none py-1">
                        Total: {orgs.length}
                    </Badge>
                </div>
            </div>

            {/* Organizations Grid */}
            {isLoading ? (
                <div className="flex items-center justify-center p-20 glass rounded-[2rem]">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="grid gap-6">
                {filteredOrgs.map((org, index) => (
                    <motion.div
                        key={org.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="glass border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col md:flex-row">
                                    <div className="w-full md:w-48 h-32 md:h-auto overflow-hidden relative">
                                        <Image
                                            src={org.image}
                                            alt={org.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 p-6 flex flex-col md:flex-row justify-between gap-6">
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="font-bold text-xl">{org.name}</h3>
                                                    <Badge className="rounded-full text-[10px] uppercase font-bold tracking-tighter px-2 h-5">
                                                        {org.category}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                                    <MapPin className="w-3 h-3 text-primary/60" />
                                                    <p className="text-xs truncate max-w-[200px]">{org.address}</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-4">
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/40 border border-white/5">
                                                    <Clock className="w-3 h-3 text-primary" />
                                                    <span className="text-xs font-bold">{org.waitTime} min avg.</span>
                                                </div>
                                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/40 border border-white/5">
                                                    <Globe className="w-3 h-3 text-emerald-500" />
                                                    <span className="text-xs font-bold">{org.distance} away</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 self-end md:self-center">
                                            <Button variant="outline" size="sm" className="rounded-xl glass border-white/10 gap-2 h-10 px-4">
                                                <Edit3 className="w-4 h-4" />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="rounded-xl glass border-white/10 text-rose-500 hover:bg-rose-500/10 hover:text-rose-500 gap-2 h-10 px-4"
                                                onClick={() => handleDelete(org.id || String(org.organizationId) || "")}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span className="hidden sm:inline">Remove</span>
                                            </Button>
                                            <Button variant="ghost" size="icon" className="rounded-xl">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
            )}

            {filteredOrgs.length === 0 && (
                <div className="text-center py-20 glass rounded-[2.5rem] border-white/10 mt-12">
                    <h2 className="text-xl font-bold mb-2">No organizations found</h2>
                    <p className="text-muted-foreground">Try adjusting your search terms.</p>
                </div>
            )}

            {isAdding && (
                <AddOrganizationModal
                    onClose={() => setIsAdding(false)}
                    onSuccess={() => {
                        setIsAdding(false);
                        // Refresh logic for organizations list could be added here
                        window.location.reload(); 
                    }}
                />
            )}
        </div>
    );
}
