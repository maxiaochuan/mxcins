import { jsx, Fragment } from 'react/jsx-runtime';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';

const dynamic = (factory, opts = {}) => {
    const { isLayout = false } = opts;
    const RealComponent = lazy(factory);
    return () => {
        return (jsx(Suspense, Object.assign({ fallback: jsx(Fragment, { children: "loading..." }) }, { children: jsx(RealComponent, { children: isLayout ? jsx(Outlet, {}) : null }) })));
    };
};

export { dynamic as default };
