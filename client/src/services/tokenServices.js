class TokenManager {
    constructor() {
        this.tokenKey = "food-order-key";
    }

    static getToken() {
        return localStorage.getItem(this.tokenKey);
    }

    static saveToken(token) {
        localStorage.setItem(this.tokenKey, token);
    }

    static destroyToken() {
        localStorage.removeItem(this.tokenKey);
    }
}

export default TokenManager;
