const api = 'http://localhost:3000';

const requestApi = async requestOptions => {
    const res = await fetch(api + requestOptions.slug, {
        method: requestOptions.method || 'GET',
        body: requestOptions.body ? JSON.stringify(requestOptions.body) : null,
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.json();
};

export default requestApi;
