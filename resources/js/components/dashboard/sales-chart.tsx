import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SalesChartProps {
    data: {
        categories: string[];
        data: number[];
    };
}

export function SalesChart({ data }: SalesChartProps) {
    // Ensure data has the expected structure
    const safeData = data || { categories: [], data: [] };

    const options: Highcharts.Options = {
        chart: {
            type: 'area',
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
            },
        },
        yAxis: {
            title: {
                text: 'Sales (VT)',
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
                formatter: function () {
                    return `VT ${this.value}`;
                },
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.x}</b><br/>Sales: <b>VT ${this.y}</b>`;
            },
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                },
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 2,
                    },
                },
                fillOpacity: 0.1,
            },
        },
        series: [{
            name: 'Sales',
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
                <CardTitle>Sales Trend (30 Days)</CardTitle>
                <CardDescription>
                    Daily sales performance over the last month
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