"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Hospital, Building2, Smartphone, BarChart3, Clock4, ShieldCheck, ArrowUpRight } from "lucide-react";

const features = [
    {
        title: "Healthcare",
        description: "Manage patient inflow effortlessly. Reduce waiting room congestion and improve care delivery.",
        icon: Hospital,
        color: "bg-blue-500/10 text-blue-500",
        slug: "hospital",
    },
    {
        title: "Banking & Finance",
        description: "Provide a premium experience for your clients. Real-time updates on their queue status.",
        icon: Building2,
        color: "bg-indigo-500/10 text-indigo-500",
        slug: "bank",
    },
    {
        title: "Mobile First",
        description: "Generate tokens from anywhere. Clients can track their position from their own devices.",
        icon: Smartphone,
        color: "bg-emerald-500/10 text-emerald-500",
    },
    {
        title: "Analytics",
        description: "Gain insights into peak hours and average wait times to optimize your operations.",
        icon: BarChart3,
        color: "bg-orange-500/10 text-orange-500",
    },
    {
        title: "Efficient Routing",
        description: "Smart algorithms to route clients to the next available counter or specialist.",
        icon: Clock4,
        color: "bg-purple-500/10 text-purple-500",
    },
    {
        title: "Secure & Reliable",
        description: "Cloud-based system with 99.9% uptime. Your data is always safe and accessible.",
        icon: ShieldCheck,
        color: "bg-rose-500/10 text-rose-500",
        slug: "others",
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        One Solution, <br />
                        <span className="text-primary italic">Endless Possibilities</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg max-w-2xl mx-auto"
                    >
                        WaitWise is designed to fit seamlessly into any environment where queue
                        management is critical for success.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const CardContent = (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="p-8 rounded-[2rem] border border-white/10 glass hover:border-primary/50 transition-all duration-300 group h-full cursor-pointer relative"
                            >
                                {feature.slug && (
                                    <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );

                        if (feature.slug) {
                            return (
                                <Link key={index} href={`/organizations/${feature.slug}`}>
                                    {CardContent}
                                </Link>
                            );
                        }

                        return <div key={index}>{CardContent}</div>;
                    })}
                </div>
            </div>
        </section>
    );
};
