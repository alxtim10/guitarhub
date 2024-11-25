'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const item = window.localStorage.getItem("user_id");
        if (!item) {
            router.push("/login");
        }
    }, [router]);

    return <>{children}</>;
};

export default AuthLayout;