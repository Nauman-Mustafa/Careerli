import React, { Suspense } from 'react';

const LazySignup = React.lazy(() => import('./index.page'))

export const SignupLazyPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazySignup />
            </Suspense>
        </div>
    )
}