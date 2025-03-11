const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (endpoint: string, method = "GET", body?: any, token?: string) => {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        // Handle HTTP errors (4xx, 5xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "An error occurred");
        }

        return response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error;
    }
};
