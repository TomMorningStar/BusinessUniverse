import { useNoticesStore } from '../../store/useNoticesStore';
import './ProductionNotice.css';

export function ProductionNotice() {
  const notices = useNoticesStore((state) => state.notices);

  if (notices.length === 0) {
    return null;
  }

  return (
    <div className="production-notice-list" aria-live="polite" role="status">
      {notices.map((notice) => (
        <div key={notice.id} className="production-notice-list__item">
          {notice.message}
        </div>
      ))}
    </div>
  );
}
