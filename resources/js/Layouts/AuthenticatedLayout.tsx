import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children, auth }: { children: React.ReactNode, auth: any; }) {
    return (
        <SidebarProvider>
            <AppSidebar auth={auth} />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
