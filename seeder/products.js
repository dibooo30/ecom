var mongoose = require('mongoose');
var Product = require('../moduls/product-modul');
mongoose.connect('mongodb://localhost/shoping');

var Products = [
    new Product({
        imgPath:'/img/tout.jpg',
        title:'tout ankh amon',
        des:'he is the old egyption king',
        price:30
    }),
    new Product({
        imgPath:'/img/rasemohmed.jpg',
        title:'rase mohmed',
        des:'her you will see somthin you never nevr see it',
        price:30
    }),
    new Product({
        imgPath:'/img/rasmohmed2.jpg',
        title:'ras mohmed diving',
        des:'the best place to diving and snorkling',
        price:30
    }),
    new Product({
        imgPath:'/img/museam.jpg',
        title:'egyption mussem',
        des:'important old hestory in Egypt and the bigst muselm in contry',
        price:30
    }),
    new Product({
        imgPath:'/img/alkalaa.png',
        title:'old egyption hostel',
        des:'this is amizing plase in alkahera',
        price:70
    }),
    new Product({
        imgPath:'/img/rasmohmed.jpg',
        title:'teran islend',
        des:'the best place to diving and snorkling in th earth',
        price:25
    })
];
var done = 0;
for(var i = 0; i < Products.length; i++){
    Products[i].save(function(err, result){
        done++;
        if(done == Products.length){
            exit();
        }
    })
}
function exit(){
    console.log('date are sended');
    mongoose.disconnect();
}