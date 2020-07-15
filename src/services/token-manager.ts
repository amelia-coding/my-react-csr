/**
 * @author：姚嘉东
 * @description：token 管理类
 * @date：2020/3/19
 */
class TokenManager {
  readonly key = 'token';

  /**
   * 获取 token
   */
  getToken(): string {
    return localStorage.getItem(this.key);
  }

  /**
   * 设置 token
   * @param token
   */
  setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  /**
   * 清理已存在的 token
   */
  clearToken(): void {
    localStorage.removeItem(this.key);
  }
}

export const tokenManager = new TokenManager();
