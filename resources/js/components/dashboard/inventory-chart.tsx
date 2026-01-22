import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InventoryChartProps {
    data: {
        categories: string[];
        data: number[];
    };
}

export function InventoryChart({ data }: InventoryChartProps) {
    // Ensure data has the expected structure
    const safeData = data || { categories: [], data: [] };

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            height: 300,
            backgroundColor: 'transparent',
        },
        title: {
            text: undefined,
        },
        xAxis: {
            categories: safeData.categories,
            gridLineWidth: 0,
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                style: {
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '12px',
                },
                rotation: -45,
            },
        },
        yAxis: {
            title: {
                text: 'Stock Quantity',
                style: {
                    color: 'hsl(var(--muted-foreground))',
                },
            },
            gridLineWidth: 0,
            labels: {
                style: {
                    color: 'hsl(var(--muted-foreground))',
                    fontSize: '12px',
                },
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.x}</b><br/>Total Stock: <b>${this.y}</b>`;
            },
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                borderRadius: 4,
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: 'normal',
                    },
                },
            },
        },
        series: [{
            name: 'Stock',
            data: safeData.data,
            color: 'hsl(var(--primary))',
        }],
        credits: {
            enabled: false,
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
                <CardDescription>
                    Current stock levels across product categories
                </CardDescription>
            </CardHeader>
            <CardContent>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            </CardContent>
        </Card>
    );
}