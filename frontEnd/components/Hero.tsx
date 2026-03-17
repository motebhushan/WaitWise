"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Ticket, Users, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium w-fit">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Real-time Queue Management
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                        Wait Less, <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400">
                            Live More.
                        </span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                        The ultimate tokenization system for hospitals, banks, and businesses.
                        Streamline your queue, reduce wait times, and enhance customer satisfaction
                        with WaitWise.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/25 group">
                            Get Started
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary/20 hover:bg-primary/5">
                            Watch Demo
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 mt-8 p-4 glass rounded-2xl w-fit">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden relative">
                                    <Image
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                                        alt="avatar"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="font-bold text-foreground">500+ Businesses</p>
                            <p className="text-muted-foreground text-xs">Trust WaitWise every day</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative perspective-1000 hidden md:block"
                >
                    {/* Main Visual: A holographic Token Card */}
                    <div className="relative glass p-8 rounded-[2.5rem] border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] transform-gpu hover:rotate-2 transition-transform duration-500">
                        <div className="absolute top-4 right-8 bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full">
                            LIVE STATUS
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                                <Ticket className="text-primary-foreground w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">St. Mary's Hospital</h3>
                                <p className="text-sm text-muted-foreground italic">Cardiology Department</p>
                            </div>
                        </div>

                        <div className="bg-muted/50 p-6 rounded-3xl mb-6 text-center border-2 border-primary/10">
                            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1 block">Your Token</span>
                            <span className="text-6xl font-black text-primary tracking-tighter">A-42</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-background/40">
                                <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4 text-primary/60" />
                                    <span className="text-sm font-medium">Waiters Ahead</span>
                                </div>
                                <span className="text-sm font-bold">5 People</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-2xl bg-background/40">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-primary/60" />
                                    <span className="text-sm font-medium">Estimated Time</span>
                                </div>
                                <span className="text-sm font-bold">12 Mins</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            <span className="text-xs text-muted-foreground font-medium">Secure & Verified by WaitWise Cloud</span>
                        </div>
                    </div>

                    {/* Floating Element 1 */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 glass p-5 rounded-2xl shadow-xl z-20"
                    >
                        <div className="bg-emerald-500/20 text-emerald-500 p-2 rounded-lg mb-2">
                            <Ticket className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold">Next Calling</p>
                        <p className="text-xl font-black">B-12</p>
                    </motion.div>

                    {/* Floating Element 2 */}
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-6 -left-10 glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-tight">System Optimized</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
