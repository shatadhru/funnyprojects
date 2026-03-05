
const express = require("express");
const { request } = require("undici");
const router = express.Router();






const API_KEY = "key_a3f9b97784e751f27d70e50780afa2ae";
const API_SECRET = "secret_7a537b438c3dbda7a9129908cbb0315d4ece91774913f2cdeb59adf68beeb4d8";
const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");

router.get("/", async (req, res) => {
    try {
        const student_id = 260; // এখানে কোর্স আইডি দিন
        const url = ` https://utmeducation.com/wp-json/tutor/v1/students/${student_id}/dashboard`;

        const { body } = await request(url, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${AUTH}`,
                "Content-Type": "application/json"
            }
        });

        const enrollments = await body.json(); // ✅ await করতে হবে
        console.log("Enrollments:", enrollments);

        res.json({ success: true, enrollments });

    } catch (err) {
        console.error("Error fetching enrollments:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;