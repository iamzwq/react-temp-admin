import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface userInfoState {
  userInfo: Record<string, any> | null;
  setUserInfo: (info: userInfoState["userInfo"]) => void;
}

const useUserInfoStore = create<userInfoState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => set(() => ({ userInfo })),
    }),
    { name: 'userInfo' }
  )
)

export default useUserInfoStore
