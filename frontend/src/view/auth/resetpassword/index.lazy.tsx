import React, { Suspense } from "react";

const LazyResetPassword = React.lazy(() => import("./index.page"));

export const ResetPasswordLazy = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyResetPassword />
      </Suspense>
    </div>
  );
};
