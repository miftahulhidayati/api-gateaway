import apiAdapter from '../../apiAdapter.js';
const {
    URL_SERVICE_USER
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

export default async (req, res) => {
    try {
        const id = req.user.id;
        const user = await api.post(`/users/logout`, { user_id: id });
        return res.json(user.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'Service unavailable' });
        }
        if (error.response) {
            const { status, data } = error.response;
            return res.status(status).json(data);
        }
        return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
};