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
    set({ notices: get().notices.filter((notice) => notice.id !== id) });
  },
}));
