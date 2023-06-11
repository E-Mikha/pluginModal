let fruits = [
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

const toHtml = (fruit) => `
<div class="col">
  <div class="card">
    <img
      src="${fruit.img}"
      class="card-img-top"
      alt="${fruit.title}"
      style="max-height: 300px"
    />
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Check price</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete item</a>
      </div>
    </div>
</div>
`;

function render() {
  const html = fruits.map(toHtml).join("");
  document.querySelector("#fruits").innerHTML = html;
}

render();

const priceModal = $.modal({
  title: "Price product",
  closable: true,
  width: "400px",
  footerButtons: [
    {
      text: "Close",
      type: "primary",
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener("click", (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === "price") {
    priceModal.setContent(`
    <p> Price ${fruit.title}: <strong>${fruit.price}$</strong></p>
    `);
    priceModal.open();
  } else if (btnType === "remove") {
    $.confirm({
      title: "Are you sure?",
      content: `<p>You delete fruit: <strong>${fruit.title}</strong></p>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log("Cancel");
      });
  }
});
