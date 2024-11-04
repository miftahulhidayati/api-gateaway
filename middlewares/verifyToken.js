import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env;

export default async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Token not found'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: 'error',
                message: err.message
            });
        }

        req.user = decoded.data;
        next();
    });
};