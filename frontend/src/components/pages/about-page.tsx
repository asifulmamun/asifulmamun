import EmptyPage from '@/src/components/pages/empty-page';
import content from '@/src/data/en/about.json';

export default function AboutPage() {
  return <EmptyPage title={content.title} />;
}