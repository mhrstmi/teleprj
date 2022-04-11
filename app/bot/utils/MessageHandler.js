module.exports.START_MESSAGE = "سلام ، خوش اومدی!"
module.exports.CATEGORY_LIST_MESSAGE = "لطفا یکی از دسته های زیر را انتخاب نمایید .👇👇"
module.exports.PRODUCT_LIST_MESSAGE = "لطفا یکی از گزینه های زیر را جهت نمایش اطلاعات بیشتر انتخاب نمایید.👇👇"
module.exports.PRODUCT_NOT_FOUND_MESSAGE = "محصول مورد نظر پیدا نشد."
module.exports.SEARCH_MESSAGE = "اون محصولی ک دنبالش میگردی رو بنویس."
module.exports.COMMENT_SUBMIT_MESSAGE = "مشتری گرامی : درخواست شما در سیستم ثبت گردید و در اولین فرصت به این امر رسیدگی خواهد شد."
module.exports.COMMENT_ENTER_MESSAGE = "لطفا انتقاد یا پیشنهاد خود را بنویسید :"
module.exports.PRODUCT_ADDED_TO_CART_MESSAGE = "محصول با موفقیت به سبد خرید شما اضافه شد.";
module.exports.PRODUCT_REMOVED_FROM_CART_MESSAGE = "محصول با موفقیت از سبد شما حذف شد.";
module.exports.CART_EMPTY = "سبد خرید شما خالیست";
module.exports.ABOUT_MESSAGE = "سایت خرید و فروش انواع جم بازی"
module.exports.USER_INFO_GENDER_MESSAGE = "لطفا جنسیت خود را انتخاب کنید";
module.exports.USER_INFO_FULLNAME_MESSAGE = "لطفا نام و نام خانوادگی خود را بنویسید";

module.exports.USER_INFO_EMAIL_MESSAGE = "لطفا ایمیل متصل به بازی خود را بنویسید"
module.exports.USER_INFO_EMAIL_INFO_MESSAGE = "لطفا نوع ایمیل خود را بنویسید (GMAIL,YAHOO,FACEBOOK...)"
module.exports.USER_INFO_EMAIL_PASS_MESSAGE = "لطفا رمز ایمیل خود را بنویسید"
module.exports.USER_INFO_GAME_NAME_MESSAGE = "لطفا اسم بازی متصل به ایمیل خود را بنویسید"
module.exports.USER_INFO_NOTICE_MESSAGE = "لطفا یک یادداشت یا تذکر برای ما بنویسید"
module.exports.USER_INFO_PHONE_MESSAGE = "لطفا شماره خود را یا بنویسید یا اینکه از طریق دکمه زیر ارسال کنید";
module.exports.USER_INFO_SUBMIT_MESSAGE = "اطلاعات جدید شما با موفقیت ثبت شد";
module.exports.USER_BUYS_LIST_MESSAGE = "لیست خرید های ثبت شده و ثبت نشده شما در زیر آمده است.";
module.exports.CONTACT_ADMIN = "برای ارتباط با ادمین به این ایدی پیام دهید : @admin"
module.exports.userInfoMessage = (user) => `اطلاعات شما به صورت زیر در سیستم ثبت می باشد:
جنسیت: ${user.gender === "male" ? "آقا" : "خانم"}
نام و نام خانوادگی: ${user.fullName}
تلفن: ${user.phone}
ایمیل: ${user.email}
نوع ایمیل: ${user.emailInfo}
رمز ایمیل: ${user.emailPass}
اسم بازی انتخاب شده: ${user.gameName}
یادداشت برای ما: ${user.notice}`;

module.exports.buyDetail = (buy)=>`جزییات خرید شما

لیست محصولات : 
${buy.products.map((item,index)=>`${index+1}. اسم: ${item.name}   کدپیگیری: ${buy.id}   مبلغ پرداخت شده: ${buy.amount}`).join("\n")}



برای اطلاع از روند انجام سفارش خود میتوانید به ایدی زیر پیام دهید یا با مراجعه به بخش پشتیبانی سایت  (لینک پایین)  از سفارش خود مطلع شوید
  @admin
  `

module.exports.buyFailDetail = (buy)=>`جزییات خرید شما

لیست محصولات : 
${buy.products.map((item,index)=>`${index+1}. ${item.name}`).join("\n")}

میتوانید خرید این لیست همین حالا انجام دهید`

module.exports.paymentMessage = (price) => `مبلغ قابل پرداخت برای شما
${price} تومان 

برای پرداخت میتوانید از دکمه زیر استفاده کنید`
module.exports.cartListMessage = (cart) => {
    return `سفارش شما شامل:

${cart.map((item, index) => `${index + 1}- ${item.name} : ${item.price}\n`).join("")}

💰مبلغ قابل پرداخت: ${cart.reduce((acc, item) => acc + item.price, 0)} تومان`
};
module.exports.getProductDetailMessage = (product) => `🌸${product.name}🌸

${product.meta ? product.meta.map(item => (`${item.key}:${item.value}`)).join("\n") : ""}

وضعیت : ${product.exist ? "موجود" : "ناموجود"}
${product.price>0 ? `قیمت مقطوع : ${product.price} تومان`:"**رایگان**"}


`

module.exports.getTutorialsDetailMessage = (tutorials) => `🌸${tutorials.name}🌸

${tutorials.description ? ` توضیحات  : ${tutorials.description} `:"**موجوجم**"}

${tutorials.link ? ` مشاهده آموزش در سایت  : ${tutorials.link} `:"**موجوجم**"}


`

module.exports.getQuestionsDetailMessage = (questions) => `🌸${questions.name}🌸

${questions.description ? ` جواب  : ${questions.description} `:"**موجوجم**"}

${questions.link ? ` مشاهده سوال در سایت  : ${questions.link} `:"**موجوجم**"}


`


module.exports.getSecurbuyDetailMessage = (securbuy) => `🌸${securbuy.name}🌸

${securbuy.description ? ` توضیحات  : ${securbuy.description} `:"**موجوجم**"}

${securbuy.link ? ` مشاهده در سایت  : ${securbuy.link} `:"**موجوجم**"}


`


module.exports.adminCommentMessage = (comment, user) => `🌸${comment.type === "COMMENT_TYPE_ENTEGHAD" ? "یک انتقاد جدید" : "یک پیشنهاد جدید"}🌸

${comment.text}

کاربر : @${user.username}
`
