import React, { Suspense } from 'react';

const LazyForgotPassword = React.lazy(() => import('./index.page'))

export const ForgotLazyPage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyForgotPassword />
            </Suspense>
        </div>
    )
}