import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="bg-gradient-to-br from-cyan-950 via-neutral-950 to-sky-800 min-h-screen">
            <Navbar />
            { children }
        </main>
    )
}