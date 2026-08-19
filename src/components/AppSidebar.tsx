import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Mail, FileText, CalendarClock, Sparkles } from "lucide-react";

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
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", to: "/", icon: LayoutDashboard },
  { title: "Email Generator", to: "/email-generator", icon: Mail },
  { title: "Notes Summarizer", to: "/notes-summarizer", icon: FileText },
  { title: "Task Planner", to: "/task-planner", icon: CalendarClock },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-3 py-4">
        <div className="flex items-center gap-2.5">
          <div className="gradient-hero flex size-9 shrink-0 items-center justify-center rounded-lg text-primary-foreground">
            <Sparkles className="size-4.5" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold">Workplace AI</p>
            <p className="truncate text-xs text-sidebar-foreground/60">Productivity Assistant</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={pathname === item.to} tooltip={item.title}>
                    <Link to={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-4 group-data-[collapsible=icon]:hidden">
        <p className="text-xs leading-relaxed text-sidebar-foreground/60">
          Demo mode — all responses are simulated for illustration.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
