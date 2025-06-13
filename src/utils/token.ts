export const storeToken = async (token: string, identifier: string) => {
    try {
        // Store in localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('tokenIdentifier', identifier);

        // Store in database
        const response = await fetch('/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, identifier }),
        });

        if (!response.ok) {
            throw new Error('Failed to store token in database');
        }

        return true;
    } catch (error) {
        console.error('Error storing token:', error);
        return false;
    }
};

interface TokenResponse {
    token: string;
    identifier: string;
}

export const getToken = async () => {
    try {
        // First try to get from localStorage
        const token = localStorage.getItem('userToken');
        const identifier = localStorage.getItem('tokenIdentifier');

        if (!token || !identifier) {
            return null;
        }

        // Verify token in database
        const response = await fetch(`/api/token?identifier=${identifier}`);
        
        if (!response.ok) {
            // If token is not found or expired, clear localStorage
            localStorage.removeItem('userToken');
            localStorage.removeItem('tokenIdentifier');
            return null;
        }

        const data = await response.json() as TokenResponse;
        return data.token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const removeToken = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('tokenIdentifier');
}; 