"use client";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  return (
    <div className="h-full">
      <main className="h-full">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;