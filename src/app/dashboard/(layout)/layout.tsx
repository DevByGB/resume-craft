import { ReactNode } from "react"
import Logo from "@/assets/logo.svg"
import { NavItems } from "@/components/pages/dashboard/nav-items";
import { UserDropdown } from "@/components/pages/dashboard/user-dropdown";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { auth } from "@/lib/auth";

type DashboardLayoutProps = {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const session = await auth();

  return (
    <div className="w-full h-screen overflow-hidden grid grid-cols-[300px,1fr]">
      <aside className="w-full h-full flex flex-col items-center border-r border-muted">
        <div className="w-full p-6 border-b border-muted">
          <Logo className="max-w-[100px] mx-auto" />
        </div>

        <NavItems />

        <div className="w-full mt-auto border-t border-muted px-3 py-4 flex items-center justify-between gap-2">
          <UserDropdown user={session?.user} />
          <ThemeToggle />
        </div>
      </aside>

      <main className="p-6 flex flex-col w-full h-full overflow-auto">
        {children}
      </main>
    </div>
  )
}