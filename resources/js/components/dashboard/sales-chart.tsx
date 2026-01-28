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

    const falconBlue = '#2c7be5';
    const gridColor = 'var(--border)';
    const labelColor = 'var(--muted-foreground)';

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
                    color: labelColor,
                    fontSize: '12px',
                },
            },
        },
        yAxis: {
            title: {
                text: 'Sales (VT)',
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
                lineColor: falconBlue,
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, 'rgba(44, 123, 229, 0.22)'],
                        [1, 'rgba(44, 123, 229, 0.00)'],
                    ],
                },
                states: {
                    hover: {
                        lineWidth: 2,
                    },
                },
                fillOpacity: 1,
            },
        },
        series: [{
            name: 'Sales',
            data: safeData.data,
            color: falconBlue,
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