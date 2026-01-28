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

    const gridColor = 'var(--border)';
    const labelColor = 'var(--muted-foreground)';

    // Falcon-like category palette (blue/teal/info/warn/danger)
    const barColors = ['#2c7be5', '#00d27a', '#27bcfd', '#f5803e', '#e63757'];

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
                    color: labelColor,
                    fontSize: '12px',
                },
                rotation: -45,
            },
        },
        yAxis: {
            title: {
                text: 'Stock Quantity',
                style: {
                    color: labelColor,
                },
            },
            gridLineWidth: 1,
            gridLineColor: gridColor,
            labels: {
                style: {
                    color: labelColor,
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
                colorByPoint: true,
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
            colors: barColors,
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