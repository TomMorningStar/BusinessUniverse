import { useTranslation } from 'react-i18next';
import { formatMoney, formatNumber } from '../../../shared/i18n';
import { useNoticesStore, type Notice } from '../../../store/useNoticesStore';
import './ProductionNotice.css';

export function ProductionNotice() {
  const { t } = useTranslation();
  const notices = useNoticesStore((state) => state.notices);

  if (notices.length === 0) {
    return null;
  }

  const renderText = (notice: Notice): string => {
    switch (notice.kind) {
      case 'building_built':
        return t('notices.built', {
          name: t(`buildings.${notice.buildingId}.name`),
          qty: formatNumber(notice.count),
        });
      case 'resources_sold':
        return t('notices.sold', {
          count: notice.amount,
          amount: formatNumber(notice.amount),
          resource: t(`resources.${notice.resourceId}.name`),
          income: formatMoney(notice.income),
        });
    }
  };

  return (
    <div className="production-notice-list" aria-live="polite" role="status">
      {notices.map((notice) => (
        <div key={notice.id} className="production-notice-list__item glass">
          {renderText(notice)}
        </div>
      ))}
    </div>
  );
}
