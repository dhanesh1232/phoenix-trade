import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function NavHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton className="flex items-center gap-2 hover:bg-primary/20 hover:text-primary">
          <Image
            src="/logo.png"
            width={35}
            height={100}
            alt="Phoenix International Trading"
          />
          <p>Phoenix</p>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
