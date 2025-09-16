import { http, HttpResponse } from "msw";

export const handlers = [
    http.post('http://localhost:3000/admin/login', () => {
        return HttpResponse.json({
            accessToken: 'fake-access-token'
        });
    }),
];