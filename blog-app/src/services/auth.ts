import { ENV } from "@/config/env";
import ApiUtils from "@/utils/api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
export interface LoginData {
  email: string;
  password: string;
}

export const AuthService = {

  async login(loginData: any) {
    try {
      const response = await ApiUtils.post(`${ENV.apiUrl}/auth/login`, loginData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error: any) {
      console.error("AuthService Login Error:", error);
      throw new Error(error.message);
    }
  },

  async register(userData: RegisterData) {
    try {
      const response = await ApiUtils.post(`${ENV.apiUrl}/auth/register`, userData);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error: any) {
      console.error("AuthService Register Error:", error);
      throw new Error(error.message);
    }
  },
};