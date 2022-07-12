import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/test-db');

const Cat = mongoose.model('Dog', {
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    breed: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    color: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
});

const cat = new Cat({
    name: 'Barsik',
    age: 2,
    breed: 'Persian',
    color: 'white',
});

cat.save().then(() => {
    console.log('cat saved');
}).catch(err => {
    console.log('cat not saved');
});
