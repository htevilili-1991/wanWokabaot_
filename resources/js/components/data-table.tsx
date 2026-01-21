import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, ArrowUpDown } from 'lucide-react';

interface Column<T = any> {
    name: string;
    selector?: (row: T) => any;
    sortable?: boolean;
    cell?: (row: T, index: number) => React.ReactNode;
    width?: string;
    className?: string;
}

interface DataTableProps<T = any> {
    columns: Column<T>[];
    data: T[];
    keyField?: string;
    sortable?: boolean;
    onSort?: (column: string, direction: 'asc' | 'desc') => void;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
}

export function DataTable<T extends Record<string, any>>({
    columns,
    data,
    keyField = 'id',
    sortable = true,
    onSort,
    sortBy,
    sortDirection,
    loading = false,
    emptyMessage = 'No data available',
    className = '',
}: DataTableProps<T>) {
    const handleSort = (columnName: string) => {
        if (!sortable || !onSort) return;

        let newDirection: 'asc' | 'desc' = 'asc';
        if (sortBy === columnName && sortDirection === 'asc') {
            newDirection = 'desc';
        }

        onSort(columnName, newDirection);
    };

    if (loading) {
        return (
            <div className={`rounded-md border ${className}`}>
                <div className="p-8 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className={`rounded-md border ${className}`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableHead
                                key={index}
                                className={`${column.sortable && sortable ? 'cursor-pointer hover:bg-gray-50' : ''} ${column.className || ''}`}
                                style={{ width: column.width }}
                                onClick={() => column.sortable && handleSort(column.name)}
                            >
                                <div className="flex items-center gap-1">
                                    {column.name}
                                    {column.sortable && sortable && (
                                        sortBy === column.name ? (
                                            sortDirection === 'asc' ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )
                                        ) : (
                                            <ArrowUpDown className="h-4 w-4 opacity-50" />
                                        )
                                    )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center text-gray-500"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow key={row[keyField] || rowIndex}>
                                {columns.map((column, colIndex) => (
                                    <TableCell
                                        key={colIndex}
                                        className={column.className || ''}
                                    >
                                        {column.cell
                                            ? column.cell(row, rowIndex)
                                            : column.selector
                                                ? column.selector(row)
                                                : row[column.name.toLowerCase().replace(/\s+/g, '_')]
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

// Example usage for Members table
export const MembersTableColumns: Column<any>[] = [
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: (row) => row.phone || '-',
        sortable: true,
    },
    {
        name: 'Status',
        selector: (row) => row.status,
        sortable: true,
        cell: (row) => (
            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${
                row.status === 'Active'
                    ? 'bg-green-100 text-green-800 border-green-200'
                    : row.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-800 border-gray-200'
                        : 'bg-red-100 text-red-800 border-red-200'
            }`}>
                {row.status}
            </span>
        ),
    },
    {
        name: 'Total Unpaid (VT)',
        selector: (row) => row.balance,
        sortable: true,
        cell: (row) => (
            <div className={`px-2 py-1 rounded-md border ${
                row.balance >= 2000
                    ? 'bg-red-100 text-red-800 font-semibold border-red-200'
                    : 'text-gray-900 border-transparent'
            }`}>
                {row.unpaid_total} VT
            </div>
        ),
    },
    {
        name: 'Total Spent (VT)',
        selector: (row) => row.total_spent,
        sortable: true,
        cell: (row) => (
            <span className="text-gray-900">
                {typeof row.total_spent === 'number' ? row.total_spent.toFixed(2) : row.total_spent} VT
            </span>
        ),
    },
];