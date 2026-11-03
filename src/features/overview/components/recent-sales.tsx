import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const commandData = [
  {
    name: 'Spacer 1: DEDIF',
    status: 'COMPLETE',
    id: 'SA1-001',
    energy: '-12.4 kcal'
  },
  {
    name: 'Spacer 2: PROLIF',
    status: 'EXECUTING',
    id: 'SA1-002',
    energy: '-12.3 kcal'
  },
  {
    name: 'Spacer 3: PATTERN',
    status: 'QUEUED',
    id: 'SA1-003',
    energy: '-12.4 kcal'
  },
  {
    name: 'Spacer 4: TERM',
    status: 'QUEUED',
    id: 'SA1-004',
    energy: '-12.2 kcal'
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Command Queue</CardTitle>
        <CardDescription>Active ART array execution buffer.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {commandData.map((cmd, index) => (
            <div key={index} className='flex items-center'>
              <div className='flex h-9 w-9 items-center justify-center rounded-full bg-primary/10'>
                <Icons.logo className='size-5' />
              </div>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{cmd.name}</p>
                <p className='text-muted-foreground text-sm'>{cmd.id} | {cmd.status}</p>
              </div>
              <div className='ml-auto font-medium'>{cmd.energy}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
