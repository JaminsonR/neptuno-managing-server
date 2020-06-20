const SalesModel = require("../models/sale.model");
const ProductModel = require("../models/product.model");
const responses = require("../utils/responses");

// format sale
function formatSales(sales) {
  let formatSales = [];
  for (let sale of sales) {
    let formatSale = {
      id: sale._id,
      client_id: sale.client_id,
      date: sale.date,
      client_name: sale.client_name,
      client_phone: sale.client_phone,
      client_address: sale.client_address,
      status: sale.status,
      due_date: sale.due_date,
      items: [],
      subtotal: "",
      discount: "",
      tax: "",
      total: "",
    };
    formatSale.tax = Number(sale.tax);
    formatSale.discount = Number(sale.discount);
    formatSale.subtotal = Number(sale.subtotal);
    formatSale.total = Number(sale.total);
    // format sale items
    for (let item of sale.items) {
      let formatItem = {};
      formatItem.price = Number(item.price);
      formatItem.amount = Number(item.amount);
      formatItem.quantity = Number(item.quantity);
      formatItem.product_id = item.product_id;
      formatItem.product_name = item.product_name;
      formatItem.itemSubtotal = item.itemSubtotal;
      formatItem.itemDiscount = item.itemDiscount; // in dollars
      formatItem.isBulk = item.isBulk;
      formatSale.items.push(formatItem);
    }
    formatSales.push(formatSale);
  }
  return formatSales;
}

module.exports = {
  async getAll() {
    try {
      const sales = await SalesModel.getAll();
      let formatS = formatSales(sales);
      return responses.OK(formatS);
    } catch (error) {
      console.log(error);
      return responses.SERVER_ERROR;
    }
  },
  async create({
    client_id,
    date,
    client_name,
    client_phone,
    client_address,
    items,
    subtotal,
    tax,
    total,
    status,
    due_date,
  }) {
    try {
      let sale = arguments[0];
      let items = sale.items;
      let idsItems = items.reduce((result, item) => {
        result.push(item["product_id"]);

        return result;
      }, []);
      let products = await ProductModel.getAllById(idsItems);

      // create dict-like structure for sale items. itemsById = {productId: [saleItem]}
      let itemsById = items.reduce((result, item) => {
        let id = item["product_id"];
        if (result[id]) {
          result[id].push(item);
          return result;
        }
        result[id] = [item];
        return result;
      }, {});

      // create dict-like structure for sale products. productsById = {productId: product}
      let productsById = products.reduce((result, item) => {
        let id = item["id"];
        result[id] = item;
        return result;
      }, {});

      // per sale item checks
      let productsNotAvailable = [];
      let productsUpdate = [];
      let wrongItemPrices = [];
      let wrongItemAmounts = [];
      let wrongProducts = [];
      for (let product in itemsById) {
        if (!productsById[product]) {
          wrongProducts.push(itemsById[product]);
        } else {
          // track products that will need stock update
          let productUpdate = productsById[product];
          for (let item of itemsById[product]) {
            let stockProduct = productsById[product]["stock"];
            let stockItem = item["quantity"];
            let itemPrice = item["price"];
            let itemDiscount = item["itemDiscount"];
            let itemAmount = item["amount"];
            let productBulkPrice = productsById[product]["bulkPrice"];
            let productPrice = productsById[product]["price"];
            let isItemBulk = item["isBulk"];

            // check that item has available quantity for sale
            let areProductsForSale = stockProduct >= stockItem;

            // check if item price should be bulk or not
            let calculatedItemPrice = isItemBulk
              ? productBulkPrice
              : productPrice;
            let isItemPriceCorrect = calculatedItemPrice == itemPrice;

            // check if item total amount has been calculated correctly
            let calculatedAmount = (itemPrice - itemDiscount) * stockItem;
            let isItemAmountCorrect = calculatedAmount == itemAmount;

            if (!areProductsForSale) {
              productsNotAvailable.push(item);
            } else if (!isItemPriceCorrect) {
              wrongItemPrices.push(item);
            } else if (!isItemAmountCorrect) {
              wrongItemAmounts.push(item);
            } else {
              // stock update
              productUpdate.stock = productUpdate.stock - stockItem;
            }
          }
          productsUpdate.push(productUpdate);
        }
      }

      // an product in an item does not exist, return error
      let doProductsExist = wrongProducts.length == 0;
      if (!doProductsExist) {
        console.log("an product in an item does not exist, return error");
        return responses.NOT_OK(wrongProducts);
      }

      // an item does not have enogh stock, return error
      let areProductsNotAvailable = productsNotAvailable.length !== 0;
      if (areProductsNotAvailable) {
        console.log("an item does not have enogh stock, return error");
        return responses.NOT_OK(productsNotAvailable);
      }

      // an item does not have the right price, return error
      let areItemPricesWrong = wrongItemPrices.length !== 0;
      if (areItemPricesWrong) {
        console.log("an item does not have the right price, return error");
        return responses.NOT_OK(wrongItemPrices);
      }

      // an item amount has not been calculated properly, return error
      let areItemAmountsWrong = wrongItemAmounts.length !== 0;
      if (areItemAmountsWrong) {
        console.log(
          "an item amount has not been calculated properly, return error"
        );
        return responses.NOT_OK(wrongItemAmounts);
      }

      // update products stock before creating sale
      await ProductModel.updateBulk(productsUpdate);

      // create sale return 200
      let saleObj = new SalesModel(sale);
      await SalesModel.init();
      let created = await saleObj.create();
      return responses.OK(created);
    } catch (error) {
      // error occured, return error
      if (error.type) {
        return responses.CUSTOM_ERROR(error);
      }
      console.log("something bad happened, return error");
      return responses.SERVER_ERROR;
    }
  },
  // Gets the sum of sales per month
  async getPerMonth() {
    try {
      const sales = await SalesModel.getPerMonth();
      let formatSales = [];
      for (let sale of sales) {
        let formatSale = {
          date: sale.date,
          total: "",
        };
        formatSale.total = Number(sale.total);
        formatSales.push(formatSale);
      }
      return responses.OK(formatSales);
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error);
      }
      return responses.SERVER_ERROR;
    }
  },
  // Gets all the sales from one month + year
  async getFromMonth({ month, year }) {
    try {
      const sales = await SalesModel.getFromMonth({ month, year });
      let formatS = formatSales(sales);
      return responses.OK(formatS);
    } catch (error) {
      if (error.type) {
        return responses.CUSTOM_ERROR(error);
      }
      return responses.SERVER_ERROR;
    }
  },
};
