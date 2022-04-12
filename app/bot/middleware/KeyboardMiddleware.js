const {MAIN_BUTTONS_TEXT, commentTypeButtons,buysProductBtns} = require("../utils/ButtonManager")
const {CATEGORY_LIST_MESSAGE,USER_BUYS_LIST_MESSAGE,CART_EMPTY, ABOUT_MESSAGE,cartListMessage,CONTACT_ADMIN,COMMENT_ENTER_MESSAGE} = require("../utils/MessageHandler");
const {categoryList: categoryListButtons, productListButtons,cartProductsBtns} = require("../utils/ButtonManager")
const {tcategoryListButtons,scategoryListButtons,qcategoryListButtons} = require("../utils/ButtonManager")
const {STATE_LIST} = require("./SessionMiddleware")
const Category = require("../../model/category");
const Tcategory = require("../../model/tcategory");
const Scategory = require("../../model/scategory");
const Qcategory = require("../../model/qcategory");


const User = require("../../model/user")

module.exports = (ctx, next) => {
    if (!ctx.message)
        return next();
    const text = ctx.message.text;
    if (text)
        if (Object.values(MAIN_BUTTONS_TEXT).includes(text) && EventListener[text]){
            ctx.session.state=undefined;
            ctx.session.stateData=undefined;
            return EventListener[text](ctx);
        }
    next();
}

const EventListener = {
    [MAIN_BUTTONS_TEXT.ONLINE_BUY]: async (ctx) => {
        const categoryList = await Category.find()
        ctx.reply(CATEGORY_LIST_MESSAGE, categoryListButtons(categoryList))
    },
    [MAIN_BUTTONS_TEXT.TUTORIALS]: async (ctx) => {
        const tcategoryList = await Tcategory.find()
        ctx.reply(CATEGORY_LIST_MESSAGE, tcategoryListButtons(tcategoryList))
    },
    [MAIN_BUTTONS_TEXT.SECURBUY]: async (ctx) => {
        const scategoryList = await Scategory.find()
        ctx.reply(CATEGORY_LIST_MESSAGE, scategoryListButtons(scategoryList))
    },
    [MAIN_BUTTONS_TEXT.QUESTIONS]: async (ctx) => {
        const qcategoryList = await Qcategory.find()
        ctx.reply(CATEGORY_LIST_MESSAGE, qcategoryListButtons(qcategoryList))
    },
    [MAIN_BUTTONS_TEXT.ADMIN]: async (ctx) => {
        ctx.reply(CONTACT_ADMIN)
    },
    [MAIN_BUTTONS_TEXT.COMMENT]: (ctx) => {
        ctx.session.state = STATE_LIST.COMMENT_ENTER
        ctx.session.stateData = undefined;
        ctx.reply(COMMENT_ENTER_MESSAGE)
    },
    [MAIN_BUTTONS_TEXT.ABOUT]: async ctx => {
        ctx.reply(ABOUT_MESSAGE)
    },
    [MAIN_BUTTONS_TEXT.CART]: async ctx=>{
        const userTel = ctx.message?.from || ctx.update.callback_query.from;
        let user = await User.findOne({telId: userTel.id}).populate("cart.product")
        if (!user || user.cart.length === 0)
            return ctx.reply(CART_EMPTY)
        const cart = user.cart.map(item => {
            const newItem = item.product;
            return newItem;
        });
        ctx.reply(cartListMessage(cart), cartProductsBtns(cart))
    },
    [MAIN_BUTTONS_TEXT.MY_BUYS]:async ctx=>{
        const userTel = ctx.message.from
        let user = await User.findOne({telId: userTel.id})
        if (user?.buys?.id == null) {
            ctx.reply("خریدی ثبت نشده")
        } else ctx.reply(USER_BUYS_LIST_MESSAGE,buysProductBtns(user.buys))

    },
    


}

module.exports.KeyboardEventListener = EventListener;
