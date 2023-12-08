const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/only-fams/login")
})

module.exports = router;
