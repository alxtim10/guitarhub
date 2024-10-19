import Sidebar from "@/components/admin/components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guitarhub CMS",
  description: "Generated by create next app",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <div className='ml-[18rem]'>
          {children}
        </div>
      </body>

    </html>
  );
}
