"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,

  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toogle"

const data = {
  teams: [
    {
      name: "MediCare",
      plan: "Administrator",
    },
    
  ],
  
  navMain: [
    
    {
      title: "Navigation Menu 1",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "example 1",
          url: "#",
        },
        {
          title: "example 2",
          url: "#",
        },
        {
          title: "example 3",
          url: "#",
        },
      ],
    },
    {
      title: "Navigation Menu 2",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "example 1",
          url: "#",
        },
        {
          title: "example2 ",
          url: "#",
        },
        {
          title: "example 3",
          url: "#",
        },
      ],
    },
    {
      title: "Health Tips",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Add Health Tips",
          url: "/addHealthTips",
        },
        {
          title: "View All Health Tips",
          url: "/viewAllHealthTips",
        },
       
      ],
    },
    {
      title: "Dashboard",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "example 1",
          url: "#",
        },
        {
          title: "example 2",
          url: "#",
        },
        {
          title: "example 3",
          url: "#",
        },
        {
          title: "example 4",
          url: "#",
        },
      ],
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <div className="flex ml-2">
        <ModeToggle/>
        </div>
      
      </SidebarContent>
      
      <SidebarRail />

    </Sidebar>
  )
}
