"use strict";
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/',
  (req, res, next) => {
    admin_dashboard(null, {req, res, next})
});

const admin_dashboard = (err, params) => {
  const params_out = {
    title: "Admin",
    widgets: ["text", "calendar", "map"]
  };

  params.res.render('index', params_out);
}

module.exports = router;
