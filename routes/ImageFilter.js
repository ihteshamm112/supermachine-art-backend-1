const express = require("express");

// const AddAdvanceStyling = require("../controllers/AdvanceStyling/AddAdvanceStyling");
// const deleteAdvanceStyling = require("../controllers/AdvanceStyling/deleteAdvanceStyling");
const Enable_DisableFilter = require("../controllers/ImageFilters/Enable_DisableFilter");
// const viewAdvanceStyling = require("../controllers/AdvanceStyling/viewAdvanceStyling");

// const upload = require("../middlewares/userPicsMulter")
const router = express.Router();
// const formidable = require("express-formidable");

// router.post("/add_advance_styling", AddAdvanceStyling);
// router.delete("/delete_advance_styling/:id", deleteAdvanceStyling);
router.put("/enable_disable_filters", Enable_DisableFilter);
// router.get("/view_advance_styling", viewAdvanceStyling);

module.exports = router;