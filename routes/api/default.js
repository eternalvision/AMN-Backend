const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(
        '<div style="overflow:hidden; position:absolute; top:0; left:0; right:0; bottom:0; background-color:#000; display:flex; justify-content:center; align-items:center; font-family:sans-serif; font-size: 6vw;"><span style="color:#fafafa; margin-right:10px;">Created by: </span> <a target="_blank" rel="noopener" href="https://github.com/eternalvision">Alexandr Priadchenko</a></div>'
    );
});

module.exports = router;
