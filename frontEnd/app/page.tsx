import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />

      {/* How it Works Section - Placeholder for now */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12">How it Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Join Queue", desc: "Scan QR code or use the app to get your digital token." },
              { step: "02", title: "Wait Anywhere", desc: "Track your position in real-time. No need to stand in line." },
              { step: "03", title: "Get Notified", desc: "Receive a notification when it's your turn to be served." }
            ].map((item, i) => (
              <div key={i} className="relative p-8 glass rounded-3xl border-primary/10">
                <span className="text-6xl font-black text-primary/10 absolute top-4 right-8 italic">{item.step}</span>
                <h3 className="text-xl font-bold mb-4 mt-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-12 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <div className="w-5 h-5 bg-primary-foreground rounded-sm" />
            </div>
            <span className="font-bold text-xl tracking-tight">WaitWise</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} WaitWise. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
