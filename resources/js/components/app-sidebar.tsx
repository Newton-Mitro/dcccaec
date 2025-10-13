import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import {
    BabyIcon,
    BadgeCheckIcon,
    BellDotIcon,
    CalendarClockIcon,
    DramaIcon,
    Globe2,
    ImagePlusIcon,
    LayoutGrid,
    MailQuestion,
    NotebookIcon,
    Paperclip,
    PickaxeIcon,
    TagsIcon,
    TreePalm,
    TrophyIcon,
    UploadIcon,
    UserRoundCheckIcon,
    Users2,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Visit Site',
        href: '/',
        icon: Globe2,
    },
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Media',
        href: '/admin/media',
        icon: UploadIcon,
    },
    {
        title: 'Pages',
        href: '/admin/pages',
        icon: NotebookIcon,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: TagsIcon,
    },
    {
        title: 'Programs',
        href: '/admin/programs',
        icon: BabyIcon,
    },
    {
        title: 'Notices',
        href: '/admin/notices',
        icon: BellDotIcon,
    },
    {
        title: 'Events',
        href: '/admin/events',
        icon: CalendarClockIcon,
    },
    {
        title: 'Holidays',
        href: '/admin/holidays',
        icon: TreePalm,
    },
    {
        title: 'Teams',
        href: '/admin/teams',
        icon: DramaIcon,
    },
    {
        title: 'Galleries',
        href: '/admin/galleries',
        icon: ImagePlusIcon,
    },
    {
        title: 'Awards',
        href: '/admin/awards',
        icon: TrophyIcon,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: BadgeCheckIcon,
    },
    {
        title: 'Job Circulars',
        href: '/admin/careers',
        icon: PickaxeIcon,
    },
    {
        title: 'Job Applications',
        href: '/admin/job-applications',
        icon: Paperclip,
    },
    {
        title: 'Contact Messages',
        href: '/admin/contact-messages',
        icon: MailQuestion,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users2,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Developer Profile',
        href: 'https://www.linkedin.com/in/newton-mitro-24229311/',
        icon: UserRoundCheckIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div>
                                <AppLogo />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
