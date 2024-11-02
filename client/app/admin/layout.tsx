import Sidebar from "@/components/admin/components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`antialiased`}>
                <Sidebar />
                <div className="ml-[18rem] p-5">
                    {children}
                </div>
            </body>
        </html>
    );
}