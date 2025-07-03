

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name ",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email ",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password ",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email ",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password ",
    componentType: "input",
    type: "password",
  },
];


export const AddProductFormElements = [
  {
    "label": "Product Title",
    "name": "title",
    "componentType": "input",
    "type": "text",
    "placeholder": "Enter product title"
  },
  {
    "label": "Description",
    "name": "description",
    "componentType": "textarea",
    "placeholder": "Enter product description"
  },
  {
    "label": "Category",
    "name": "category",
    "componentType": "select",
    "options": [
      { "id": "men", "label": "Men" },
      { "id": "women", "label": "Women" },
      { "id": "kids", "label": "Kids" },
      { "id": "accessories", "label": "Accessories" },
      { "id": "footwear", "label": "Footwear" }
    ]
  },
  {
    "label": "Brand",
    "name": "brand",
    "componentType": "select",
    "options": [
      { "id": "nike", "label": "Nike" },
      { "id": "adidas", "label": "Adidas" },
      { "id": "puma", "label": "Puma" },
      { "id": "reebok", "label": "Reebok" },
      { "id": "hrx", "label": "HRX" }
    ]
  },
  {
    "label": "Price",
    "name": "price",
    "componentType": "input",
    "type": "number",
    "placeholder": "Enter product price"
  },
  {
    "label": "Sales Price",
    "name": "salePrice",
    "componentType": "input",
    "type": "number",
    "placeholder": "Enter sales price"
  },
  {
    "label": "Total Stock",
    "name": "totalStock",
    "componentType": "input",
    "type": "number",
    "placeholder": "Enter total stock available"
  }
]



