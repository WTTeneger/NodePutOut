import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/test-db');

export const Item = mongoose.model('Item', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    rarity: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        default: "62cbc34442c14ddb2dcfb735",
    }
});

// Модель для продуктов маркетплейса связь с Item
export const MarketItem = mongoose.model('MarketItem', {
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
        minlength: 1,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
    },
    total_price: {
        type: Number,
        required: false,
        minlength: 1,
        trim: true,
    }
},
);


// Модель пользователя с полями (имя, пароль, права, баланс, referer token, дата регистрации)
export const Client = mongoose.model('Client', {
    name: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    rights: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'user',
    },
    balance: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true,
        default: 0,
    },
    refresh_token: {
        type: String,
        required: false,
        minlength: 10
    },
    date_registration: {
        type: Date,
        required: true,
        minlength: 1,
        trim: true,
        default: Date.now,
    },
    image: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        default: 'https://i.pravatar.cc/300?img=7',
    }
});

