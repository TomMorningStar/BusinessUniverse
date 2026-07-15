import { create } from 'zustand';

export type Notice = {
  id: number;
  message: string;
};

const MAX_NOTICES = 4;
const NOTICE_LIFETIME_MS = 4000;

let nextNoticeId = 0;

type NoticesState = {
  notices: readonly Notice[];
  addNotice: (message: string) => void;
  removeNotice: (id: number) => void;
};

export const useNoticesStore = create<NoticesState>()((set, get) => ({
  notices: [],

  addNotice: (message: string) => {
    const id = nextNoticeId++;
    set({ notices: [...get().notices, { id, message }].slice(-MAX_NOTICES) });

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
