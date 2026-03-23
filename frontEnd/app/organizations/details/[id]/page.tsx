"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Organization } from "@/lib/orgData";
import { generateToken, fetchOrganizations } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    MapPin,
    Clock,
    Users,
    Ticket,
    Info,
    ChevronRight,
    Star,
    ShieldCheck,
    Smartphone,
    Building2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrganizationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    
    const [org, setOrg] = useState<Organization | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookingService, setBookingService] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState("");
    const [customerMobile, setCustomerMobile] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedToken, setGeneratedToken] = useState<any>(null);

    useEffect(() => {
        const loadOrg = async () => {
            const data = await fetchOrganizations();
            const foundOrg = data.find((o) => o.id === id || String(o.organizationId) === id);
            setOrg(foundOrg || null);
            setIsLoading(false);
        };
        loadOrg();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-background">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const handleGetToken = async (serviceId: string) => {
        if (!org) return;
        if (!customerName || !customerMobile) {
            alert("Please enter both name and mobile to get a token.");
            return;
        }
        setIsGenerating(true);
        // Find counter related to this service (For simplicity, default to c1 / counter01 if missing mapping in frontend right now)
        const counterCode = "C001"; // Change matching your actual Counter config in backend if it's dynamic
        const tokenData = { customerName, number: customerMobile, serviceId };
        
        const responseData = await generateToken(tokenData, org.organizationCode || "", counterCode);
        
        if (responseData) {
            setGeneratedToken(responseData);
            setBookingService(null);
        } else {
            alert("Failed to generate token. Queue might be closed.");
        }
        setIsGenerating(false);
    };

    if (!org) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Organization Not Found</h2>
                    <Button onClick={() => router.push("/")}>Back to Home</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <img
                    src={org.image}
                    alt={org.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                        >
                            <div>
                                <Button
                                    variant="ghost"
                                    onClick={() => router.back()}
                                    className="mb-6 -ml-2 text-white/80 hover:text-white hover:bg-white/10 glass"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge className="bg-primary hover:bg-primary px-3 py-1">
                                        {org.category.toUpperCase()}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-yellow-500 bg-background/50 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-bold">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span>4.8</span>
                                    </div>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                                    {org.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>{org.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-primary" />
                                        <span>Open • Closes at 6:00 PM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Link href={`/admin/organization/${org.id}`}>
                                    <Button variant="outline" className="h-14 px-6 rounded-2xl glass border-white/10 text-white hover:bg-white/10 font-bold transition-all active:scale-95">
                                        <Building2 className="w-5 h-5 mr-2" />
                                        Manage
                                    </Button>
                                </Link>
                                <Button className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-95">
                                    <Ticket className="w-5 h-5 mr-2" />
                                    Join Global Queue
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column: Details & Services */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Highlights */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Info className="w-6 h-6 text-primary" />
                                About this Organization
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {org.description} We are committed to providing the best service experience with minimal wait times. Our digital queue system ensures you can wait comfortably anywhere.
                            </p>

                            <div className="grid sm:grid-cols-3 gap-4 mt-8">
                                {[
                                    { icon: ShieldCheck, title: "Verified", desc: "Official Branch" },
                                    { icon: Smartphone, title: "Smart Wait", desc: "Real-time Tracking" },
                                    { icon: Users, title: "High Capacity", desc: `${org.availableCounters} Active Counters` },
                                ].map((feature, i) => (
                                    <div key={i} className="glass p-4 rounded-2xl border-white/5 flex items-center gap-4">
                                        <div className="bg-primary/10 p-2 rounded-xl">
                                            <feature.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm leading-none">{feature.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Services Section */}
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Services & Counters</h2>
                                <Badge variant="outline" className="rounded-full px-4">
                                    {org.services?.length || 0} Services Available
                                </Badge>
                            </div>

                            <div className="space-y-4">
                                {org.services && org.services.length > 0 ? org.services.map((service, index) => (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group glass p-6 rounded-3xl border-white/5 hover:border-primary/30 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                                    {service.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {service.description}
                                                </p>
                                                <div className="flex items-center gap-4 mt-3">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                                        <Users className="w-3.5 h-3.5" />
                                                        {service.activeCounters} Counters Active
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="text-right mr-4">
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Current Wait</p>
                                                    <p className="text-2xl font-black text-primary">~{service.waitTime}m</p>
                                                </div>
                                                <Button 
                                                    onClick={() => setBookingService(service.id)}
                                                    className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 font-bold active:scale-95 transition-all">
                                                    Get Token
                                                    <ChevronRight className="ml-1 w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )) : (
                                    <div className="p-12 text-center glass rounded-3xl border-white/5">
                                        <p className="text-muted-foreground">No specific services listed. Please join the general queue.</p>
                                        <Button className="mt-4" onClick={() => setBookingService("GENERAL")}>Join General Queue</Button>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Sidebar info */}
                    <div className="space-y-6">
                        <div className="glass p-8 rounded-[2.5rem] border-primary/10 sticky top-28">
                            <h3 className="text-xl font-bold mb-6">Quick Overview</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                            <Clock className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">Avg. Wait</span>
                                    </div>
                                    <span className="text-lg font-bold">{org.waitTime} mins</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">Distance</span>
                                    </div>
                                    <span className="text-lg font-bold">{org.distance}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                            <Users className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium">Active Counters</span>
                                    </div>
                                    <span className="text-lg font-bold">{org.availableCounters}</span>
                                </div>
                            </div>

                            <div className="mt-10 p-4 rounded-3xl bg-primary/5 border border-primary/20">
                                <p className="text-xs text-muted-foreground text-center">
                                    By joining the queue, you agree to receive real-time updates on your phone.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking Modal Overlay */}
            {bookingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card w-full max-w-md p-8 rounded-[2rem] border border-white/10 shadow-2xl relative"
                    >
                        <h3 className="text-2xl font-black mb-2">Request Service</h3>
                        <p className="text-muted-foreground mb-6">Enter details to get your digital queue token.</p>
                        
                        <div className="space-y-4">
                            <Input 
                                placeholder="Your Name" 
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="h-14 rounded-xl"
                            />
                            <Input 
                                placeholder="Mobile Number" 
                                value={customerMobile}
                                onChange={(e) => setCustomerMobile(e.target.value)}
                                className="h-14 rounded-xl"
                            />
                            
                            <div className="flex gap-4 pt-4">
                                <Button 
                                    variant="outline" 
                                    onClick={() => setBookingService(null)}
                                    className="flex-1 h-14 rounded-xl"
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={() => handleGetToken(bookingService)}
                                    disabled={isGenerating}
                                    className="flex-1 h-14 rounded-xl bg-primary hover:bg-primary/90"
                                >
                                    {isGenerating ? "Generating..." : "Confirm & Get Token"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Generated Token Success Overlay */}
            {generatedToken && (
                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/90 backdrop-blur-md p-6">
                 <motion.div 
                     initial={{ opacity: 0, y: 50 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-card w-full max-w-sm p-10 rounded-[3rem] border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 text-center relative"
                 >
                     <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                         <Ticket className="w-10 h-10" />
                     </div>
                     <h2 className="text-4xl font-black mb-1 text-emerald-500">{generatedToken.tokenNumber}</h2>
                     <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Your Queue Number</p>
                     
                     <div className="bg-background/50 rounded-2xl p-4 mb-8">
                         <p className="font-bold">{generatedToken.customerName}</p>
                         <p className="text-xs text-muted-foreground mt-1 text-center">Please show this token number at the counter when called.</p>
                     </div>
                     
                     <Button 
                         onClick={() => setGeneratedToken(null)}
                         className="w-full h-14 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black"
                     >
                         Got It, Thanks
                     </Button>
                 </motion.div>
             </div>
            )}
        </div>
    );
}
