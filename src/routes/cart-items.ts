import express from "express";
import Item from "../models/item";

const routes =express.Router();

const items:Item[] = [
    {id:1,product:"chicken",price:10,quantity:1},
    {id:2,product:"Cereal",price:2.99,quantity:5},
    {id:3,product:"Oranges",price:3.99,quantity:10},
    {id:4,product:"Bread",price:4,quantity:1},
    {id:5,product:"Chips",price:2,quantity:2}
]

let currentID= 5;

routes.get("/cart-items",(req,res) => {
    let results = items;
    const maxPrice = req.query.maxPrice;
    const prefix = req.query.prefix;
    const pageSize = req.query.pageSize;

    //check if variables exist
    if(maxPrice) {
        // filter array for values less than or equal to price
        //convert to number
        const maxPriceNum = Number(maxPrice);
        results = results.filter(item => item.price <=maxPriceNum);
    }

    if(prefix) {
        //filter array for values starting with the given prefix
        results = results.filter(item => item.product.startsWith(prefix as string));
    }

    if(pageSize) {
        //filter the array with the amount for pageSize
        results = results.slice(0,Number(pageSize as string))
    }
    
    res.status(200); // result code
    res.json(results); //return statement
});

routes.get("/cart-items/:id",(req,res) => {
    const id = Number(req.params.id);
    const item = items.find(item => item.id === id);
    if(item) {
        res.status(200);
        res.json(item);
    } else {
        res.status(404);
        res.send("ID" + id + "Not Found");
    }
})

routes.post("/cart-items",(req,res) => {
    const item: Item = req.body;
    item.id = ++currentID;
    items.push(item);
    res.status(201);
    res.json(item);
});

routes.put("/cart-items/:id",(req,res) => {
    const id =Number(req.params.id);
    const updatedItem: Item = req.body;
    updatedItem.id = id;

    const index = items.findIndex(item => item.id === id);
    items[index] =updatedItem;
        res.status(200);
        res.json(updatedItem);
    

})

routes.delete("/cart-items/:id",(req,res) => {
    const id = Number(req.params.id);

    const index = items.findIndex(item => item.id === id);

    items.splice(index,1)

    
    res.status(204);
    res.json();
})

export default routes;