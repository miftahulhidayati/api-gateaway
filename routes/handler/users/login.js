import apiAdapter from '../../apiAdapter.js';
import jwt from 'jsonwebtoken';
const {
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

export default async (req, res) => {
    try {
        console.log('URL_SERVICE_USER:', URL_SERVICE_USER);
        const user = await api.post('/users/login', req.body);
        const data = user.data.data;

        const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
        const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

        await api.post('/refresh-tokens', { refresh_token: refreshToken, user_id: data.id });

        return res.json({
            status: 'success',
            data: {
                token,
                refresh_token: refreshToken
            }
        });
    } catch (error) {
        console.log(error);

        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'Service unavailable' });
        }
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        } else {
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
    }
};