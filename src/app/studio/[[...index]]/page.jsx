import { Studio } from './Studio';

export const metadata = {
  title: 'Sanity Studio',
  description: 'Manage your portfolio content here.',
};

export default function StudioPage() {
  return (
    <div style={{ height: '100vh', width: '100vw', margin: '-1rem' }}>
      <Studio />
    </div>
  );
}
