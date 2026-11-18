import EmptyPage from '@/src/components/pages/empty-page';
import type { SimplePageContent } from '@/src/data/locale-content';

export default function ServicePage({ content }: { content: SimplePageContent }) {
  return <EmptyPage title={content.title} />;
}