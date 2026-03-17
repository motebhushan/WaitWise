"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Settings,
    Building2,
    Briefcase,
    Users,
    BarChart3,
    LogOut,
    Ticket
} from "lucide-react";

const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "Services", icon: Briefcase, href: "/admin/services" },
    { name: "Organizations", icon: Building2, href: "/admin/organizations" },
    { name: "Users", icon: Users, href: "/admin/users" },
    { name: "Analytics", icon: BarChart3, href: "/admin/analytics" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export const AdminSidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Clear authentication state
        localStorage.removeItem("isAdminAuthenticated");
        document.cookie = "isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/admin/login");
    };

    return (
        <aside className="w-64 h-screen bg-card border-r border-border fixed left-0 top-0 z-40 flex flex-col">
            <div className="p-6">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                        <Ticket className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        WaitWise
                    </span>
                </Link>
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mt-1 ml-10">Admin Panel</p>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-200 group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
