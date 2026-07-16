import { create } from 'zustand';
import type { BuildingId, ResourceId } from '../domain/types';

/**
 * Notices are machine-readable events; the presentation layer (ProductionNotice)
 * translates them into the active language. The store never builds UI strings.
 */
export type NoticePayload =
  | { kind: 'building_built'; buildingId: BuildingId; count: number }
  | { kind: 'resources_sold'; resourceId: ResourceId; amount: number; income: number };

export type Notice = NoticePayload & { id: number };

const MAX_NOTICES = 4;
const NOTICE_LIFETIME_MS = 4000;

let nextNoticeId = 0;

type NoticesState = {
  notices: readonly Notice[];
  addNotice: (payload: NoticePayload) => void;
  removeNotice: (id: number) => void;
};

export const useNoticesStore = create<NoticesState>()((set, get) => ({
  notices: [],

  addNotice: (payload: NoticePayload) => {
    const id = nextNoticeId++;
    set({ notices: [...get().notices, { ...payload, id }].slice(-MAX_NOTICES) });

    setTimeout(() => {
      get().removeNotice(id);
    }, NOTICE_LIFETIME_MS);
  },

  removeNotice: (id: number) => {
    const notices = get().notices;

    // The expiry timeout may fire after the notice was already dropped (capacity
    // trim or game reset) — skip the update instead of publishing a new array.
    if (!notices.some((notice) => notice.id === id)) {
      return;
    }

    set({ notices: notices.filter((notice) => notice.id !== id) });
  },
}));
