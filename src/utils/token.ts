

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getToken(): string | null {
  const tokenStr = sessionStorage.getItem('yw_token') ;
  // authorityString could be admin, "admin", ["admin"]
  return tokenStr;
}

export function setToken(token: string ): void {

  sessionStorage.setItem('yw_token', JSON.stringify(token));
  // auto reload

}
