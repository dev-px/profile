const Joi = require("joi");

const profileSchema = Joi.object({
  ownerName: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.number().required(),
  whatsappNumber: Joi.number().required(),
  instaProfile: Joi.string().uri().required(),
  linkedinProfile: Joi.string().uri().required(),
  websiteName: Joi.string().required(),
  websiteLink: Joi.string().uri().required(),
  //   websiteLogo: Joi.object({
  //     buffer: Joi.binary().encoding("base64").required(), // Assuming base64 encoding for images
  //     originalname: Joi.string().required(),
  //     mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  //   }).required(),
  //   websiteFavicon: Joi.object({
  //     buffer: Joi.binary().encoding("base64").required(), // Assuming base64 encoding for images
  //     originalname: Joi.string().required(),
  //     mimetype: Joi.string().valid("image/jpeg", "image/png").required(),
  //   }).required(),
});

exports.profileSchema = profileSchema;

exports.validateProfile = async (req, res, next) => {
  try {
    const value = await profileSchema.validateAsync(req.body);

    //  // Validate websiteLogo and websiteFavicon separately
    // const validateImage = async (image, key) => {
    //     const imageValidation = await profileSchema.validateAsync({
    //       [key]: {
    //         buffer: image.buffer,
    //         originalname: image.originalname,
    //         mimetype: image.mimetype,
    //       },
    //     });
    //     return imageValidation[key];
    //   };

    //   const validatedLogo = await validateImage(req.files.websiteLogo[0], 'websiteLogo');
    //   const validatedFavicon = await validateImage(req.files.websiteFavicon[0], 'websiteFavicon');

    //   if (value && validatedLogo && validatedFavicon) {
    //     // Save both the profile text data and the image validation results
    //     req.validatedData = value;
    //     req.validatedLogo = validatedLogo;
    //     req.validatedFavicon = validatedFavicon;
    //     next();
    //   }
    if (value) {
      req.validatedData = value;
      next();
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(400).json({ error: error.message });
  }
};
