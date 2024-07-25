import type { Metadata } from "next";
// change the font to Sans
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";


const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"] ,
  weight: ["300","400", "500", "600", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "WizPulse",
  description: "A Healthcare Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* cn allows you to add both static & dynamically rendered classnames */}
      <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
