import React, { Suspense } from "react";

const LazyAllSet = React.lazy(() => import("./index.page"));

export const AllSetLazy = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyAllSet />
      </Suspense>
    </div>
  );
};
