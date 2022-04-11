const {
    PRODUCT_LIST_MESSAGE,
    PRODUCT_NOT_FOUND_MESSAGE,
    getProductDetailMessage,
    getTutorialsDetailMessage,
    getSecurbuyDetailMessage,
    getQuestionsDetailMessage,
    SEARCH_MESSAGE,
    PRODUCT_ADDED_TO_CART_MESSAGE,
    cartListMessage,
    userInfoMessage,
    buyDetail,
    USER_INFO_GENDER_MESSAGE,
    USER_INFO_FULLNAME_MESSAGE,
    paymentMessage,
    buyFailDetail
} = require("../utils/MessageHandler");
const {
    tutorialsDetailButtons,
    questionsDetailButtons,
    securbuyDetailButtons,
    productListButtons,
    tutorialsListButtons,
    questionsListButtons,
    securbuyListButtons,
    productDetailButtons,
    MAIN_BUTTONS_TEXT,
    sharedUseButtons,
    productAddedToCart,
    cartProductsBtns,
    userInfoSubmit,
    userInfoGender,
    paymentBtns,
    buyDetailPaymentBtns,
    buyDetailBtns,
} = require("../utils/ButtonManager")
const {KeyboardEventListener} = require("./KeyboardMiddleware")
const Product = require("../../model/product");
const Tutorials = require("../../model/tutorials");
const Securbuy = require("../../model/securbuy");
const Questions = require("../../model/questions");


const User = require("../../model/user");
const {createUser} = require("../../model/user");
const {STATE_LIST} = require("./SessionMiddleware")
const ZarinpalCheckout = require('zarinpal-checkout');

const zarinpal = ZarinpalCheckout.create('00000000-0000-0000-0000-000000000000', true);


const ActionMap = {
    CAT: /^CAT_\w+/,
    TCAT: /^TCAT_\w+/,
    SCAT: /^SCAT_\w+/,
    QCAT: /^QCAT_\w+/,
    PRODUCT: /^PRODUCT_\w+/,
    TUTORIALS: /^TUTORIALS_\w+/,
    QUESTIONS: /^QUESTIONS_\w+/,
    SECURBUY: /^SECURBUY_\w+/,
    BACK: /^BACK_\w+/,
    SEARCH: /^SEARCH/,
    CART_LIST: /^CART-LIST/,
    CART: /^CART_\w+/,
    DELETE_PRODUCT_FROM_CART: /^DELETE-FROM-CART_\w+/,
    FINALIZE_BUY: /^FINALIZE_BUY/,
    RESET_USER_INFO: /^RESET_USER_INFO/,
    USER_INFO_GENDER_ENTER: /^USER-INFO-GENDER_\w+/,
    PAYMENT: /^PAYMENT/,
    BUYS_DETAIL: /^BUYS-DETAIL_\w+/,
    BUY_PAYMENT: /^BUY-PAYMENT_\w+/
}

module.exports = (ctx, next) => {
    if (!ctx.update.callback_query)
        return next();
    const callback_data = ctx.update.callback_query.data;
    if (callback_data) {
        const actionValues = Object.values(ActionMap)
        for (let i = 0; i < actionValues.length; i++) {
            const isMatch = callback_data.match(actionValues[i])
            if (isMatch && EventListener[Object.keys(ActionMap)[i]])
                return EventListener[Object.keys(ActionMap)[i]](ctx, isMatch);
        }
    }
    next();
}

