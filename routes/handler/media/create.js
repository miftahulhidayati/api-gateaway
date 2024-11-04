import apiAdapter from '../../apiAdapter.js';

const {
    URL_SERVICE_MEDIA
} = process.env;

const api = apiAdapter(URL_SERVICE_MEDIA);

export default async (req, res) => {
    try {
        const media = await api.post('/media', req.body);
        return res.json(media.data);
    } catch (error) {
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