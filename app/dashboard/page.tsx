import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div className="mt-32 text-xl">
        Dashboard!
        <span className="mx-2 text-blue-600  border-b border-slate-400">
          {session.user.email}
        </span>
        You are Logged in.
      </div>
    );
  } else {
    return <div className="mt-32">Dashboard, Public informations</div>;
  }
};

export default Dashboard;
