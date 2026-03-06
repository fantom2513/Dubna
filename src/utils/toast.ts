import { toast } from 'sonner';

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  info: (msg: string) => toast(msg),
  dataUpdated: () => toast.success('Данные обновлены', { duration: 2000 }),
  apiError: (retry?: () => void) =>
    toast.error('Ошибка загрузки данных', {
      action: retry
        ? { label: 'Повторить', onClick: retry }
        : { label: 'Повторить', onClick: () => window.location.reload() },
      duration: 5000,
    }),
};