const EventListener = {
    CAT: async (ctx, matches) => {
        const cat = matches[0].split("_")[1];
        const products = await Product.find({cat: cat});
        ctx.reply(PRODUCT_LIST_MESSAGE, productListButtons(products))
    },
    TCAT: async (ctx, matches) => {
        const tcat = matches[0].split("_")[1];
        const tutorials = await Tutorials.find({tcat: tcat});
        ctx.reply(PRODUCT_LIST_MESSAGE, tutorialsListButtons(tutorials))
    },
    SCAT: async (ctx, matches) => {
        const scat = matches[0].split("_")[1];
        const securbuy = await Securbuy.find({scat: scat});
        ctx.reply(PRODUCT_LIST_MESSAGE, securbuyListButtons(securbuy))
    },
    QCAT: async (ctx, matches) => {
        const qcat = matches[0].split("_")[1];
        const questions = await Questions.find({qcat: qcat});
        ctx.reply(PRODUCT_LIST_MESSAGE, questionsListButtons(questions))
    },
    PRODUCT: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const data = await Product.findById(productId);
        const userTel = ctx.update.callback_query.from;
        let user = await User.findOne({telId: userTel.id})

        if (data) {
            const existInFav = user?.fav?.includes(productId);
            const existInCart = user?.cart?.some(item => item.product == productId);
            if (data.photo) {
                await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
                await ctx.replyWithPhoto({url : data.photo}, productDetailButtons(data, getProductDetailMessage(data), existInFav, existInCart))
            } else
                ctx.reply(getProductDetailMessage(data), productDetailButtons(data))
        } else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
    },

    TUTORIALS: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const data = await Tutorials.findById(productId);
        const userTel = ctx.update.callback_query.from;

        if (data) {
            
            if (data.photo) {
                await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
                await ctx.replyWithPhoto({url : data.photo}, tutorialsDetailButtons(data,getTutorialsDetailMessage(data)))
            } else
                ctx.reply(getTutorialsDetailMessage(data),tutorialsDetailButtons(data))
        } else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
    },
    QUESTIONS: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const data = await Questions.findById(productId);
        const userTel = ctx.update.callback_query.from;
        if (data) {
            
            if (data.photo) {
                await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
                await ctx.replyWithPhoto({url : data.photo}, questionsDetailButtons(data,getQuestionsDetailMessage(data)))
            } else
                ctx.reply(getQuestionsDetailMessage(data),questionsDetailButtons(data))
        } else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
    },

    SECURBUY: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const data = await Securbuy.findById(productId);
        const userTel = ctx.update.callback_query.from;
        if (data) {
            
            if (data.photo) {
                await ctx.telegram.sendChatAction(ctx.chat.id, "upload_photo")
                await ctx.replyWithPhoto({url : data.photo}, securbuyDetailButtons(data,getSecurbuyDetailMessage(data)))
            } else
                ctx.reply(getSecurbuyDetailMessage(data),securbuyDetailButtons(data))
        } else ctx.reply(PRODUCT_NOT_FOUND_MESSAGE)
    },

    BACK: (ctx, matches) => {
        const where = matches[0].split("_")[1];
        switch (where) {
            case "CAT":
                KeyboardEventListener[MAIN_BUTTONS_TEXT.ONLINE_BUY](ctx);
                break;
            case "TCAT":
                KeyboardEventListener[MAIN_BUTTONS_TEXT.TUTORIALS](ctx);
                break;
            case "SCAT":
                KeyboardEventListener[MAIN_BUTTONS_TEXT.SECURBUY](ctx);
                break;
            case "QCAT":
                KeyboardEventListener[MAIN_BUTTONS_TEXT.QUESTIONS](ctx);
                break;
            case "PRODUCT":
                const cat = matches[0].split("_")[2];
                EventListener.CAT(ctx, [`CAT_${cat}`])
                break;
            case "TUTORIALS":
                const tcat = matches[0].split("_")[2];
                EventListener.TCAT(ctx, [`TCAT_${tcat}`])
                break;
            case "QUESTIONS":
                const qcat = matches[0].split("_")[2];
                EventListener.QCAT(ctx, [`QCAT_${qcat}`])
                break;
            case "SECURBUY":
                const scat = matches[0].split("_")[2];
                EventListener.SCAT(ctx, [`SCAT_${scat}`])
                break;
        }
    },
    SEARCH: (ctx) => {
        ctx.session.state = STATE_LIST.SEARCH;
        ctx.reply(SEARCH_MESSAGE)
    },
    
    
    CART: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const userTel = ctx.update.callback_query.from;
        let user = await User.findOne({telId: userTel.id})
        if (user) {
            const existInCart = user.cart.some(item => item.product == productId)
            if (existInCart) {
                user.cart = user.cart.filter(item => item.product != productId)
                ctx.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, undefined,
                    productDetailButtons({_id: productId}, "", user.fav.includes(productId), !existInCart).reply_markup)
                // ctx.reply(PRODUCT_REMOVED_FROM_CART_MESSAGE)
                return await user.save()
            }
        }
        ctx.session.stateData = {productId};

        if (!user)
            user = await createUser(userTel, false)
        if (!user.cart.some(item => item.product == ctx.session.stateData.productId))
            user.cart.push({
                product: ctx.session.stateData.productId,
            })
        await user.save();
        await ctx.reply(PRODUCT_ADDED_TO_CART_MESSAGE, productAddedToCart)
        ctx.session.stateData = undefined;
        ctx.session.state = undefined;
    },
    
    CART_LIST: async (ctx) => {
        KeyboardEventListener[MAIN_BUTTONS_TEXT.CART](ctx)
    },
    DELETE_PRODUCT_FROM_CART: async (ctx, matches) => {
        const productId = matches[0].split("_")[1];
        const userTel = ctx.update.callback_query.from;
        let user = await User.findOne({telId: userTel.id}).populate("cart.product");
        if (user) {
            user.cart = user.cart.filter(item => item.product._id != productId);
            await user.save();
            const cart = user.cart.map(item => item.product);
            await ctx.telegram.editMessageText(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id, undefined, cartListMessage(cart), cartProductsBtns(cart))
        }

    },
    FINALIZE_BUY: async ctx => {
        const userTel = ctx.update.callback_query?.from || ctx.message.from;
        let user = await User.findOne({telId: userTel.id});
        if (user) {
            if (user.fullName) {
                ctx.reply(userInfoMessage(user), userInfoSubmit)
            } else {
                ctx.reply(USER_INFO_GENDER_MESSAGE, userInfoGender)
            }
        } else {
        }
    },
    RESET_USER_INFO: async ctx => {
        const userTel = ctx.update.callback_query?.from || ctx.message.from;
        await User.findOneAndUpdate({telId: userTel.id}, {
            $unset: {
                fullName: "",
                phone: "",
                gender: "",
                email: "",
                emailInfo: "",
                emailPass: "",
                gameName: "",
                notice: "",
            }
        });
        await EventListener.FINALIZE_BUY(ctx);
    },
    USER_INFO_GENDER_ENTER: async (ctx, matches) => {
        const gender = matches[0].split("_")[1];
        ctx.session.stateData = {gender};
        ctx.session.state = STATE_LIST.USER_INFO_FULLNAME_ENTER;
        ctx.reply(USER_INFO_FULLNAME_MESSAGE);
    },
    PAYMENT: async (ctx) => {
        const userTel = ctx.update.callback_query?.from || ctx.message.from;
        let user = await User.findOne({telId: userTel.id}).populate("cart.product");
        const price = user.cart.reduce((acc, item) => acc + item.product.price, 0)
        const response = await zarinpal.PaymentRequest({
            Amount: price + "", // In Tomans
            CallbackURL: 'http://localhost:3000/payment/verify',
            Description: 'A Payment from Node.JS',
            Email: 'hi@siamak.work',
            Mobile: '09120000000'
        });
        if (response.status === 100) {
            user.buys.push({
                products: user.cart.map(item => item.product),
                status: false,
                authority: response.authority,
                amount: price
            })
            user.cart = [];
            await user.save()
            ctx.reply(paymentMessage(price), paymentBtns(response.url))
        } else {
            ctx.reply("پرداخت شما ناموفق بود، لطفا دوباره امتحان کنید")
            console.error(err);
        }
    },
    BUYS_DETAIL: async (ctx, matches) => {
        const buyId = matches[0].split("_")[1];
        const userTel = ctx.update.callback_query.from;
        let user = await User.findOne({telId: userTel.id})
        const buy = user.buys.find(item => item._id == buyId)
        if (buy.status) {
            ctx.reply(buyDetail(buy), buyDetailBtns(buy))
        } else ctx.reply(buyFailDetail(buy), buyDetailPaymentBtns(buy._id))
    },
    BUY_PAYMENT: async (ctx, matches) => {
        const buyId = matches[0].split("_")[1];
        const userTel = ctx.update.callback_query.from;
        let user = await User.findOne({telId: userTel.id})
        user.cart = user.buys.find(item => item._id == buyId).products.map(item => ({
            product: item._id,
        }))
        user.buys = user.buys.filter(item=>item._id!=buyId);
        await user.save()
        await EventListener.CART_LIST(ctx,matches);
    }
}
