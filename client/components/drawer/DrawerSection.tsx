"use client";

import { Drawer } from "flowbite-react/components/Drawer";
import { useEffect, useState } from "react";
import { Close } from "flowbite-react-icons/outline";
import { theme } from "@/constants/style";


interface DrawerButton {
    disabled?: boolean;
    content: React.ReactNode;
    onClick?: () => void;
}


interface DrawerSectionProps {
    children?: React.ReactNode;
    title?: string;
    closeDrawer?: (status: boolean) => void;
    status: boolean;
    primnarButton?: DrawerButton;
    secondaryButton?: DrawerButton;
    classNameContent?: string;
    classNameBtnAction?: string;
    showCloseButton?: boolean;
}

function DrawerSection({
    children,
    title,
    status,
    closeDrawer,
    primnarButton,
    secondaryButton,
    classNameContent,
    classNameBtnAction,
    showCloseButton = true,
}: DrawerSectionProps) {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
        closeDrawer && closeDrawer(false);
    };

    useEffect(() => {
        setIsOpen(status);
    }, [isOpen, status]);

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={handleClose}
                position="bottom"
                className="rounded-t-2xl"
                theme={theme}
            >
                <div
                    className={`flex justify-center px-4 py-3 ${title ? "border-b-1" : "border-b-0"
                        }`}
                >
                    <div className=""></div>
                    <div className="text-title font-bold text-lg">{title}</div>
                </div>
                <Drawer.Items>
                    <div className={`px-4 py-3 ${classNameContent}`}>
                        <div className="">{children}</div>
                    </div>
                </Drawer.Items>
            </Drawer>
        </>
    );
}

export default DrawerSection;
