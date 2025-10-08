"use client"

import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"


export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  if (!activeTeam) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>

            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className=" text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                
              </div>
              <Link href={"/"}>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">MediCare</span>
                <span className="truncate text-xs">Administrator</span>
              </div>
              </Link>
              
            </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}



// "use client"

// import * as React from "react"
// import {Plus } from "lucide-react"
// import Link from "next/link"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   useSidebar,
// } from "@/components/ui/sidebar"

// export function TeamSwitcher({
//   teams,
// }: {
//   teams: {
//     name: string
//     plan: string
//   }[]
// }) {
//   const { isMobile } = useSidebar()
//   const [activeTeam, setActiveTeam] = React.useState(teams[0])

//   if (!activeTeam) {
//     return null
//   }

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <SidebarMenuButton
//               size="lg"
//               className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//             >
//               <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"></div>
//               <Link href={"/"}>
//              <div className="grid flex-1 text-left text-sm leading-tight">
//                 <span className="truncate font-medium">{activeTeam.name}</span>
//                 <span className="truncate text-xs">{activeTeam.plan}</span>
//               </div>
//               </Link>
//             </SidebarMenuButton>
//           </DropdownMenuTrigger>
          
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }
