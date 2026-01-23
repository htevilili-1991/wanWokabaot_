import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { index, store } from '@/routes/dividends';
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';

export default function CreateDividendPeriod() {
    const breadcrumbs = [
        { title: 'Dashboard', href: dashboard() },
        { title: 'Dividends', href: index() },
        { title: 'Create Period', href: '' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        start_date: '',
        end_date: '',
        total_profit: '',
        dividend_rate: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Dividend Period" />

            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={index()}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Dividend Periods
                        </Link>
                    </Button>
                </div>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Dividend Period</h1>
                    <p className="text-muted-foreground">
                        Set up a new dividend period to distribute profits to members based on their patronage.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dividend Period Details</CardTitle>
                            <CardDescription>
                                Configure the dividend period parameters and profit distribution settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Period Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., 2026 Dividend Period"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dividend_rate">Dividend Rate (%)</Label>
                                    <Input
                                        id="dividend_rate"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        max="100"
                                        value={data.dividend_rate}
                                        onChange={(e) => setData('dividend_rate', e.target.value)}
                                        placeholder="5.00"
                                        required
                                    />
                                    {errors.dividend_rate && <p className="text-sm text-red-600">{errors.dividend_rate}</p>}
                                    <p className="text-xs text-muted-foreground">
                                        Percentage of total profits to distribute as dividends
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        required
                                    />
                                    {errors.start_date && <p className="text-sm text-red-600">{errors.start_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        required
                                    />
                                    {errors.end_date && <p className="text-sm text-red-600">{errors.end_date}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="total_profit">Total Profit (VT)</Label>
                                <Input
                                    id="total_profit"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.total_profit}
                                    onChange={(e) => setData('total_profit', e.target.value)}
                                    placeholder="100000.00"
                                    required
                                />
                                {errors.total_profit && <p className="text-sm text-red-600">{errors.total_profit}</p>}
                                <p className="text-xs text-muted-foreground">
                                    Total profits available for dividend distribution
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes (Optional)</Label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Additional notes about this dividend period..."
                                    rows={3}
                                />
                                {errors.notes && <p className="text-sm text-red-600">{errors.notes}</p>}
                            </div>

                            {data.total_profit && data.dividend_rate && (
                                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-medium text-blue-900">Dividend Preview</h4>
                                    <p className="text-sm text-blue-700">
                                        Total available for dividends: VT {(parseFloat(data.total_profit) * (parseFloat(data.dividend_rate) / 100)).toLocaleString('en-VU', { minimumFractionDigits: 2 })}
                                    </p>
                                    <p className="text-xs text-blue-600">
                                        This amount will be distributed proportionally based on member purchases during the period.
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4 mt-6">
                        <Button variant="outline" asChild>
                            <Link href={index()}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? 'Creating...' : 'Create Dividend Period'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}