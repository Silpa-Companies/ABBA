import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABBA | Patients",
  description: "Coordination hub and clinical matching directory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex h-screen w-full overflow-hidden bg-zinc-50 text-zinc-950`}
      >
        {/* Sidebar (Forced Dark Mode) */}
        <aside className="hidden md:flex w-64 flex-col bg-zinc-950 text-zinc-400 border-r border-zinc-800 shrink-0">
          <div className="h-14 border-b border-zinc-800 flex items-center px-6 font-semibold text-zinc-100 tracking-tight">
            ABBA
          </div>
          <div className="p-4 text-sm">
            {/* We will build the navigation links here later */}
            Navigation Placeholder
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Navigation / Breadcrumbs */}
          <header className="h-14 border-b border-zinc-200 bg-white flex items-center px-8 shrink-0">
            <span className="text-sm font-medium text-zinc-500">
              ABBA / <span className="text-zinc-900">Patients</span>
            </span>
          </header>

          {/* Page Content */}
          <div className="p-8 flex-1">{children}</div>
        </main>
      </body>
    </html>
  );
}
