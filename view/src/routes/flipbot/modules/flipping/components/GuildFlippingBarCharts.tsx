import {
    FlippingGuildTimeSeriesChartType,
    FlippingGuildTimeSeriesRange,
    FlippingGuildTimeSeriesRanges,
} from '@flipguard/webapp-api';
import { Box, styled, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

import {
    getGuildFlippingChartData,
    GuildFlippingModuleQueryKeys,
} from '../../../../../api/requests/flipbot-modules-flipping';
import { CustomSelect } from '../../../../../components/atoms/inputs/select/CustomSelect';
import { DelayedCircularProgress } from '../../../../../components/layout/utils/DelayedCircularProgress';
import { RangePickButton } from '../../../../../components/molecules/charts/RangePickButton';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Container = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
});

type Props = {
    configId: string;
};

export const GuildFlippingBarCharts = ({ configId }: Props) => {
    const theme = useTheme();

    const [chosenChart, setChosenChart] = useState(FlippingGuildTimeSeriesChartType.TOTAL_FLIPS);
    const [chosenRange, setChosenRange] = useState<FlippingGuildTimeSeriesRange>('7d');

    const { data: chartData = [], isLoading } = useQuery(
        GuildFlippingModuleQueryKeys.chart(configId, chosenChart, chosenRange),
        () => getGuildFlippingChartData(configId, chosenChart, chosenRange),
    );

    const datasetKeys = chartData.length > 0 ? Object.keys(chartData[0].values) : [];

    return (
        <Container>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <RangePickButton
                    sx={{ margin: '8px' }}
                    values={FlippingGuildTimeSeriesRanges}
                    value={chosenRange}
                    onRangeChange={setChosenRange}
                />
                <CustomSelect
                    label={'Chart'}
                    sx={{ flexGrow: 1, margin: '8px' }}
                    options={[{ label: 'Total Flips', value: FlippingGuildTimeSeriesChartType.TOTAL_FLIPS }]}
                    value={chosenChart}
                    onChange={(e) => setChosenChart(e.target.value as FlippingGuildTimeSeriesChartType)}
                    disabled={true}
                    select
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                        <DelayedCircularProgress sx={{ color: '#999' }} />
                    </Box>
                ) : (
                    <Box sx={{ width: '100%', height: '30vh' }}>
                        <Bar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'bottom',
                                        align: 'center',
                                        labels: {
                                            color: '#999',
                                            padding: 0,
                                            font: {
                                                family: "'Readex Pro', sans-serif",
                                                size: 13,
                                            },
                                        },
                                    },
                                    tooltip: {
                                        callbacks: {
                                            title: (tooltipItems): string | string[] | void => {
                                                return tooltipItems.map((a) =>
                                                    new Intl.DateTimeFormat(undefined, {
                                                        dateStyle: 'short',
                                                        timeStyle: 'medium',
                                                    }).format(chartData[a.dataIndex].time),
                                                );
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: { color: 'transparent' },
                                        ticks: { color: '#999', font: { family: "'Readex Pro', sans-serif" } },
                                        border: { color: '#333' },
                                    },
                                    y: {
                                        grid: { color: 'transparent' },
                                        ticks: { color: '#999', font: { family: "'Readex Pro', sans-serif" } },
                                        border: { color: '#333' },
                                    },
                                },
                            }}
                            data={{
                                labels: chartData.map(() => ''),
                                datasets: datasetKeys.map((key) => ({
                                    label: key,
                                    data: chartData.map(({ values }) => values[key]),
                                    backgroundColor: `${theme.palette.secondary.main}dd`,
                                })),
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Container>
    );
};
