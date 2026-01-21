import '../css/app.css';
import 'nprogress/nprogress.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import NProgress from 'nprogress';

import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Configure NProgress
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.08,
    easing: 'ease',
    speed: 500,
});

// Import Inertia router for navigation events
import { router } from '@inertiajs/react';

// Start progress bar on navigation
router.on('start', () => NProgress.start());
router.on('finish', () => NProgress.done());

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
});

// This will set light / dark mode on load...
initializeTheme();
