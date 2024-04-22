import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface WithSupervisorPrivilegeProps {
    // Add any additional props, if needed
}

type WithSupervisorPrivilegeComponent = React.FC<WithSupervisorPrivilegeProps>;

function withSupervisorPrivilege(Component: WithSupervisorPrivilegeComponent) {
    return function WrappedComponent(props: WithSupervisorPrivilegeProps) {
        const router = useRouter();
        const hasSupervisorPrivilegeRef = useRef(false);

        useEffect(() => {
            const cookies = document.cookie.split(';').map(c => c.trim());
            const roleCookie = cookies.find((c) => c.startsWith('role='))?.split('=')[1]; 
            hasSupervisorPrivilegeRef.current = (roleCookie === 'Supervisor' || roleCookie === 'SuperUser');

            if (!hasSupervisorPrivilegeRef.current) {
                console.log('🔴🟥 User does not have Supervisor privileges.');
                router.push('/admin/default'); // Or display a message
            }
        }, [router]); 

        return <Component {...props} /> 
    };
}

export default withSupervisorPrivilege;
