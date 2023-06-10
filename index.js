const fruits = [
  {
    id: 1,
    title: "Apple",
    price: 20,
    img: "https://www.edimdoma.ru/data/ingredients/0000/1083/1083-ed4_wide.jpg?1482770375",
  },
  {
    id: 2,
    title: "Orange",
    price: 30,
    img: "https://e1.edimdoma.ru/data/ingredients/0000/1082/1082-ed4_wide.jpg?1482770382",
  },
  {
    id: 3,
    title: "Mango",
    price: 40,
    img: "https://e0.edimdoma.ru/data/ingredients/0000/1089/1089-ed4_wide.jpg?1482770262",
  },
];

const modal = $.modal({
  title: "Main Modal",
  closable: true,
  content: `
    <p>Lorem ipsum dolor sit.</p>
    <p>Lorem ipsum dolor sit.</p>
    `,
  width: "400px",
  footerButtons: [
    {
      text: "Ok",
      type: "primary",
      handler() {
        modal.close();
      },
    },
    {
      text: "Cancel",
      type: "danger",
      handler() {
        modal.close();
      },
    },
  ],
});
