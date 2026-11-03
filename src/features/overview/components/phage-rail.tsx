'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import React from 'react';

const phageData = [
  {
    name: 'Staphylococcus Phage SA1',
    accession: 'MW218148.1',
    syntax: [
      { type: 'slide', seq: 'GATATATCAT', gc: 20 },
      { type: 'brake', seq: 'AAGATATTCTATAATTAATTTTA', energy: -20.7 },
      { type: 'slide', seq: 'ATGTATACGT', gc: 20 }
    ]
  },
  {
    name: 'Phage MarsHill',
    accession: 'MW248466.1',
    syntax: [
      { type: 'slide', seq: 'ATATGAATAC', gc: 20 },
      { type: 'brake', seq: 'AAGATATTCTATAATTAATTTTA', energy: -20.7 },
      { type: 'slide', seq: 'GTATGATATA', gc: 20 }
    ]
  }
];

export function PhageRail() {
  return (
    <Card className='col-span-full'>
      <CardHeader>
        <CardTitle>
          Phage Comparative Rail
          <Badge variant='secondary' className='ml-2'>
            SYNTAX CONSERVATION: 98.4%
          </Badge>
        </CardTitle>
        <CardDescription>Mapping the conserved docking grammar across jumbo phages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {phageData.map((phage) => (
            <div key={phage.accession} className='space-y-2'>
              <div className='flex items-center justify-between'>
                <span className='font-mono text-sm font-bold'>{phage.name}</span>
                <span className='text-muted-foreground text-xs'>{phage.accession}</span>
              </div>
              <div className='flex h-12 w-full overflow-hidden rounded-lg border bg-muted/50'>
                {phage.syntax.map((unit, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-1 items-center justify-center text-[10px] font-mono transition-all hover:flex-[2] ${
                      unit.type === 'slide'
                        ? 'bg-blue-500/10 text-blue-500'
                        : 'bg-red-500/20 font-bold text-red-600 border-x border-red-500/30'
                    }`}
                    title={unit.seq}
                  >
                    {unit.type.toUpperCase()}
                    {unit.type === 'brake' && <span className='ml-1 opacity-60'>({unit.energy} kcal)</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
