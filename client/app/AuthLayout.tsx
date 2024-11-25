'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const checkLocalStorage = () => {
            const item = window.localStorage.getItem("user_id");
            if (!item) {
                router.push("/login"); // Redirect if the item is missing
            }
        };

        // Initial check on mount
        checkLocalStorage();

        // Handle the back button and navigation events
        const handlePopstate = () => {
            checkLocalStorage();
        };

        window.addEventListener("popstate", handlePopstate);

        return () => {
            window.removeEventListener("popstate", handlePopstate);
        };
    }, [router]);

    return <>{children}</>;
};

export default AuthLayout;