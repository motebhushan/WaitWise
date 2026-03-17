"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Bell, Search, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        // Simple authentication check
        const auth = typeof window !== "undefined" ? localStorage.getItem("isAdminAuthenticated") : null;

        if (!auth && !isLoginPage) {
            router.push("/admin/login");
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, isLoginPage, router]);

    // Don't render anything while checking auth to prevent layout shift
    if (isAuthenticated === null && !isLoginPage) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // For login page, just render the children without sidebar/header
    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-background">
            <AdminSidebar />
            <div className="pl-64">
                {/* Admin Header */}
                <header className="h-20 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-8">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search admin panel..."
                            className="pl-10 rounded-xl bg-background border-border"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-xl hover:bg-accent relative transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
                        </button>
                        <div className="h-8 w-px bg-border mx-2" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold leading-none">Admin User</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-tight mt-1">Super Admin</p>
                            </div>
                            <UserCircle className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </header>

                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
