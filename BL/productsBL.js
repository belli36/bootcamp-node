const PDFDocument = require('pdfkit');
const fs = require('fs');
const persons = [{ id: 1, name: "Avi", age: 20 },
{ id: 2, name: "Dana", age: 30 }]

const jfile = require('jsonfile');
const Products = require('../models/product');
const { sendMailToNewMember } = require('./sendEmail');
const a = 500;
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
        console.log("It is done." + obj.image);
        resolve(Products.create(obj));
    })
}

const update = (id, obj) => {
    return new Promise((resolve, reject) => {
        resolve(Products.findByIdAndUpdate(id, obj), (err) => {
            if (err) {
                reject(err);
            }
        })
    })
}

const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        resolve(Products.findByIdAndDelete(id));
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
const recept = (name, sum, address) => {
    console.log('belli');
    console.log(name, sum, address);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('recept from event click.pdf'));
    doc
        .fontSize(27)
        // .text('This the article for GeeksforGeeks', 100, 100)
        .text('recept from event click')
        .text('name: '+name)
        .text('address: ' + address)
        // .text('email: ')
        // .circle(8, 9, 6)
        // .text(.link(8,9,7,7,"https://b-set.co.il/%D7%A2%D7%99%D7%A6%D7%95%D7%91-%D7%94%D7%91%D7%99%D7%AA-%D7%A1%D7%9C%D7%95%D7%9F/"))
        .text('total: ' + sum)
        .image('לוגו פרויקט.png', {
            fit: [300, 300],
            align: 'center',
            valign: 'center'
        })
        //   doc
        .fillColor('blue')
        .text('The link for my website', 100, 200)

        .link(100, 200, 160, 27, 'http://localhost:3000/my-app');
    //   

    // .text('quantity:')
    doc.end();
    console.log("pdf success");
}
module.exports = { create, getById, getAll, update, deleteProduct, recept }
