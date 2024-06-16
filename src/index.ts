import { app } from "./app";
import "dotenv/config";

const { PORT } = process.env || 4000;

app.get("/", (_req, res) => {
    res.json({
        message: "test route"
    })
});

app.listen(PORT, () => {
    console.log(`server runing at http://localhost:${PORT}`);
});