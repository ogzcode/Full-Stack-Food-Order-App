class TokenManager {
    constructor() {
        this.tokenKey = "food-order-key";
    }

    getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    destroyToken() {
        localStorage.removeItem(this.tokenKey);
    }
}

const tokenManager = new TokenManager();

export default tokenManager;
