function getToken(): string | null {
  return localStorage.getItem('accessToken');
}

export default getToken;