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
                const pointName = (this as any)?.point?.name ?? '';
                const yValue = (this as any)?.y ?? 0;
                return `<b>${pointName}</b><br/>Members: <b>${yValue}</b>`;
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