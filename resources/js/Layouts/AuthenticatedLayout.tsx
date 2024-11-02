import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AutoBreadcrumb from "@/components/AutoBreadcrumb";

export default function Layout({ children, auth }: { children: React.ReactNode, auth: any; }) {
    return (
        <SidebarProvider>
            <AppSidebar auth={auth} />
            <main className={'dark:bg-black dark:text-white w-full px-10'}>
                <div className={'flex items-center my-5'}>
                    <SidebarTrigger className={'mr-2'} />
                    <AutoBreadcrumb />
                </div>
                {children}
            </main>
        </SidebarProvider>
    );
}
