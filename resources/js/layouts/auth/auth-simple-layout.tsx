import { Link } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { home } from '@/routes';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { resolvedAppearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        updateAppearance(resolvedAppearance === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[linear-gradient(180deg,#f5f7fa_0%,#edf2f9_100%)] dark:bg-[linear-gradient(180deg,#0b1727_0%,#111827_100%)] p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="relative flex flex-col gap-8 rounded-xl border border-border/60 bg-card p-6 shadow-sm">
                    <div className="absolute right-3 top-3">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            onClick={toggleTheme}
                        >
                            {resolvedAppearance === 'dark' ? (
                                <Sun className="size-5 opacity-80" />
                            ) : (
                                <Moon className="size-5 opacity-80" />
                            )}
                        </Button>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">{title}</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>

                    {children}

                    <div className="pt-2 text-center text-xs text-muted-foreground">
                        Wan Wokabaot
                    </div>
                </div>
            </div>
        </div>
    );
}
