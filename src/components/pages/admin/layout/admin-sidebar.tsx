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
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { NavHeader } from "./nav-header";
import Link from "next/link";
import { SECRET_ADMIN_PATH } from "@/lib/validators_client";
import { adminLinks } from "@/lib/static";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";

function getActiveMatcher(pathname: string) {
  // /admin/profile  -> /profile
  // /admin/products/list -> /products/list
  const withoutAdmin = pathname.replace(`/${SECRET_ADMIN_PATH}`, "") || "/";

  return (itemUrl: string) => {
    // normalize item url: "" -> "/"
    const target = itemUrl || "/";

    // exact match
    if (withoutAdmin === target) return true;

    // nested match: /products/list should activate /products
    if (
      target !== "/" &&
      withoutAdmin.startsWith(target.endsWith("/") ? target : `${target}/`)
    ) {
      return true;
    }

    return false;
  };
}

export function AppSidebar({ ...props }) {
  const path = usePathname();
  const isActive = getActiveMatcher(path);

  return (
    <Sidebar {...props} variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map((item) => {
                const Icon = Icons[item.icon as keyof typeof Icons];
                const active = isActive(item.url); // <- single source of truth

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={active}
                      className="data-[active=true]:bg-primary/30 data-[active=true]:text-primary"
                    >
                      <Link href={`/${SECRET_ADMIN_PATH}${item.url}`}>
                        {Icon && <Icon className="size-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
