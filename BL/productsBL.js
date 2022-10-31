const PDFDocument = require('pdfkit');
const fs = require('fs');
const persons = [{ id: 1, name: "Avi", age: 20 },
{ id: 2, name: "Dana", age: 30 }]

const jfile = require('jsonfile');
const Products = require('../models/product');
const a=500;
const getAll = () => {
    return new Promise((resolve, reject) => {
        console.log("in get all");
        resolve(Products.find({}));
    })
}

const getById = (id) => {
    return new Promise((resolve, reject) => {
        console.log("in get by id");
        resolve(Products.findById(id));
    })
}

const create = (obj) => {

    return new Promise((resolve, reject) => {
        console.log("It is done.");
        resolve(Products.create(obj));
    })
}

const update = (id, obj) => {
    return new Promise((resolve, reject) => {
        resolve(Products.findByIdAndUpdate(id, obj),(err)=>{
            if(err){
                reject(err);
            }
        })
    })
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        resolve( Products.findByIdAndDelete(id));
    })
}

// const sendBill =(obj)=>{
//     jfile.writeFile('./bill.js',(obj), function(err,data){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("send you bill");
//         }
//     } )
// }
const kabala=(name,sum,address)=> {
    console.log('belli');
    console.log(name,sum,address);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(name + ' recept of shoes.pdf'));
    doc
        .fontSize(27)
        // .text('This the article for GeeksforGeeks', 100, 100)
        .text(name+' recept')
        .text('address:'+address)
        .text('price:' + sum)
        // .text('quantity:')
    doc.end();
    console.log("pdf success");
}
module.exports = { create, getById, getAll,update,deleteProduct ,kabala}
