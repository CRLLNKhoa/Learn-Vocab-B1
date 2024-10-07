import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="relative w-full min-h-screen">
    {children}
  </div>;
}

export default Layout;
