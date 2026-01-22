import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface MemberChartProps {
    data: {
        growth: {
            categories: string[];
            data: number[];
        };
        balance_distribution: {
            categories: string[];
            data: number[];
        };
    };
}

export function MemberChart({ data }: MemberChartProps) {
    // Ensure data has the expected structure
    const safeData = data || {
        growth: { categories: [], data: [] },
        balance_distribution: { categories: [], data: [] },
    };

    const growthOptions: Highcharts.Options = {
        chart: {
            type: 'line',
            height: 200,
            backgroundColor: 'transparent',
        },
        title: {
            text: undefined,
        },
        xAxis: {
            categories: safeData.growth.categories,
            gridLineWidth: 0,
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                enabled: false,
            },
        },
        yAxis: {
            title: {
                text: undefined,
            },
            gridLineWidth: 0,
            labels: {
                enabled: false,
            },
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.x}</b><br/>New Members: <b>${this.y}</b>`;
            },
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false,
                },
                lineWidth: 2,
            },
        },
        series: [{
            name: 'New Members',
            data: safeData.growth.data,
            color: 'hsl(var(--primary))',
        }],
        credits: {
            enabled: false,
        },
    };

    const balanceOptions: Highcharts.Options = {
        chart: {
            type: 'pie',
            height: 200,
            backgroundColor: 'transparent',
        },
        title: {
            text: undefined,
        },
        tooltip: {
            formatter: function () {
                return `<b>${this.point.name}</b><br/>Members: <b>${this.y}</b>`;
            },
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            itemStyle: {
                color: 'hsl(var(--muted-foreground))',
                fontSize: '12px',
            },
        },
        series: [{
            name: 'Members',
            colorByPoint: true,
            data: safeData.balance_distribution.categories.map((category, index) => ({
                name: category,
                y: safeData.balance_distribution.data[index] || 0,
            })),
        }],
        credits: {
            enabled: false,
        },
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Member Analytics</CardTitle>
                <CardDescription>
                    Member growth and balance distribution
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="text-sm font-medium mb-2">Member Growth (30 Days)</h4>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={growthOptions}
                    />
                </div>
                <div>
                    <h4 className="text-sm font-medium mb-2">Balance Distribution</h4>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={balanceOptions}
                    />
                </div>
            </CardContent>
        </Card>
    );
}