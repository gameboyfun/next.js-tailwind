import { faUser } from "@fortawesome/free-solid-svg-icons";
export default {
  items: [
    {
      name: "Item 1",
      url: "/1",
      icon: faUser,
      children: [
        {
          name: "Item 1.1",
          role: 1,
          url: "/11",
          icon: faUser,
        },
        {
          name: "Item 1.2",
          url: "/12",
          icon: faUser,
          children: [
            {
              name: "Item 1.2.1",
              role: 2,
              url: "/121",
              icon: faUser,
            },
            {
              name: "Item 1.2.2",
              role: 3,
              url: "/122",
              icon: faUser,
            },
          ],
        },
      ],
    },
  ],
};
