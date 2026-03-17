"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { organizations } from "@/lib/orgData";
import { OrgCard } from "@/components/OrgCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { fetchOrganizations } from "@/lib/api";
import { Organization } from "@/lib/orgData";

export default function OrganizationsPage() {
    const params = useParams();
    const router = useRouter();
    const category = params.category as string;
    const [searchQuery, setSearchQuery] = useState("");
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadOrgs = async () => {
            const data = await fetchOrganizations();
            setOrganizations(data);
            setIsLoading(false);
        };
        loadOrgs();
    }, []);

    const filteredOrgs = organizations.filter(
        (org) =>
            org.category === category &&
            org.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1) + "s";

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Button
                            variant="ghost"
                            onClick={() => router.back()}
                            className="mb-4 -ml-2 text-muted-foreground hover:text-primary transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-bold tracking-tight"
                        >
                            Available <span className="text-primary">{categoryTitle}</span>
                        </motion.h1>
                        <p className="text-muted-foreground mt-2">
                            Showing {filteredOrgs.length} results for your area
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder={`Search ${categoryTitle}...`}
                                className="pl-10 rounded-xl glass border-white/10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" className="rounded-xl border-white/10 glass px-3 h-10">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Results Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64 glass rounded-[2.5rem]">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : filteredOrgs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredOrgs.map((org, index) => (
                            <OrgCard key={org.id || org.organizationId} org={org} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 glass rounded-[2.5rem] border-white/10"
                    >
                        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No {categoryTitle} found</h2>
                        <p className="text-muted-foreground max-w-sm mx-auto">
                            We couldn't find any {categoryTitle.toLowerCase()} matching your search or in this category yet.
                        </p>
                        <Button
                            variant="link"
                            onClick={() => setSearchQuery("")}
                            className="mt-4 text-primary"
                        >
                            Clear search
                        </Button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
