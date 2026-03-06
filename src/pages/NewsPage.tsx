import PageLayout from '@/components/layout/PageLayout';

export default function NewsPage() {
  return (
    <PageLayout title="Новости">
      <div className="flex items-center justify-center min-h-[60vh] text-text-secondary font-mono-custom text-sm">
        News — скоро
      </div>
    </PageLayout>
  );
}
