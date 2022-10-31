const PDFDocument = require('pdfkit');
const fs = require('fs');
const express = require('express')
const router = express.Router();
const productBL = require('../BL/productsBL');
const auth = require('../middleware/auth.middleware');

// let a = 600;
router.route('/')
    .get(auth,async function (req, res) {
        //console.log(a);
        let data = await productBL.getAll();
        return res.json(data);
    })

router.route('/:id')
    .get(/*auth,*/ async function (req, res) {
        let id = req.params.id
        console.log(id);
        let data = await productBL.getById(id);
        return res.json(data);
    })

router.route('/')
    .post(/*auth,*/ async function (req, res) {
        let obj = req.body
        let data = await productBL.create(obj);
        return res.json(data);
    })

router.route('/:id')
    .put(/*auth,*/ async function (req, resp) {
        let obj = req.body
        console.log("update product name "+ obj.name)
        let id = req.params.id;
        await productBL.update(id, obj);
        return resp.json('updated');
    })

router.route('/:id')
    .delete(/*auth,*/ async function (req, resp) {
        console.log('delete delete')
        let id = req.params.id;
        let data = await productBL.deleteProduct(id);
        return resp.json(data);
    })
    
router.route('/kabala/:name/:sum/:address')
    .post( async function (req, resp) {
        let name=req.params.name;
        let sum = req.params.sum;
        let address = req.params.address;

        
        let data = await productBL.kabala(name,sum,address);
        return resp.json(data);
    })

// router.route('/kabala')
//     .post(async function () {
//         console.log('belli');
//         const doc = new PDFDocument();
//         doc.pipe(fs.createWriteStream('succes.pdf'));
//         doc
//             .fontSize(27)
//             .text('This the article for GeeksforGeeks', 100, 100)
//             .text('ayala naimi recept')
//             .text('product id:')
//             .text('price:')
//             .text('quantity:')
//         doc.end();
//     })

// router.post("/kabala/:sum", kabala);
// async function kabala(sum) {
//     console.log('belli');
//     console.log(sum);
//     const doc = new PDFDocument();
//     doc.pipe(fs.createWriteStream(a + sum + 'shoes.pdf'));
//     doc
//         .fontSize(27)
//         .text('This the article for GeeksforGeeks', 100, 100)
//         .text('ayala kaplan recept')
//         .text('product id:')
//         .text('price:' + a + String(sum.url))
//         .text('quantity:')
//     doc.end();
//     console.log("pdf success");
// }
module.exports = router;
