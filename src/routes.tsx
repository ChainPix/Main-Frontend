import { useEffect, useState } from 'react'; 
import { MdEditCalendar, MdHome, MdCheckCircle } from 'react-icons/md';
import { FaUsersGear } from "react-icons/fa6";

interface Route {
    name: string;
    layout: string;
    path: string;
    icon: React.ReactElement;
    secondary?: boolean;
}

const initialRoutes: Route[] = [ // Change routes to an array of Route objects
    {
        name: 'Main Dashboard',
        layout: '/admin',
        path: 'default',
        icon: <MdHome className="h-6 w-6" />
    },
    {
        name: 'Apply Leave',
        layout: '/admin',
        path: 'apply-leave',
        icon: <MdEditCalendar className="h-6 w-6" />,
        secondary: true
    }
    // ... (Your other routes)
];

const GetRoutes = () => { 
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const cookies = document.cookie.split(';').map(c => c.trim());
        const roleCookie = cookies.find((c) => c.startsWith('role='))?.split('=')[1];
        setUserRole(roleCookie);
    }, []);

    if (userRole === null) {
        return initialRoutes; // Render nothing during initial loading
    }

    const routes: Route[] = (userRole === 'Supervisor' || userRole === 'SuperUser') ? [
        ...initialRoutes,
        {
            name: 'Approve Leave',
            layout: '/admin',
            path: 'approve-leave',
            icon: <MdCheckCircle className="h-6 w-6" />,
            secondary: true
        }
    ] : initialRoutes;

    // add user-management rout only for SuperUser
    if (userRole === 'SuperUser') {
        routes.push({
            name: 'User Management',
            layout: '/admin',
            path: 'user-management',
            icon: <FaUsersGear className="h-6 w-6" />,
            secondary: true
        });
    }
    return routes;
}

export default GetRoutes;
