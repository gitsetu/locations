export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About App",
      };
      return h.view("about-view", viewData);
    },
  },
};
