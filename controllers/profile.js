exports.profile = async (req, res) => {
  const validatedData = req.validatedData;

  const websiteLogo = req.files.websiteLogo[0];
  const websiteFavicon = req.files.websiteFavicon[0];

  const generateImageTag = (image, alternativeText) => `
    <img src="data:${image.mimetype};base64,${image.buffer.toString(
    "base64"
  )}" alt="${alternativeText}">
  `;

  const profileHTML = `
    <p>Owner Name: ${validatedData.ownerName}</p>
    <p>Phone Number: ${validatedData.phoneNumber}</p>
    <p>Whatsapp Number: ${validatedData.whatsappNumber}</p>
    <p>Insta Profile: ${validatedData.instaProfile}</p>
    <p>LinkedIn Profile: ${validatedData.linkedinProfile}</p>
    <p>Website Name: ${validatedData.websiteName}</p>
    <p>Website Link: ${validatedData.websiteLink}</p>
    ${generateImageTag(websiteLogo, "Logo")}
    ${generateImageTag(websiteFavicon, "Favicon")}
  `;

  res.send(profileHTML);
};

// Halling the validation middleware within the controller instead of using it as route-level middleware.

// const { profileSchema } = require("../middleware/validation");

// validation middleware
// try{
// const value = await profileSchema.validateAsync(req.body);
// }catch(error){
//   console.log({ error: error.message });
//   res.status(400).json({ error: error.message });
// }

// const websiteLogo = req.files.websiteLogo[0];
// const websiteFavicon = req.files.websiteFavicon[0];

// res.send(`
//   <p>Owner Name: ${value.ownerName}</p>
//   <p>Phone Number: ${value.phoneNumber}</p>
//   <p>Whatsapp Number: ${value.whatsappNumber}</p>
//   <p>Insta Profile: ${value.instaProfile}</p>
//   <p>LinkedIn Profile: ${value.linkedinProfile}</p>
//   <p>Website Name: ${value.websiteName}</p>
//   <p>Website Link: ${value.websiteLink}</p>
//   <img src="data:image/png;base64,${websiteLogo.buffer.toString(
//     "base64"
//   )}" alt="Uploaded Image">
//   <img src="data:image/png;base64,${websiteFavicon.buffer.toString(
//     "base64"
//   )}" alt="Uploaded Image">

// `);
