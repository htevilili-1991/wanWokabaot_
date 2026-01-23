import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download, FileText, BarChart3, Package, Users, CreditCard } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reports',
        href: '/reports',
    },
];

const reportTypes = [
    {
        id: 'sales',
        name: 'Sales Report',
        description: 'Revenue, transactions, and sales performance',
        icon: BarChart3,
        color: 'bg-blue-500',
    },
    {
        id: 'inventory',
        name: 'Inventory Report',
        description: 'Stock levels, values, and low stock alerts',
        icon: Package,
        color: 'bg-green-500',
    },
    {
        id: 'members',
        name: 'Members Report',
        description: 'Member information, balances, and activity',
        icon: Users,
        color: 'bg-purple-500',
    },
    {
        id: 'transactions',
        name: 'Transactions Report',
        description: 'All transactions including pending and completed',
        icon: CreditCard,
        color: 'bg-orange-500',
    },
];

export default function Reports() {
    const [selectedReportType, setSelectedReportType] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<string>('month');

    const form = useForm({
        type: '',
        format: 'pdf',
        start_date: '',
        end_date: '',
        period: 'month',
    });

    const handleGenerateReport = (reportType: string, format: string) => {
        // Create a hidden form and submit it to trigger file download
        const formElement = document.createElement('form');
        formElement.method = 'POST';
        formElement.action = '/reports/generate';

        // Add CSRF token
        const csrfToken = document.querySelector('meta[name="csrf-token"]');
        if (csrfToken) {
            const csrfInput = document.createElement('input');
            csrfInput.type = 'hidden';
            csrfInput.name = '_token';
            csrfInput.value = csrfToken.getAttribute('content') || '';
            formElement.appendChild(csrfInput);
        }

        // Add form data
        const inputs = [
            { name: 'type', value: reportType },
            { name: 'format', value: format },
            { name: 'start_date', value: selectedPeriod === 'custom' ? form.data.start_date : '' },
            { name: 'end_date', value: selectedPeriod === 'custom' ? form.data.end_date : '' },
            { name: 'period', value: selectedPeriod },
        ];

        inputs.forEach(input => {
            const inputElement = document.createElement('input');
            inputElement.type = 'hidden';
            inputElement.name = input.name;
            inputElement.value = input.value;
            formElement.appendChild(inputElement);
        });

        // Submit the form
        document.body.appendChild(formElement);
        formElement.submit();
        document.body.removeChild(formElement);
    };

    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period);
        if (period !== 'custom') {
            form.setData('start_date', '');
            form.setData('end_date', '');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reports" />

            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                        <p className="text-muted-foreground">
                            Generate and download detailed reports for your cooperative
                        </p>
                    </div>
                </div>

                {/* Date Range Selector */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Report Period
                        </CardTitle>
                        <CardDescription>
                            Select the time period for your report
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="period">Quick Select</Label>
                                <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="week">This Week</SelectItem>
                                        <SelectItem value="month">This Month</SelectItem>
                                        <SelectItem value="year">This Year</SelectItem>
                                        <SelectItem value="all">All Time</SelectItem>
                                        <SelectItem value="custom">Custom Range</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {selectedPeriod === 'custom' && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="start_date">Start Date</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={form.data.start_date}
                                            onChange={(e) => form.setData('start_date', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="end_date">End Date</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={form.data.end_date}
                                            onChange={(e) => form.setData('end_date', e.target.value)}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Report Types */}
                <div className="grid gap-6 md:grid-cols-2">
                    {reportTypes.map((reportType) => (
                        <Card key={reportType.id} className="relative">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${reportType.color}`}>
                                        <reportType.icon className="h-5 w-5 text-white" />
                                    </div>
                                    {reportType.name}
                                </CardTitle>
                                <CardDescription>
                                    {reportType.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleGenerateReport(reportType.id, 'pdf')}
                                        disabled={form.processing}
                                        className="flex-1"
                                    >
                                        <Download className="mr-2 h-4 w-4" />
                                        Generate PDF Report
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Report Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Report Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-2">Available Reports</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• <strong>Sales Report:</strong> Transaction details, revenue analysis</li>
                                    <li>• <strong>Inventory Report:</strong> Stock levels, values, alerts</li>
                                    <li>• <strong>Members Report:</strong> Member details, balances, activity</li>
                                    <li>• <strong>Transactions Report:</strong> All transaction history</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Export Format</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="default">PDF</Badge>
                                        <span className="text-sm text-muted-foreground">
                                            Professional PDF report, ready for printing and sharing
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}