export const getMethod = async (url: string, isAuthenticated = true, token?: string) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': isAuthenticated ? token! : ''
            }
        });
        if(response.ok) {
            return await response.json();
        }
        throw new Error(`Error: ${response.statusText}`);
    }catch(e) {
        throw new Error(`Error: ${e}`);
    }
}

export const postMethod = async (url: string, body: any, isAuthenticated = true, token?: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': isAuthenticated ? token! : ''
            },
            body: JSON.stringify(body)
        });
        if(response.ok) {
            return await response.json();
        }
        throw new Error(`Error: ${response.statusText}`);
    }catch(e) {
        throw new Error(`Error: ${e}`);
    }
}

export const postMultiPartMethod = async (url: string, body: FormData, isAuthenticated = true, token?: string) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': isAuthenticated ? token! : ''
            },
            body
        });
        if(response.ok) {
            return await response.json();
        }
        throw new Error(`Error: ${response.statusText}`);
    }catch(e) {
        throw new Error(`Error: ${e}`);
    }
}