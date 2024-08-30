export function useLogin() {
  return {
    mutate: (data: any) => {
      // TODO: implement login
      console.log("[ api.ts:5:data ] 👉", data);
    },
    isPending: false,
  };
}
