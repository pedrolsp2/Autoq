import * as React from 'react';
import {
  BookOpen,
  Bot,
  Cog,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  UserPlus,
  UserPlus2,
  UserRoundPlus,
} from 'lucide-react';

import { NavMain } from '@/components/Sidebar/nav-main';
import { NavProjects } from '@/components/Sidebar/nav-projects';
import { NavSecondary } from '@/components/Sidebar/nav-secondary';
import { NavUser } from '@/components/Sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useStore } from '@/store';
import { getInitials } from '@/utils/stringFormatter';
import { useNavigate } from 'react-router-dom';

const data = {
  navMain: [
    {
      title: 'Usuário',
      icon: UserPlus,
      isActive: true,
      items: [
        {
          title: 'Criar',
          url: 'usuario/criar',
        },
        {
          title: 'Gestão',
          url: 'usuario/gestao',
        },
      ],
    },
    {
      title: 'Cliente',
      icon: UserRoundPlus,
      isActive: true,
      items: [
        {
          title: 'Criar',
          url: 'cliente/criar',
        },
        {
          title: 'Gestão',
          url: 'cliente/gestao',
        },
      ],
    },
    {
      title: 'Peças',
      icon: Cog,
      isActive: true,
      items: [
        {
          title: 'Criar',
          url: 'pecas/criar',
        },
        {
          title: 'Gestão',
          url: 'pecas/gestao',
        },
      ],
    },
  ],
  // navSecondary: [
  //   {
  //     title: 'Support',
  //     url: '#',
  //     icon: LifeBuoy,
  //   },
  //   {
  //     title: 'Feedback',
  //     url: '#',
  //     icon: Send,
  //   },
  // ],
  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();
  const { NM_USUARIO, POLITICA, EMAIL_USUARIO, DS_USUARIO } =
    useStore.use.usuario();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild onClick={() => navigate('/')}>
              <div className="cursor-pointer">
                <div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-primary-500 text-sidebar-primary-foreground">
                  <Cog className="size-4" />
                </div>
                <div className="grid flex-1 text-sm leading-tight text-left">
                  <span className="font-bold truncate">AutoQ</span>
                  <span className="text-xs truncate">{POLITICA}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: getInitials(NM_USUARIO || ''),
            email: EMAIL_USUARIO,
            name: DS_USUARIO,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
