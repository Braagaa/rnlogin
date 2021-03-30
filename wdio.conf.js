exports.config = {
  services: [
    [
      "appium",
      {
        args: {
          "--relaxed-security": true,
        },
        command: "appium",
      },
    ],
  ],
};
