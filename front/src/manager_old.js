const axios = require('axios');

// eslint-disable-next-line no-unused-vars
class Product{
    constructor(id="",name="",desc="",price=0) {
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
    }
}

// eslint-disable-next-line no-unused-vars
class Stock{
    constructor() {
        this.list_product=[];
        this.init();
    }

    get_list_product(){
        console.log(this.list_product);
        return this.list_product;
    }

    get_prod_by_id(id){
        for(var i= 0; i < this.list_product.length; i++){
            if(this.list_product[i].id==id){
                return this.list_product[i];
            }
        }
        return null;
    }

    // init (){
    //     this.list_product.push(new Product(1, "Germinal 1" , "description germinal 1",10));
    //     this.list_product.push(new Product(2, "Germinal 2" , "description germinal 2",20));
    //     this.list_product.push(new Product(3, "Germinal 3" , "description germinal 3",30));
    //     this.list_product.push(new Product(3, "Germinal 4" , "description germinal 4",40));
    //     this.list_product.push(new Product(5, "Germinal 5" , "description germinal 5",50));
    //     this.list_product.push(new Product(6, "Germinal 6" , "description germinal 6",60));
    //     this.list_product.push(new Product(7, "Germinal 7" , "description germinal 7",70));
    //     this.list_product.push(new Product(8, "Germinal 8" , "description germinal 8",80));
    //     this.list_product.push(new Product(9, "Germinal 9" , "description germinal 9",90));
    //     this.list_product.push(new Product(10, "Germinal 10" , "description germinal 10",100));
    //     this.list_product.push(new Product(11, "Germinal 11" , "description germinal 11",110));
    // }

    async init() {
        console.log("init");
        try {
          // Faire une requête GET vers l'API pour récupérer la liste des produits
          const response = await axios.get('http://localhost:3000/products');
    
          // Récupérer les produits de la réponse
          const products = response.data;
        //   console.log(products);
          // Initialiser la liste des produits avec les produits récupérés
          this.list_product = products.map(product => new Product(product.id, product.name, product.description, product.price));
          console.log(this.list_product);
        } catch (error) {
          console.error('Une erreur s\'est produite lors de la récupération des produits :', error);
        }
      }
}

// Le reste de votre code pour la classe Product reste inchangé


// eslint-disable-next-line no-unused-vars
class Cart{
    constructor() {
        this.list_cart = {};
    }

    get_list_cart(){
        return this.list_cart;
    }

    addInCart(id){
        let elemId=null;
        for (const el in this.list_cart) {
            if (el == id){
                elemId = id;
            }
        }
        if (elemId !== null){
            this.addExistedElem(elemId);
        }
        else{
            this.addNew(id);
        }
    }
    removeFromCart (id){
        let elemId=null;
        for (const el in this.list_cart) {
            if (el == id){
                elemId = id;
            }
        }
        if (elemId !== null){
            if (this.list_cart[id] == 1) {
                delete this.list_cart[id];
            }
            else{
                this.subExistedElem(id);
            }
        }
    }
    addNew(id){
        this.list_cart[id]=1;
    }

    addExistedElem(id){
        let val = this.list_cart[id];
        this.list_cart[id]=++val;
    }

    subExistedElem(id){
        let val = this.list_cart[id];
        this.list_cart[id]=--val;
    }

    get_nbr_product(){
        let total = 0;
        for (const el in this.list_cart) {
            total = total + this.list_cart[el] ;
        }
        return total;
    }

    get_total_price(stk){
        let total = 0;
        for (const el in this.list_cart) {
            let prd = stk.get_prod_by_id(el);
            total = total + (this.list_cart[el] * prd.price);
        }
        return total;
    }

}

export {Product, Stock, Cart};
