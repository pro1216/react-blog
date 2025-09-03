"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
var PORT = 5000;
app.get("/", function (req, res) {
    res.json({ message: "test" });
});
app.listen(PORT, function () {
    console.log('通信は成功');
});
