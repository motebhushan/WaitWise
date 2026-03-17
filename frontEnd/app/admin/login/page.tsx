"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket, Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simple authentication for demonstration
        // In a real app, this would be a server-side check with proper security
        setTimeout(() => {
            if (username === "admin" && password === "admin") {
                document.cookie = "isLoggedIn=true; path=/";
                localStorage.setItem("isAdminAuthenticated", "true");
                router.push("/admin");
            } else {
                setError("Invalid credentials. Please try again.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center justify-center p-3 bg-primary rounded-2xl mb-4 shadow-xl shadow-primary/20 rotate-3">
                        <Ticket className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">WaitWise Admin</h1>
                    <p className="text-muted-foreground mt-2">Enter your credentials to access the dashboard</p>
                </div>

                {/* Login Card */}
                <div className="glass p-8 rounded-[2rem] border-primary/10 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-700 delay-100">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

                    <form onSubmit={handleLogin} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="text"
                                    placeholder="admin"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 h-12 bg-background/50 border-primary/10 rounded-xl focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 h-12 bg-background/50 border-primary/10 rounded-xl focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-4 rounded-xl animate-in shake duration-300">
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    <span>Logging in...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
                    Protected by enterprise-grade security. <br />
                    Need help? <a href="#" className="text-primary hover:underline underline-offset-4">Contact IT Support</a>
                </p>
            </div>
        </div>
    );
}
