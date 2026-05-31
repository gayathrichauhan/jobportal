import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "./api";

/**
 * Default API Accept Header
 */
export const DEFAULT_ACCEPT_HEADER =
    "application/vnd.eazyapp+json;v=1.0";

/**
 * Create axios instance
 */
const httpClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

/**
 * Public endpoints that don't require authentication
 */
const PUBLIC_ENDPOINTS = [
    "/companies/public",
    "/contacts/public",
    "/auth/login/public",
    "/auth/register/public",
];

/**
 * Check if request is public
 */
const isPublicEndpoint = (url) => {
    return PUBLIC_ENDPOINTS.some((endpoint) => {
        return (
            url === endpoint ||
            url.startsWith(endpoint + "/") ||
            url.startsWith(endpoint + "?")
        );
    });
};

/**
 * Request Interceptor
 */
httpClient.interceptors.request.use(
    async (config) => {
        config.headers.Accept = DEFAULT_ACCEPT_HEADER;

        if (!isPublicEndpoint(config.url)) {
            const token = localStorage.getItem("authToken");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        const safeMethods = ["GET", "HEAD", "OPTIONS"];

        if (!safeMethods.includes(config.method.toUpperCase())) {
            let csrfToken = Cookies.get("XSRF-TOKEN");

            if (!csrfToken) {
                try {
                    await axios.get(
                        `${API_BASE_URL}/csrf-token/public`,
                        {
                            withCredentials: true,
                        }
                    );

                    csrfToken = Cookies.get("XSRF-TOKEN");
                } catch (error) {
                    if (
                        error.response &&
                        error.response.status === 404
                    ) {
                        console.warn(
                            "[CSRF] Endpoint not found, continuing..."
                        );
                    } else {
                        console.error(
                            "[CSRF Token Error]",
                            error
                        );
                        return Promise.reject(error);
                    }
                }
            }

            if (csrfToken) {
                config.headers["X-XSRF-TOKEN"] = csrfToken;
            }
        }

        return config;
    },
    (error) => {
        console.error("[HTTP Request Error]", error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 */
httpClient.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response) {
            console.error("[HTTP Response Error]", {
                status: error.response.status,
                data: error.response.data,
                url: error.config?.url,
            });

            switch (error.response.status) {
                case 401: {
                    const isLoginRequest =
                        error.config?.url?.includes("/auth/login");

                    const isOnLoginPage =
                        window.location.pathname === "/login";

                    if (!isLoginRequest && !isOnLoginPage) {
                        localStorage.removeItem("authToken");
                        localStorage.removeItem("jobPortalUser");

                        window.location.href = "/login";
                    }

                    break;
                }

                case 403:
                    console.error("Access Forbidden");
                    break;

                case 404:
                    console.error("Resource Not Found");
                    break;

                case 500:
                    console.error("Internal Server Error");
                    break;

                default:
                    console.error("Unexpected Error");
            }
        } else if (error.request) {
            console.error("[HTTP No Response]", error.request);
        } else {
            console.error("[HTTP Error]", error.message);
        }

        return Promise.reject(error);
    }
);

/**
 * Helper for API Versioning
 */
export const withApiVersion = (version) => {
    const acceptHeader =
        `application/vnd.eazyapp+json;v=${version}`;

    return {
        get: (url, config = {}) =>
            httpClient.get(url, {
                ...config,
                headers: {
                    ...config.headers,
                    Accept: acceptHeader,
                },
            }),

        post: (url, data, config = {}) =>
            httpClient.post(url, data, {
                ...config,
                headers: {
                    ...config.headers,
                    Accept: acceptHeader,
                },
            }),

        put: (url, data, config = {}) =>
            httpClient.put(url, data, {
                ...config,
                headers: {
                    ...config.headers,
                    Accept: acceptHeader,
                },
            }),

        patch: (url, data, config = {}) =>
            httpClient.patch(url, data, {
                ...config,
                headers: {
                    ...config.headers,
                    Accept: acceptHeader,
                },
            }),

        delete: (url, config = {}) =>
            httpClient.delete(url, {
                ...config,
                headers: {
                    ...config.headers,
                    Accept: acceptHeader,
                },
            }),
    };
};

export default httpClient;