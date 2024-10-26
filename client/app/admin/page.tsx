import Sidebar from "@/components/admin/components/Sidebar";
import Dashboard from "@/components/admin/pages/Dashboard";
import React, { Fragment } from "react";

export default function page() {
  return (
    <section>
      <Sidebar />
      <div className="ml-[18rem]">
        <Dashboard />
      </div>
    </section>
  );
}
