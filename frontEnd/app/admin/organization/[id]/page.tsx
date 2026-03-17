"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Organization, Token, Service } from "@/lib/orgData";
import { fetchOrganizations, fetchWaitingList, fetchServingList, fetchCompletedList, serveNextToken } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    Clock,
    CheckCircle2,
    XCircle,
    FastForward,
    ArrowLeft,
    TrendingUp,
    Building2,
    Search,
    Monitor,
    History,
    ChevronRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function OrgAdminDashboard() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [org, setOrg] = useState<Organization | null>(null);
    const [activeTokens, setActiveTokens] = useState<Token[]>([]);
    const [historyTokens, setHistoryTokens] = useState<Token[]>([]);
    const [selectedCounter, setSelectedCounter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Mock counters based on available counters
    const counters = [
        { id: "c1", name: "Counter 01", serviceId: "s1", status: "active" },
        { id: "c2", name: "Counter 02", serviceId: "s2", status: "active" },
        { id: "c3", name: "Counter 03", serviceId: "s3", status: "active" },
        { id: "c4", name: "Counter 04", serviceId: "s1", status: "break" },
    ];

    useEffect(() => {
        const loadOrg = async () => {
            const data = await fetchOrganizations();
            const foundOrg = data.find((o) => o.id === id || String(o.organizationId) === id);
            if (foundOrg) {
                setOrg(foundOrg);
            }
        };
        loadOrg();
    }, [id]);

    useEffect(() => {
        // Poll for active tokens every 3 seconds for the currently selected counter
        if (!selectedCounter) return;

        const fetchQueue = async () => {
            const waiting = await fetchWaitingList(selectedCounter);
            const serving = await fetchServingList(selectedCounter);
            const completed = await fetchCompletedList(selectedCounter);
            
            // Combine waiting and serving into "activeTokens" queue
            const combinedActive = [...waiting, ...serving];
            setActiveTokens(combinedActive);
            setHistoryTokens(completed);
        };

        fetchQueue();
        const interval = setInterval(fetchQueue, 3000); // 3 second polling
        return () => clearInterval(interval);
    }, [selectedCounter]);

    const handleAction = async (tokenId: string, status: "completed" | "skipped" | "deleted" | "serving") => {
        if (status === "serving" || status === "completed") {
             await serveNextToken(selectedCounter || "");
             // Optimistic UI update while next poll cycle catches up
             setActiveTokens(prev =>
                prev.map(t => t.id === tokenId || t.tokenId === tokenId ? { ...t, status } : t)
            );
        } else {
            // Placeholder: skip/delete behavior needs explicit backend support if required
            setActiveTokens(prev => prev.filter(t => t.id !== tokenId && t.tokenId !== tokenId));
        }
    };

    if (!org) return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Loading Dashboard...</p>
        </div>
    );

    const currentCounter = selectedCounter ? counters.find(c => c.id === selectedCounter) : null;
    const counterTokens = selectedCounter
        ? activeTokens.filter(t => t.counterId === selectedCounter)
        : [];

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Header */}
            <header className="h-24 border-b border-border bg-card/40 backdrop-blur-xl sticky top-0 z-50 px-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={() => router.push("/admin")} className="rounded-2xl hover:bg-white/5 h-12">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Super Admin
                    </Button>
                    <div className="h-10 w-px bg-border/50" />
                    <div>
                        <div className="flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-primary" />
                            <h1 className="text-2xl font-black tracking-tight">{org.name} Dashboard</h1>
                        </div>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Operational Management Panel</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-sm font-black">System Status</span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Connected & Live
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.push(`/organizations/details/${org.id}`)}
                        className="rounded-2xl h-12 px-6 glass border-white/10 hover:bg-white/5 font-bold"
                    >
                        View Public Page
                    </Button>
                </div>
            </header>

            <main className="p-10 max-w-[1800px] mx-auto space-y-12">
                {/* Active Counters Grid */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">Active Counters</h2>
                            <p className="text-muted-foreground text-sm mt-1">Select a counter to manage its specific queue</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="px-4 py-2 rounded-full text-xs font-bold bg-primary/10 text-primary border-none">
                                {counters.length} Total
                            </Badge>
                            <Badge variant="secondary" className="px-4 py-2 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border-none">
                                {counters.filter(c => c.status === 'active').length} Online
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {counters.map((counter) => (
                            <motion.div
                                key={counter.id}
                                whileHover={{ y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedCounter(counter.id)}
                            >
                                <Card className={`cursor-pointer transition-all duration-300 rounded-[2.5rem] border-white/5 p-8 relative overflow-hidden group ${selectedCounter === counter.id ? 'ring-2 ring-primary ring-offset-4 ring-offset-background bg-primary/5' : 'glass hover:bg-white/5'}`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`p-4 rounded-2xl ${counter.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                            <Monitor className="w-8 h-8" />
                                        </div>
                                        <Badge className={`uppercase text-[10px] font-black px-3 py-1 rounded-full ${counter.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                            {counter.status}
                                        </Badge>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black">{counter.name}</h3>
                                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                            {org.services?.find(s => s.id === counter.serviceId)?.name || "General Service"}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground font-bold uppercase tracking-tighter leading-none mb-1">In Queue</span>
                                            <span className="text-2xl font-black">{activeTokens.filter(t => t.counterId === counter.id).length}</span>
                                        </div>
                                        <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    {/* Decorative gradient for selected state */}
                                    {selectedCounter === counter.id && (
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <div className="grid lg:grid-cols-12 gap-10">
                    {/* Active Queue Details */}
                    <div className="lg:col-span-8 space-y-8">
                        <AnimatePresence mode="wait">
                            {selectedCounter ? (
                                <motion.div
                                    key={selectedCounter}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-black text-xl">
                                                {currentCounter?.name.split(' ')[1]}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black tracking-tight">{currentCounter?.name} Queue</h3>
                                                <p className="text-sm text-muted-foreground font-medium">{org.services?.find(s => s.id === currentCounter?.serviceId)?.name}</p>
                                            </div>
                                        </div>
                                        <div className="relative w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search customer..."
                                                className="pl-10 h-12 rounded-2xl bg-card border-white/5 focus:ring-primary"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {counterTokens.length > 0 ? (
                                            counterTokens
                                                .filter(t => t.customerName.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .map((token) => (
                                                    <Card
                                                        key={token.id}
                                                        className={`p-6 rounded-[2rem] border-white/5 flex items-center justify-between group transition-all duration-300 ${token.status === 'serving' ? 'bg-primary/5 ring-1 ring-primary/50' : 'glass hover:bg-white/5'}`}
                                                    >
                                                        <div className="flex items-center gap-8">
                                                            <div className={`w-20 h-20 rounded-3xl flex flex-col items-center justify-center font-black ${token.status === 'serving' ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/30' : 'bg-card border border-white/5 text-foreground'}`}>
                                                                <span className="text-[10px] uppercase opacity-60">TKN</span>
                                                                <span className="text-3xl leading-none mt-1">{token.tokenNumber ? token.tokenNumber.replace('T', '') : token.number?.split('-')[1]}</span>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-2xl font-black">{token.customerName}</h4>
                                                                <div className="flex items-center gap-6 mt-2">
                                                                    <span className="text-xs text-muted-foreground font-bold flex items-center gap-1.5">
                                                                        <Clock className="w-3.5 h-3.5" />
                                                                        Joined: {token.arrivalTime}
                                                                    </span>
                                                                    <Badge className={`uppercase text-[10px] font-black px-3 py-1 rounded-full ${token.status === 'serving' ? 'bg-emerald-500 text-white' : 'bg-primary/10 text-primary'}`}>
                                                                        {token.status}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3">
                                                            {token.status === 'serving' ? (
                                                                <Button
                                                                    onClick={() => handleAction(token.id || token.tokenId || "", "completed")}
                                                                    className="h-14 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg transition-transform active:scale-95 shadow-xl shadow-emerald-500/20"
                                                                >
                                                                    <CheckCircle2 className="w-5 h-5 mr-3" />
                                                                    Complete
                                                                </Button>
                                                            ) : (
                                                                <Button
                                                                    onClick={() => handleAction(token.id || token.tokenId || "", "serving")}
                                                                    className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg transition-transform active:scale-95 shadow-xl shadow-primary/30"
                                                                >
                                                                    Start Serving
                                                                </Button>
                                                            )}
                                                            <div className="flex items-center gap-2 ml-4">
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => handleAction(token.id || token.tokenId || "", "skipped")}
                                                                    className="h-14 w-14 p-0 rounded-2xl border-white/10 hover:bg-yellow-500/10 hover:text-yellow-500 transition-colors"
                                                                >
                                                                    <FastForward className="w-6 h-6" />
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => handleAction(token.id || token.tokenId || "", "deleted")}
                                                                    className="h-14 w-14 p-0 rounded-2xl border-white/10 hover:bg-destructive/10 hover:text-destructive transition-colors"
                                                                >
                                                                    <XCircle className="w-6 h-6" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))
                                        ) : (
                                            <div className="h-64 glass rounded-[2.5rem] border-dashed border-white/10 flex flex-col items-center justify-center text-center p-10">
                                                <Users className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                                                <p className="font-bold text-muted-foreground">Queue is currently empty</p>
                                                <p className="text-xs text-muted-foreground/60 mt-1 uppercase tracking-widest font-bold">New tokens will appear here as customers walk in</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[500px] glass rounded-[3rem] p-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
                                    <Monitor className="w-24 h-24 text-primary/20 mb-8" />
                                    <h3 className="text-4xl font-black tracking-tight mb-4">Select a Counter</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                                        Each counter manages specific service requests. Click a counter card to view and control its live queue.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Column: History & Stats */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* History Panel */}
                        <Card className="glass border-white/10 rounded-[3rem] p-10 space-y-8 h-full bg-card/20 flex flex-col">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-muted">
                                        <History className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-2xl font-black">History</h3>
                                </div>
                                <Badge variant="secondary" className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter">
                                    {historyTokens.length} Completed
                                </Badge>
                            </div>

                            <div className="flex-1 space-y-6 overflow-y-auto max-h-[600px] pr-2 scrollbar-hide">
                                {historyTokens.length > 0 ? (
                                    <AnimatePresence>
                                        {historyTokens.map((token) => (
                                            <motion.div
                                                key={token.id}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex items-center justify-between p-5 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex flex-col items-center justify-center font-black">
                                                        <span className="text-[12px]">{token.tokenNumber ? token.tokenNumber.replace('T', '') : token.number?.split('-')[1]}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-sm leading-none">{token.customerName}</p>
                                                        <p className="text-[10px] text-muted-foreground font-bold mt-1 uppercase tracking-tighter">
                                                            {org.services?.find(s => s.id === token.serviceId)?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[8px] font-black uppercase tracking-tighter mb-1">Success</Badge>
                                                    <p className="text-[10px] text-muted-foreground font-medium italic">Finished Just Now</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                                        <History className="w-12 h-12 mb-4" />
                                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">No History Yet</p>
                                    </div>
                                )}
                            </div>

                            <Button variant="link" className="w-full text-primary font-black uppercase tracking-widest text-xs h-12 hover:bg-primary/5 rounded-2xl">
                                Full Operations log
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
