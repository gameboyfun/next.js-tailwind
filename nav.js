export default {
  items: [
    {
      name: "Item 1",
      url: "/1",
      icon: `fa-solid fa-chart-line`,
      children: [
        {
          name: "Item 1.1",
          url: "/11",
          icon: `fa-regular fa-user`,
        },
        {
          name: "Item 1.2",
          url: "/12",
          icon: `fa-solid fa-user-shield`,
          children: [
            {
              name: "Item 1.2.1",
              url: "/121",
              icon: `fa-solid fa-users`,
            },
            {
              name: "Item 1.2.2",
              url: "/122",
              icon: `fa-regular fa-building`,
            },
          ],
        },
      ],
    },
  ],
};
