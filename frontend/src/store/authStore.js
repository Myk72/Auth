import { create } from 'zustand'
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isCheckingAuth: true,
    message: null,
    signUp: async (email, password, name) => {
        set({loading: true, error:null});
        try {
            const res = await axios.post(`${API_URL}/signup`, {email, password, name});
            set({user: res.data.user, isAuthenticated: true, loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
            throw error;
        }
    },

    verifyToken: async (verification_token) => {
        set({loading: true, error:null});
        try {
            const res = await axios.post(`${API_URL}/verifyEmail`, {verification_token});
            set({user: res.data.user, isAuthenticated: true, loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
            throw error;
        }
    },

    login: async (email, password) => {
        set({loading: true, error:null});
        try {
            const res = await axios.post(`${API_URL}/login`, {email, password});
            set({user: res.data.user, 
                isAuthenticated: true, 
                loading: false});
        } catch (error) {
            set({error: error.response.data.message || "Invalid Credential", loading: false});
            throw error;
        }
    },

    logout : async () => {
        set({loading: true, error:null});
        try {
            await axios.post(`${API_URL}/logout`);
            set({user: null, isAuthenticated: false, loading: false});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
          const res = await axios.post(`${API_URL}/checkAuth`);
          set({ user: res.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isCheckingAuth: false, error: null });
        }
      },

    forgotPassword: async (email) => {
        set({loading: true, error:null});
        try {
            const res = await axios.post(`${API_URL}/forgotPassword`, {email});
            set({loading: false, message: res.data.message});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
            throw error;
        }
    },

    resetPassword: async (password, token) => {
        set({loading: true, error:null});
        try {
            const res = await axios.post(`${API_URL}/resetPassword/${token}`, {password});
            set({loading: false, message: res.data.message});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
            throw error;
        }
    },

    resendVerification: async (email) => {
        set({loading: true, error:null});
        try {
            const res = await axios.post(`${API_URL}/resendVerification`, {email});
            set({loading: false, message: res.data.message});
        } catch (error) {
            set({error: error.response.data.message, loading: false});
            throw error;
        }
    },
}));