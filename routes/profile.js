const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { validateProfile } = require("../middleware/validation");
const profileController = require("../controllers/profile");

router.post(
  "/",
  upload.fields([
    { name: "ownerName", maxCount: 1 },
    { name: "phoneNumber ", maxCount: 1 },
    { name: "whatsappNumber", maxCount: 1 },
    { name: "instaProfile", maxCount: 1 },
    { name: "linkedinProfile", maxCount: 1 },
    { name: "websiteName", maxCount: 1 },
    { name: "websiteLink", maxCount: 1 },
    { name: "websiteLogo", maxCount: 1 },
    { name: "websiteFavicon", maxCount: 1 },
  ]), validateProfile,
  profileController.profile
)
.get("/data/:profileData", (req,res) => {
  const data = req.params.profileData;
  res.render({data})
});

exports.router = router;
