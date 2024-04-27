/**
 * @interface JwtResponse
 * @description Interface for the JWT response token and user
 * @property {string} token - The access token for the user
 * @returns { token: string }
 */
export interface JwtResponse {
  /**
   * @description The access token for the user
   * @type {string}
   * @memberof JwtResponse
   * @returns {string}
   */
  token: string;
}
