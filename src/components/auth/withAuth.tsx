import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface WithAuthProps {
    // Add any additional props expected by protected components here
}

type WithAuthComponent = React.FC<WithAuthProps>;

function withAuth(Component: WithAuthComponent) {
    return function WrappedComponent(props: WithAuthProps) {
        const router = useRouter();
        const isAuthenticatedRef = useRef(false);

        useEffect(() => {
            isAuthenticatedRef.current = document.cookie.split(';').some((c) => c.trim().startsWith('authToken='));

            if (!isAuthenticatedRef.current) {
                console.log('🔴🟥 User is not authenticated. Redirecting to sign-in page... 🟥🔴');
                router.push('/auth/sign-in');
            } else { 
                console.log("✅✅ User is authenticated. Rendering component");
            }
        }, [router]); // Include router in the useEffect dependencies 
        
        return <Component {...props} />;
    };
}

export default withAuth;
