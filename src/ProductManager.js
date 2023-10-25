const fs = require ('fs');

//Definimos la clase ProducManager
class ProductManager {
  constructor() {
    this.products = [];
    this.idAuto = 1;
    this.path = './products.json'; //Se refiere al this.path
  }
  
  //addProduct para agregar nuevos productos
  async addProduct(title, description, price, thumbnail, code, stock) {
    // Valida si todos los campos requeridos están presentes.
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      stock === undefined
    ) {
      console.error("Todos los campos son obligatorios.");
      return Promise.reject("Todos los campos son obligatorios.");
    }

    // Comprueba si un producto con el mismo código ya existe.
    if (this.products.some((product) => product.code === code)) {
      console.error(`El producto con código ${code} ya existe.`);
      return Promise.reject(`El producto con código ${code} ya existe.`);
    }

    // Crea un nuevo producto con un ID único y otros detalles.
    const newProduct = {
      id: this.idAuto++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    // Agrega el producto al arreglo de productos.
    this.products.push(newProduct);

    // Intenta guardar los productos en un archivo.
    
    
  }

  // Método para obtener todos los productos.
  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Product not found");
      return null;
    }
  }

  updateProduct(id, data) {
    try {
      let search = this.getProductById(id);
      if (search === "Not found") {
        console.log("Not found");
      } else {
        for (let prop in data) {
          search[prop] = data[prop];
        }
        let data_json = JSON.stringify(this.products, null, 2);
        fs.promises.writeFile(this.path, data_json);
        console.log("updateProduct: done , " + id);
        return "updated product: " + id;
      }
    } catch (error) {
      console.log(error);
      return "updateProduct: error";
    }
  }
  deleteProduct(id) {
    try {
      let search = this.getProductById(id);
      if (search === "Not found") {
        return "Not found";
      } else {
        this.products = this.products.filter((each) => each.id !== id);
        console.log(this.products);
        let data_json = JSON.stringify(this.products, null, 2);
        fs.promises.writeFile(this.path, data_json);
        console.log("deleteProduct: " + id);
        return "deleteProduct: " + id;
      }
    } catch (error) {
      console.log(error);
      return "error: deleting product";
    }
  }
}

const productManager = new ProductManager();

// Función autoinvocada asincrónica para probar las operaciones del administrador de productos.
(async () => {
  try {
    await productManager.addProduct(
      'Remera','Talle L',5000,"img1","R1",10
    );
    await productManager.addProduct(
      'Buzo Hoodie','Talle M',8000,"img2","B2",20
    );
    await productManager.addProduct(
      'Pantalon cargo','Talle XL',6400,"img3","PC1",5
    );
    await productManager.addProduct(
      'Piluso','Unisex',2000,"img4","PIL1",100
    );
   

    // Muestra todos los productos.
    const allProducts = productManager.getProducts();
    console.log("Todos los productos:", allProducts);

    // Actualiza y muestra los products.
    const productIdToUpdate = 1;
    await productManager.updateProduct(productIdToUpdate, {
      price: 10000,
      stock: 30,
    });

    // Elimina un producto y muestra los productos actualizados.
    const productIdToDelete = 2;
    await productManager.deleteProduct(productIdToDelete);

    console.log("Productos actualizados:", productManager.getProducts());
  } catch (err) {
    console.error("Error en la operación:", err);
  }
})
();
