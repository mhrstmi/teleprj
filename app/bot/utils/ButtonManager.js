const {convertArrayToNColumn} = require("./DataUtil");

const MAIN_BUTTONS_TEXT = {
    TUTORIALS: "🎓 آموزش ها",
    COMMENT: "📬 پیشنهادات انتقادات",
    ONLINE_BUY: "🛒 خرید آنلاین",
    MY_BUYS: "💰 خرید های من",
    CART: "🛍 سبد خرید",
    ABOUT: "📝 درباره ما",
    QUESTIONS: "⁉️ سوالات پرتکرار",
    SECURBUY: " 🔒 خرید ایمن",
    ADMIN: "👨🏻‍💻 ارتباط با ادمین",

}


const mainButtons = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [
                {text: MAIN_BUTTONS_TEXT.TUTORIALS},
                {text: MAIN_BUTTONS_TEXT.ONLINE_BUY},
                {text: MAIN_BUTTONS_TEXT.QUESTIONS},
                
            ],[
                
                {text: MAIN_BUTTONS_TEXT.SECURBUY},
                {text: MAIN_BUTTONS_TEXT.ADMIN},
                {text: MAIN_BUTTONS_TEXT.COMMENT},
            ], [
                {text: MAIN_BUTTONS_TEXT.MY_BUYS},
                {text: MAIN_BUTTONS_TEXT.CART},
                {text: MAIN_BUTTONS_TEXT.ABOUT},
            ],
        ]
    },
}

const categoryList = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.title,
                callback_data: `CAT_${item._id}`
            }))), [{text: "جستجو", callback_data: "SEARCH"}]],
        },
    }
}

const tcategoryListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.title,
                callback_data: `TCAT_${item._id}`
            }))), [{text: "جستجو", callback_data: "SEARCH"}]],
        },
    }
}

const scategoryListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.title,
                callback_data: `SCAT_${item._id}`
            }))), [{text: "جستجو", callback_data: "SEARCH"}]],
        },
    }
}

const qcategoryListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.title,
                callback_data: `QCAT_${item._id}`
            }))), [{text: "جستجو", callback_data: "SEARCH"}]],
        },
    }
}

const productListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.name,
                callback_data: `PRODUCT_${item._id}`
            }))), [{text: "بازگشت", callback_data: "BACK_CAT"}]],
        },
    }
}

const tutorialsListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.name,
                callback_data: `TUTORIALS_${item._id}`
            }))), [{text: "بازگشت", callback_data: "BACK_TCAT"}]],
        },
    }
}

const securbuyListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.name,
                callback_data: `SECURBUY_${item._id}`
            }))), [{text: "بازگشت", callback_data: "BACK_SCAT"}]],
        },
    }
}

const questionsListButtons = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...convertArrayToNColumn(data, 2).map(item => item.map(item => ({
                text: item.name,
                callback_data: `QUESTIONS_${item._id}`
            }))), [{text: "بازگشت", callback_data: "BACK_QCAT"}]],
        },
    }
}

const productDetailButtons = (product, caption = "", exitsInFav, exitsInCart) => {
    
    
        firstBtn = {
            text: exitsInCart ? "❌حذف از سبد خرید" : "افزودن به سبد خرید",
            callback_data: `CART_${product._id}`
        }
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [[firstBtn],  [{
                text: "بازگشت↪️",
                callback_data: `BACK_PRODUCT_${product.cat}`
            }]],

        },
        caption
    }
}


const tutorialsDetailButtons = (tutorials, caption = "") => {
    
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [  [{
                text: "بازگشت↪️",
                callback_data: `BACK_TUTORIALS_${tutorials.tcat}`
            }]],

        },
        caption
    }
}

const securbuyDetailButtons = (securbuy, caption = "") => {
    
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [  [{
                text: "بازگشت↪️",
                callback_data: `BACK_SECURBUY_${securbuy.scat}`
            }]],

        },
        caption
    }
}

const questionsDetailButtons = (questions, caption = "") => {
    
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [  [{
                text: "بازگشت↪️",
                callback_data: `BACK_QUESTIONS_${questions.qcat}`
            }]],

        },
        caption
    }
}


const commentTypeButtons = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{
                text: "انتقاد",
                callback_data: `COMMENT_TYPE_ENTEGHAD`
            }],
            [{text: "پیشنهاد", callback_data: `COMMENT_TYPE_PISHNAHAAD`}]],
    },
}



const productAddedToCart = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{
                text: "مشاهده لیست خرید",
                callback_data: "CART-LIST"
            }, {
                text: "افزودن سفارش دیگر",
                callback_data: `BACK_CAT`
            }],
            [{text: "نهایی کردن خرید", callback_data: `FINALIZE_BUY`}],
            [{text: "بازگشت↪️", callback_data: `BACK_CAT`}]],
    },
}

const cartProductsBtns = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...data.map(item => ([{

                    text: `حذف ❌ ${item.name}`,
                    callback_data: `DELETE-FROM-CART_${item._id}`
                }]
            )), [{text: "افزودن سفارش دیگر", callback_data: "BACK_CAT"}], [{
                text: "نهایی کردن خرید",
                callback_data: "FINALIZE_BUY"
            }]
            ],

        },
    }
}


const userInfoSubmit = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{
                text: "تایید و ادامه ✅",
                callback_data: "PAYMENT"
            }],
            [{text: "اطلاعات جدید میدهم", callback_data: `RESET_USER_INFO`}]],
    },
}

const userInfoGender = {
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{
                text: "آقا",
                callback_data: "USER-INFO-GENDER_male"
            }],
            [{text: "خانم", callback_data: "USER-INFO-GENDER_female"}]],
    },
}

const paymentBtns = (url) => ({
    reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
            [{text: "پرداخت آنلاین", url}]
        ]
    }
})

const phoneEnterBtns = {
    reply_markup: {
        resize_keyboard: true,
        keyboard: [
            [{
                text: "ارسال شماره همراه",
                request_contact: true
            }]],
    },
}

const buysProductBtns = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [...data.map((item, index) => ([{
                    text: `خرید ${index + 1}`,
                    callback_data: `BUYS-DETAIL_${item._id}`
                }]
            ))],

        },
    }
}

const buyDetailPaymentBtns = (id) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [
                [{text: "پرداخت", callback_data: `BUY-PAYMENT_${id}`}]
            ]
        }
    }
}

const buyDetailBtns = (data) => {
    return {
        reply_markup: {
            resize_keyboard: true,
            inline_keyboard: [{
                    text: `ورود به سایت موجوجم `,
                    url: "www.mojogem.com"
                }]
            

        },
    }
}

module.exports = {
    MAIN_BUTTONS_TEXT,
    mainButtons,
    categoryList,
    productListButtons,
    productDetailButtons,
    commentTypeButtons,
    productAddedToCart,
    cartProductsBtns,
    userInfoSubmit,
    userInfoGender,
    phoneEnterBtns,
    paymentBtns,
    buysProductBtns,
    buyDetailBtns,
    buyDetailPaymentBtns,
    tcategoryListButtons,
    tutorialsListButtons,
    tutorialsDetailButtons,
    securbuyListButtons,
    scategoryListButtons,
    securbuyDetailButtons,
    questionsDetailButtons,
    questionsListButtons,
    qcategoryListButtons,
}
