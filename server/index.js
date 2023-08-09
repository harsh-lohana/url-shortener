const express = require("express");
const urlRoute = require("./routes/url");
const {connectMongoDB} = require("./connect");
const URL = require("./models/url")

const app = express();

const PORT = 8000;

connectMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
    console.log("MongoDB connected!")
);

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortID", async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate(
        {
            shortID,
        }, 
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            }
        }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});