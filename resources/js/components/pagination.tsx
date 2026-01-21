import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    total: number;
    perPage: number;
    className?: string;
}

export function Pagination({
    links,
    currentPage,
    lastPage,
    from,
    to,
    total,
    perPage,
    className = '',
}: PaginationProps) {
    if (lastPage <= 1) {
        return null;
    }

    return (
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
            <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{from}</span> to{' '}
                <span className="font-medium">{to}</span> of{' '}
                <span className="font-medium">{total}</span> results
            </div>

            <div className="flex items-center gap-1">
                {/* Previous Button */}
                {links.find(link => link.label === '&laquo; Previous')?.url && (
                    <Link
                        href={links.find(link => link.label === '&laquo; Previous')!.url!}
                        preserveScroll
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                                            <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                    </Link>
                )}

                {/* Page Numbers */}
                {links
                    .filter(link => !['&laquo; Previous', 'Next &raquo;'].includes(link.label))
                    .map((link, index) => {
                        const isActive = link.active;
                        const isDisabled = !link.url;

                        if (link.label === '...') {
                            return (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300"
                                >
                                    ...
                                </span>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                className={`inline-flex items-center px-3 py-2 text-sm font-medium border ${
                                    isActive
                                        ? 'text-blue-600 bg-blue-50 border-blue-500 z-10'
                                        : isDisabled
                                            ? 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed'
                                            : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
                                }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                {/* Next Button */}
                {links.find(link => link.label === 'Next &raquo;')?.url && (
                    <Link
                        href={links.find(link => link.label === 'Next &raquo;')!.url!}
                        preserveScroll
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                                            Next
                                            <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                )}
            </div>

            {/* Per Page Selector */}
            <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>Show:</span>
                <select
                    value={perPage}
                    onChange={(e) => {
                        const newPerPage = e.target.value;
                        const currentUrl = new URL(window.location.href);
                        currentUrl.searchParams.set('per_page', newPerPage);
                        currentUrl.searchParams.set('page', '1'); // Reset to first page
                        window.location.href = currentUrl.toString();
                    }}
                    className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span>per page</span>
            </div>
        </div>
    );
}