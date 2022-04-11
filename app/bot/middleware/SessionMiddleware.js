const {
    COMMENT_ENTER_MESSAGE,
    COMMENT_SUBMIT_MESSAGE,
    adminCommentMessage,
    USER_INFO_PHONE_MESSAGE,
    USER_INFO_SUBMIT_MESSAGE,
    userInfoMessage,
    USER_INFO_EMAIL_MESSAGE,
    USER_INFO_EMAIL_INFO_MESSAGE,
    USER_INFO_NOTICE_MESSAGE,
    USER_INFO_EMAIL_PASS_MESSAGE,
    USER_INFO_GAME_NAME_MESSAGE,
} = require("../utils/MessageHandler");
const {productListButtons, phoneEnterBtns, mainButtons,userInfoSubmit} = require("../utils/ButtonManager")
const Product = require("../../model/product")
const User = require("../../model/user")
const Comments = require("../../model/comments")

const config = require("config")

const STATE_LIST = {
    SEARCH: "search",
    COMMENT_TYPE: "commentType",
    COMMENT_ENTER: "commentEnter",
    USER_INFO_FULLNAME_ENTER: "userInfoFullNameEnter",
    USER_INFO_PHONE_ENTER: "userInfoPhoneEnter",
    USER_INFO_EMAIL_ENTER: "userInfoEmailEnter",
    USER_INFO_GAME_NAME_ENTER: "userInfoGameNameEnter",
    USER_INFO_EMAIL_PASS_ENTER: "userInfoEmailPassEnter",
    USER_INFO_EMAIL_INFO_ENTER: "userInfoEmailInfoEnter",
    USER_INFO_NOTICE_ENTER: "userInfoNoticeEnter",
}

module.exports = (ctx, next) => {
    if (!ctx.session.state)
        return next();
    const state = ctx.session.state;
    const values = Object.values(STATE_LIST)
    if (values.includes(state) && EventListener[state])
        return EventListener[state](ctx, next)
    next();
}

const EventListener = {
    [STATE_LIST.SEARCH]: async (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message) {
            const text = ctx.message.text;
            const products = await Product.find({
                name: {
                    $regex: text
                }
            })
            ctx.reply(`شما داری دنبال محصول ${ctx.message.text} میگردی`, productListButtons(products))
        } else next()
    },
    
    
    [STATE_LIST.COMMENT_ENTER]: async (ctx, next) => {
        ctx.session.state = undefined;
        ctx.session.stateData = undefined;
        if (ctx.message) {
            const data = ctx.message.text;
            const comments = new Comments({
                text : data,
                
            })
            await comments.save();
            ctx.reply(COMMENT_SUBMIT_MESSAGE)
            ctx.session.stateData = undefined;
        } else next();
    },
    [STATE_LIST.USER_INFO_FULLNAME_ENTER]: (ctx, next) => {
        ctx.session.state = undefined;
        if (ctx.message) {
            const fullName = ctx.message.text;
            ctx.session.stateData = {...ctx.session.stateData, fullName}
            ctx.session.state = STATE_LIST.USER_INFO_EMAIL_ENTER;
            ctx.reply(USER_INFO_EMAIL_MESSAGE)
        } else next()
    },

    [STATE_LIST.USER_INFO_EMAIL_ENTER]: (ctx, next) => {
        //ctx.session.state = undefined;
        if (ctx.message) {
            const email = ctx.message.text;
            ctx.session.stateData = {...ctx.session.stateData, email}
            ctx.session.state = STATE_LIST.USER_INFO_EMAIL_INFO_ENTER;
            ctx.reply(USER_INFO_EMAIL_INFO_MESSAGE)
        } else next()
    },

    [STATE_LIST.USER_INFO_EMAIL_INFO_ENTER]: (ctx, next) => {
        //ctx.session.state = undefined;
        if (ctx.message) {
            const emailInfo = ctx.message.text;
            ctx.session.stateData = {...ctx.session.stateData, emailInfo}
            ctx.session.state = STATE_LIST.USER_INFO_EMAIL_PASS_ENTER;
            ctx.reply(USER_INFO_EMAIL_PASS_MESSAGE)
        } else next()
    },

    [STATE_LIST.USER_INFO_EMAIL_PASS_ENTER]: (ctx, next) => {
        //ctx.session.state = undefined;
        if (ctx.message) {
            const emailPass = ctx.message.text;
            ctx.session.stateData = {...ctx.session.stateData, emailPass}
            ctx.session.state = STATE_LIST.USER_INFO_GAME_NAME_ENTER;
            ctx.reply(USER_INFO_GAME_NAME_MESSAGE)
        } else next()
    },

    [STATE_LIST.USER_INFO_GAME_NAME_ENTER]: (ctx, next) => {
        //ctx.session.state = undefined;
        if (ctx.message) {
            const gameName = ctx.message.text;
            ctx.session.stateData = {...ctx.session.stateData, gameName}
            ctx.session.state = STATE_LIST.USER_INFO_NOTICE_ENTER;
            ctx.reply(USER_INFO_NOTICE_MESSAGE)
        } else next()
    },

    [STATE_LIST.USER_INFO_NOTICE_ENTER]: (ctx, next) => {
        //ctx.session.state = undefined;
        if (ctx.message) {
            const notice = ctx.message.text;
            ctx.session.stateData = {...ctx.session.stateData, notice}
            ctx.session.state = STATE_LIST.USER_INFO_PHONE_ENTER;
            ctx.reply(USER_INFO_PHONE_MESSAGE, phoneEnterBtns)
        } else next()
    },

    [STATE_LIST.USER_INFO_PHONE_ENTER]: async (ctx, next) => {
        // ctx.session.state = undefined;
        if (ctx.message?.text || ctx.message?.contact) {
            const phone = ctx.message?.text || ctx.message.contact.phone_number;
            const userTel = ctx.message.from;
            let user = await User.findOne({telId: userTel.id})
            user.phone = phone;
            user.fullName = ctx.session.stateData.fullName;
            user.email = ctx.session.stateData.email;
            user.emailInfo = ctx.session.stateData.emailInfo;
            user.emailPass = ctx.session.stateData.emailPass;
            user.gameName = ctx.session.stateData.gameName;
            user.notice = ctx.session.stateData.notice;
            user.gender = ctx.session.stateData.gender
            await user.save();
            ctx.session.state = undefined;
            ctx.session.stateData = undefined;
            await ctx.reply(USER_INFO_SUBMIT_MESSAGE, mainButtons)
            ctx.reply(userInfoMessage(user), userInfoSubmit)
        }
    }
}


module.exports.STATE_LIST = STATE_LIST;
