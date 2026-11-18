import EmptyPage from '@/src/components/pages/empty-page';
import type { SimplePageContent } from '@/src/data/locale-content';

export default function AboutPage({ content }: { content: SimplePageContent }) {
  return <EmptyPage title={content.title} />;
}