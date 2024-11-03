import { ChevronDown, CircleDollarSign, Gauge, GraduationCap, Proportions, WalletCards } from "lucide-react";
import Logo from '@/Assets/img/logo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { router } from "@inertiajs/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ModeToggle } from "./mode-toggle";
import { NavUser } from "./nav-user";

const sidebarMenuItem = [
  {
    title: 'Dashboard',
    link: 'dashboard',
    isAdminOnly: false,
    icon: <Gauge />,
    collapse: false
  },
  {
    title: 'Tagihan PPDB',
    link: 'tagihan-ppdb',
    isAdminOnly: false,
    icon: <CircleDollarSign />,
    collapse: false
  },
  {
    title: 'Tagihan SPP',
    link: 'tagihan-spp',
    isAdminOnly: false,
    icon: <CircleDollarSign />,
    collapse: false
  },
  {
    title: 'Data Pembayaran Siswa',
    link: 'data-pembayaran-siswa',
    isAdminOnly: true,
    icon: <WalletCards />,
    collapse: false
  },
  {
    title: 'Data Laporan',
    isAdminOnly: true,
    icon: <Proportions />,
    collapse: true,
    collapseMenu: [
      {
        title: 'Data Siswa',
        link: 'data-pembayaran-siswa',
      },
      {
        title: 'Pembayaran Siswa',
        link: 'data-pembayaran-siswa',
      },
    ]
  },
  {
    title: 'Data Master',
    isAdminOnly: true,
    icon: <GraduationCap />,
    collapse: true,
    collapseMenu: [
      {
        title: 'Data Siswa',
        link: 'data-pembayaran-siswa',
      },
      {
        title: 'Data Item PPDB',
        link: 'data-pembayaran-siswa',
      },
      {
        title: 'Data Item SPP',
        link: 'data-pembayaran-siswa',
      },
    ]
  },
];

export function AppSidebar({ auth }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className={'flex items-center gap-2 font-semibold text-2xl'}>
          <img src={Logo} className={'w-10 h-10'} />
          SIPSPP
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menus</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarMenuItem.map(menu => (
                (menu.isAdminOnly == auth.user.is_admin || menu.link == 'dashboard') ? (
                  <SidebarMenuItem key={menu.title}>
                    {menu.collapse ? (
                      <Collapsible defaultOpen className="group/collapsible">
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton>
                              {menu.icon}
                              <div className={'flex justify-between w-full items-center'}>
                                <span>{menu.title}</span>
                                <ChevronDown size={15} />
                              </div>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            {menu.collapseMenu.map(collapse => (
                              <SidebarMenuSub key={collapse.link + collapse.title}>
                                <SidebarMenuSubItem>
                                  <SidebarMenuButton>
                                    {collapse.title}
                                  </SidebarMenuButton>
                                </SidebarMenuSubItem>
                              </SidebarMenuSub>
                            ))}
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton onClick={() => router.visit(route(menu.link))} isActive={route().current(menu.link)}>
                        {menu.icon}
                        {menu.title}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ) : ''
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <ModeToggle />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser user={auth.user} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  );
}
