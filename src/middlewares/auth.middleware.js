import { db } from "../database/database.connection.js"

export async function authValidation(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send("User unauthorized");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(401).send("Unauthorized");

        res.locals.session = session;

        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
};