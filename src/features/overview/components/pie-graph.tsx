'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

const chartData = [
  { motif: 'Docking', score: 95, fill: 'var(--color-docking)' },
  { motif: 'Repeat', score: 65, fill: 'var(--color-repeat)' },
  { motif: 'Spacer', score: 15, fill: 'var(--color-spacer)' }
];

const chartConfig = {
  score: {
    label: 'Match Confidence'
  },
  docking: {
    label: 'Docking Motif',
    color: 'var(--chart-1)'
  },
  repeat: {
    label: 'Repeat Array',
    color: 'var(--chart-2)'
  },
  spacer: {
    label: 'Spacer Payload',
    color: 'var(--chart-3)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>
          Affinity Signature
          <Badge variant='outline'>
            <Icons.trendingUp />
            MATCH: HIGH
          </Badge>
        </CardTitle>
        <CardDescription>Binding probability by sequence region</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pb-0'>
        <ChartContainer
          config={chartConfig}
          className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px] min-h-[250px]'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey='score' hideLabel />} />
            <Pie
              data={chartData}
              innerRadius={30}
              dataKey='score'
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
            >
              <LabelList
                dataKey='score'
                stroke='none'
                fontSize={12}
                fontWeight={500}
                fill='currentColor'
                formatter={(value) => `${value}%`}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
