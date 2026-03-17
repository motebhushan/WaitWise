"use client";

import { motion } from "framer-motion";
import { Ticket, Clock, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Organization } from "@/lib/orgData";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface OrgCardProps {
    org: Organization;
}

export const OrgCard = ({ org }: OrgCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass rounded-[2rem] border border-white/10 hover:border-primary/50 transition-all duration-300 group flex flex-col h-full overflow-hidden"
        >
            <Link href={`/organizations/details/${org.id}`} className="p-6 flex-1 flex flex-col">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6">
                    <img
                        src={org.image}
                        alt={org.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm border-none px-3 py-1">
                            {org.category === "hospital" ? "Healthcare" : org.category === "bank" ? "Banking" : "Service"}
                        </Badge>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{org.name}</h3>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {org.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/40">
                            <Clock className="w-4 h-4 text-primary" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-muted-foreground font-bold leading-none">Wait Time</span>
                                <span className="text-sm font-bold">{org.waitTime} mins</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-background/40">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-muted-foreground font-bold leading-none">Distance</span>
                                <span className="text-sm font-bold">{org.distance}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 px-1">
                        <Users className="w-3 h-3" />
                        <span>{org.availableCounters} active counters</span>
                    </div>
                </div>
            </Link>

            <div className="px-6 pb-6">
                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group/btn mt-auto">
                    Join Queue
                    <Ticket className="ml-2 w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                </Button>
            </div>
        </motion.div>
    );
};
