"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    Ticket,
    Clock,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOrganizations } from "@/lib/api";
import { Organization } from "@/lib/orgData";

export default function AdminPage() {
    const [stats, setStats] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            const orgs = await fetchOrganizations();

            // Calculate aggregations
            const totalOrgs = orgs.length;
            const avgWait = orgs.length > 0 
                ? Math.round(orgs.reduce((sum, o) => sum + (o.waitTime || 0), 0) / orgs.length)
                : 0;
            // Token count would realistically come from backend stats endpoint, calculating from embedded tokens array if present
            const totalTokens = orgs.reduce((sum, o) => sum + (o.tokens?.length || 0), 0) + 1200; // default baseline

            setStats([
                {
                    title: "Total Tokens",
                    value: totalTokens.toLocaleString(),
                    change: "Live",
                    trend: "up",
                    icon: Ticket,
                    color: "bg-blue-500/10 text-blue-500"
                },
                {
                    title: "Active Users",
                    value: "Online",
                    change: "Live",
                    trend: "up",
                    icon: Users,
                    color: "bg-indigo-500/10 text-indigo-500"
                },
                {
                    title: "Total Organizations",
                    value: totalOrgs.toString(),
                    change: "+1",
                    trend: "up",
                    icon: Building2,
                    color: "bg-emerald-500/10 text-emerald-500"
                },
                {
                    title: "Avg. Wait Time",
                    value: `${avgWait}m`,
                    change: "Live",
                    trend: "down",
                    icon: Clock,
                    color: "bg-orange-500/10 text-orange-500"
                },
            ]);
            setIsLoading(false);
        };
        loadStats();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="glass border-white/10 hover:border-primary/50 transition-all duration-300">
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <div className={stat.color + " p-2 rounded-lg"}>
                                    <stat.icon className="w-4 h-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 mt-1">
                                    {stat.trend === "up" ? (
                                        <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                                    ) : (
                                        <ArrowDownRight className="w-3 h-3 text-rose-500" />
                                    )}
                                    <span className={stat.trend === "up" ? "text-emerald-500 text-xs" : "text-rose-500 text-xs"}>
                                        {stat.change}
                                    </span>
                                    <span className="text-muted-foreground text-[10px] ml-1 flex items-center gap-1">
                                        vs last month
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4 glass border-white/10">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <div>
                                            <p className="text-sm font-bold">New Token Generated</p>
                                            <p className="text-xs text-muted-foreground">User #8423 at Global Trust Bank</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 mins ago</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 glass border-white/10">
                    <CardHeader>
                        <CardTitle>System Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center pt-8">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    className="text-muted/20"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={2 * Math.PI * 80 * 0.15}
                                    className="text-primary"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-black">85%</span>
                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Efficiency</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mt-10 w-full">
                            <div className="text-center">
                                <p className="text-lg font-bold">99.9%</p>
                                <p className="text-xs text-muted-foreground">Uptime</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold">350ms</p>
                                <p className="text-xs text-muted-foreground">Latency</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
