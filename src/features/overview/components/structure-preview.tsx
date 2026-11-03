'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import React from 'react';

const structureData = [
  { id: 1, name: 'Spacer 1', status: 'ACTIVE', fold: 'linear', energy: -20.7 },
  { id: 2, name: 'Spacer 2', status: 'ACTIVE', fold: 'linear', energy: -20.5 },
  { id: 3, name: 'Spacer 3', status: 'INACTIVE', fold: 'hairpin', energy: -18.2 },
  { id: 4, name: 'Spacer 4', status: 'ACTIVE', fold: 'linear', energy: -20.8 }
];

export function StructurePreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Thermodynamic Switch
          <Badge variant='outline' className='ml-2'>
            BOHR-THRESHOLD: 0.85
          </Badge>
        </CardTitle>
        <CardDescription>Predicted secondary structure of array units</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          {structureData.map((s) => (
            <div
              key={s.id}
              className={`flex flex-col items-center justify-center rounded-lg border p-4 transition-all ${
                s.status === 'ACTIVE'
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-red-500/30 bg-red-500/5 opacity-50'
              }`}
            >
              <div className='mb-2 flex items-center gap-2'>
                {s.status === 'ACTIVE' ? (
                  <Icons.checkCircle className='size-4 text-green-500' />
                ) : (
                  <Icons.close className='size-4 text-red-500' />
                )}
                <span className='text-sm font-bold'>{s.name}</span>
              </div>
              <div className='h-12 w-12 rounded-full border-2 border-dashed border-current flex items-center justify-center'>
                {s.fold === 'hairpin' ? (
                  <div className='h-6 w-2 rounded-full bg-red-500/40 animate-pulse' />
                ) : (
                  <div className='h-0.5 w-8 bg-green-500/40' />
                )}
              </div>
              <div className='mt-2 text-[10px] text-muted-foreground uppercase tracking-tighter'>
                {s.fold} Fold / {s.energy} kcal
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
