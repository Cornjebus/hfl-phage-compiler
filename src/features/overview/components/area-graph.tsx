'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import React from 'react';

const chartData = [
  { step: '0', force: 10, energy: -12.4 },
  { step: '10', force: 45, energy: -12.2 },
  { step: '20', force: 120, energy: -11.8 },
  { step: '30', force: 280, energy: -8.5 },
  { step: '40', force: 360, energy: -2.1 },
  { step: '50', force: 10, energy: -12.4 },
  { step: '60', force: 45, energy: -12.2 },
  { step: '70', force: 120, energy: -11.8 },
  { step: '80', force: 280, energy: -8.5 },
  { step: '90', force: 360, energy: -2.1 },
  { step: '100', force: 10, energy: -12.4 }
];

const chartConfig = {
  force: {
    label: 'Translocation Force (pN)',
    color: 'var(--chart-1)'
  },
  energy: {
    label: 'Binding Energy (kcal/mol)',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Force vs. Energy Stability
          <Badge variant='outline'>
            <Icons.trendingUp />
            PHASE: DOCKING
          </Badge>
        </CardTitle>
        <CardDescription>Real-time simulation of GNAT-Shift Acetyl-Kick</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='step'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <DottedBackgroundPattern config={chartConfig} />
            </defs>
            <Area
              dataKey='energy'
              type='natural'
              fill='url(#dotted-background-pattern-energy)'
              fillOpacity={0.4}
              stroke='var(--color-energy)'
              stackId='a'
              strokeWidth={0.8}
            />
            <Area
              dataKey='force'
              type='natural'
              fill='url(#dotted-background-pattern-force)'
              fillOpacity={0.4}
              stroke='var(--color-force)'
              stackId='a'
              strokeWidth={0.8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const DottedBackgroundPattern = ({ config }: { config: ChartConfig }) => {
  const items = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key, value.color])
  );
  return (
    <>
      {Object.entries(items).map(([key, value]) => (
        <pattern
          key={key}
          id={`dotted-background-pattern-${key}`}
          x='0'
          y='0'
          width='7'
          height='7'
          patternUnits='userSpaceOnUse'
        >
          <circle cx='5' cy='5' r='1.5' fill={value} opacity={0.5}></circle>
        </pattern>
      ))}
    </>
  );
};
