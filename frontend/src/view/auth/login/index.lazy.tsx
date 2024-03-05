import React, { Suspense } from 'react';

const LazyLogin = React.lazy(() => import('./index.page'))

export const LoginLazyPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyLogin />
            </Suspense>
        </div>
    )
}