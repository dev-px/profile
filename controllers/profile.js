exports.profile = (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const {
      ownerName,
      phoneNumber,
      whatsappNumber,
      instaProfile,
      linkedinProfile,
      websiteName,
      websiteLink,
    } = req.body;
    const websiteLogo = req.files.websiteLogo[0];
    const websiteFavicon = req.files.websiteFavicon[0];

    res.send(`
    <p>Owner Name: ${ownerName}</p>
    <p>Phone Number: ${phoneNumber}</p>
    <p>Whatsapp Number: ${whatsappNumber}</p>
    <p>Insta Profile: ${instaProfile}</p>
    <p>LinkedIn Profile: ${linkedinProfile}</p>
    <p>Website Name: ${websiteName}</p>
    <p>Website Link: ${websiteLink}</p>
    <img src="data:image/png;base64,${websiteLogo.buffer.toString(
      "base64"
    )}" alt="Uploaded Image">
    <img src="data:image/png;base64,${websiteFavicon.buffer.toString(
        "base64"
      )}" alt="Uploaded Image">

  `);
  }