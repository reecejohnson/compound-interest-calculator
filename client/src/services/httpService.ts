export interface PostResponse<T> {
    status: number;
    body: T;
}

export async function post<T>(url: string, body: any): Promise<PostResponse<T>> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const responseBody = await response.json();
    return { status: response.status, body: responseBody };
}
