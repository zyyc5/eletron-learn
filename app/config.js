var CONSTANTS = {
    EnvConstants: {
        WINDOWS: "win",
        ANDROID: "android",
        IOS: "iOS"
    },
    HardWareConstants: {
        PRINTER: "printer",
        NET_PRINTER: "net_printer",
        MONEYNBOX: "moneybox",
        QRCODE_SCANNER: "qrcode_scanner",
        POS_PRINTER: "pos_printer",
        POS_DISPLAY: "pos_display",
        M1CARD: "m1card",
        IC_CARD: "ic_card",
        CT_CARD: "ct_card"
    },
    ZT_ID: "88888888",
    ZT_NAME: "快餐",
    TMLC: "快餐",
    KeyBoardConfigs: {
        display: {
            'bksp': '\u2190',
            'accept': '确定',
            'default': 'ABC',
            'shift': '\u21d1',
            'meta1': '.?123',
            'meta2': '#+='
        },
        layout: 'custom',
        customLayout: {
            'default': [
				'q w e r t y u i o p {bksp}',
				'a s d f g h j k l ',
				'{s} z x c v b n m , . {s}',
				'{meta1} {space} {meta1} {accept}'
            ],
            'shift': [
				'Q W E R T Y U I O P {bksp}',
				'A S D F G H J K L ',
				'{s} Z X C V B N M ! ? {s}',
				'{meta1} {space} {meta1} {accept}'
            ],
            'meta1': [
				'1 2 3 4 5 6 7 8 9 0 {bksp}',
				'- / : ; ( ) \u20ac & @ ',
				'{meta2} . , ? ! \' " {meta2}',
				'{default} {space} {default} {accept}'
            ],
            'meta2': [
				'[ ] { } # % ^ * + = {bksp}',
				'_ \\ | ~ < > $ \u00a3 \u00a5 ',
				'{meta1} . , ? ! \' " {meta1}',
				'{default} {space} {default} {accept}'
            ]
        }
    },
    PRODUCTION: true,
    REQUESTTIMEOUT: 60000,
    APPVERSION: '1.0',//这个会取程序真实的版本号
    SQLHandler: null,
    SQLHandlerISINIT: false,
    ChildPRO: null,
    DBCONNECTSTYLE: 1,
    ENABLEKFKKEY: "enableKfk",
    YAZUOProcess: null,
    INSTALL_CONFIG: {},
    PRINTSERVICESTATUS: false,
    PRINTERS: {},
    CHILDPROCESS: ['WuXianServer.exe', 'YaZuoCard.exe', 'BST.exe', 'LX.exe', 'LX70.exe', 'MSKD.exe', 'WX46.exe', 'WX50.exe', 'weighter.exe']//项目中用到的exe
};



/**
 * 定义业务相关的常量
 * @type {{ORDER_STATUS_WEI_JIE_SUAN: number, ORDER_STATUS_YI_JIE_SUAN: number}}
 */
var BIZCONSTANT = {
    //菜品缓存
    ALLCAIPINSCACHE: [],
    //类别缓存
    ALLPARENTCAIPINtYPES: [],
    //菜品做法缓存
    ALLCAIPINZUOFACACHE:[],
    //自定义做法
    selfZuofaEntity:null,
    //每一个菜品的做法缓存
    cachZuoFaQuene:[],
    //unit缓存
    cachUnitQuene:[],
    //全部口味缓存
    ALLCAIPINKOUWEICACHE:[],
    //全部菜品做法缓存
    ALLCAIPINZUOFACACHE:[],

    POSUSER: null,
    //自定义口味
    SELFKOUWEI: null,
    //账单状态
    // 已开台-空账单
    ORDER_STATUS_YI_KAI_TAI: 1,
    //已点菜
    ORDER_STATUS_YI_DIAN_CAI: 2,
    //已预结
    ORDER_STATUS_YI_YuJie: 3,
    //已结算
    ORDER_STATUS_YI_JIE_SUAN: 4,

    //定期清理数据
    //清理job数据
    JOB_DELETE_DAY: 3,
    //清理order数据
    ORDER_DELETE_DAY: 14,

    //折扣模板相关
    ZHE_KOU_DING_E: '01',
    ZHE_KOU_BI_LI: '02',
    ZHE_KOU_HY_ZK: '04',
    ZHE_KOU_HY_PRICE: '03',
    //会员的优惠方式，目前有 折扣率 和 会员价 两种，是互斥的。
    //只能有其一
    HY_ZK_RULE_LV: 1,
    HY_ZK_RULE_PRICE: 2, //会员价

    OPERATOR_ROLES: [],
    HIGHEST_DE: null,    //定额的最大折扣
    HIGHEST_ZK: null,    //比例的最大折扣
    //#region 支付方式
    PM_XIAN_JIN: '01',    //现金
    PM_YIN_HANG_KA: '02', //银行卡
    PM_HUI_YUAN: '03',    //会员卡
    PM_ALIPAY: '04',      //支付宝
    PM_WECHAYPAY: '05',   //微信支付
    PM_WAIMAI: '06', //外卖消费
    PM_COUPON: '07',     //优惠券支付
    PM_WECHAYPAY_NAME: '微信支付',//微信支付
    PM_HUI_YUAN_ALIAS: "MemCard",
    PM_WEIXIN_ALIAS: "WeChat", //别名,微信端传递参数
    PM_YAZUOPAY: "yz", //雅座卡消费
    PM_WSHPAY: "wsh", //微生活卡消费,微支付
    PM_CYTHYKPAY: "cythyk", //餐易通会员卡
    PM_CYTXJQPAY: "cytxjq", //餐易通现金券
    PM_YS_ALIPAY: "yszfb",
    PM_YS_WECHATPAY: "yswx",
    PM_TL_ALIPAY: "tlzfb",
    PM_TL_WECHATPAY: "tlwx",
    PM_TL_GZH: "tlwxgzh", //通联公众号
    PM_MSYH_WECHATPAY: "msyhwx",
    PM_MSYH_ALIPAY: "msyhzfb",
    PM_SHANDE_WECHATPAY: "sdwx",
    PM_SHANDE_ALIPAY: "sdzfb",
    PM_DXY_YZF: "dxyyzf", //店小翼直接扫码
    PM_HUI_YUANJIA_NAME: "会员价", //微信端以会员价支付
    PM_HUI_YUANJIA_ALIAS: "MemHYJ",
    PM_TL_WECHATPAY_ALIAS: "AllinWeChat",
    PM_TL_WECHATPAY_GZH: "tlwxgzh",//通联微信公众号
    PM_HLS_WECHATPAY_SKF: "hlswxskf",//华莱士微信刷卡付
    PM_HLS_ALIPAY_TMF: "hlszfbtmf",//华莱士支付宝条码付
    PM_TLYZH_ALIPAY_FS: "tlyzhzfb",//通联云账户支付宝反扫
    PM_TLYZH_WECHATPAY_FS: "tlyzhwx",//通联云账户微信反扫
    PM_TLYZH_WECHATPAY_GZH: "tlwxgzh",//通联云账户微信公众号支付
    PM_WFT_ALIPAY: "wftzfb",//威富通支付宝
    PM_WFT_WECHATPAY_GZH: "wftwxgzh",//威富通微信公众号支付
    PM_WFT_WECHATPAY_SKF: "wftwx",//威富通微信刷卡支付

    PM_WM_HONGBAO_CODE: '-2',
    PM_WM_HONGBAO_NAME: '红包',

    PM_WM_PEISONG_CODE: '-3',
    PM_WM_PEISONG_NAME: '服务费',

    // add by samuel
    PM_ALIPAY_EXTERNAL_CODE: '200',
    PM_ALIPAY_EXTERNAL_NAME: '支付宝',
    // 这是weixin 外部支付，区别于上面季老反的内置支付
    PM_WEIXIN_EXTERNAL_CODE: '300',
    PM_WEIXINI_EXTERNAL_NAME: '微信',

    PM_COUPONS_ALIAS: "Coupons",
    PM_COUPONS_NAME: "优惠券",

    PM_WEIXIN_BANK_CODE: "YsYinLianKa", //微信，银行卡
    PM_WEIXIN_BANK_NAME: "银行卡", //微信，银行卡

    PM_BANK_CODE: "500", //银联卡 - 微信端支付方式
    PM_BANK_NAME: "银联卡",
    PM_BANK_ALIAS: "BankCard",

    //美团闪惠
    PM_MEITUAN_SHANHUI:"mtsh",
    //美团团购
    PM_MEITUAN_TUANGOU:"mttgq",


    PM_HUI_YUAN_NAME: '会员卡',
    PM_HUI_YUAN_FAN_ZHI: 'INTERNAL_FANZHI', //会员卡反值
    PM_HUI_YUAN_JF_XF_CODE: 'INTERNAL_JFDH', //积分消费代码
    PM_HUI_YUAN_JF_ALIAS: "JiFen",
    PM_HUI_YUAN_JF_XF_NAME: '积分消费',  //积分消费名字

    PM_HUI_YUANCARD_ZS_XF_CODE: "INTERNAL_HYZSDH", //会员卡赠送消费代码
    PM_HUI_YUANCARD_ZS_XF_NAME: "会员卡赠送消费", //会员卡赠送消费名字

    PM_WAIMAI_NAME: '外卖',  //外卖消费名字

    PM_FKLX_ZN: 'zn',//正念卡付款类型
    PM_FKLX_WLK: 'wlk',//为来客
    PM_FKLX_QD: 'qd',//签单付款类型
    PM_ThridCRM: ['wlk', 'zn'],//第三方会员
    //#endregion

    JS_XF_MEMBER_CZ: "会员卡储值消费",
    JS_XF_MEMBER_ZS: "会员卡赠送消费",
    JS_XF_MEMBER_JF: "会员卡积分消费",

    // #region name//雅座卡、微生活消费/撤销标记
    YZKYL: "YaZuoYuLan", //雅座卡扣款、预览消费
    YZKTJ: "YaZuoTiJiao", //结账时，雅座卡提交、此时才真正扣款
    YZKXF: "YaZuoXiaoFei", //雅座卡消费
    YZKCX: "YaZuoCheXiao", //雅座卡撤销
    WSHXF: "WeiShengHuoXiaoFei", //微生活消费
    WSHCX: "WeiShengHuoCheXiao", //微生活撤销
    CYTHYK: "CanYiTongCard", //餐易通会员卡
    CYTXJQ: "CanYiTongQuan", //餐易通现金券
    // #endregion

    //账单菜品类别
    ORDER_CAIPIN_TYPE_DIAN: 1,
    ORDER_CAIPIN_TYPE_TUI: 2,

    //加价方式
    JIAJIATYPE_SHULIANG: "001",
    JIAJIATYPE_DINGE: "002",

    //菜品出品
    ORDER_CAIPIN_CHUPIN_JI: "即",
    ORDER_CAIPIN_CHUPIN_JIAO: "等叫",
    ORDER_CAIPIN_CHUPIN_FAST: "加急",
    ORDER_CAIPIN_CHUPIN_TUI: "退",
    ORDER_CAIPIN_CHUPIN_QI: "起",
    ORDER_CAIPIN_CHUPIN_DOUBLE: "倍",

    //落单
    ORDER_CAIPIN_LUODAN_TRUE: 1,
    ORDER_CAIPIN_LUODAN_FALSE: 0,

    CWKM_YOUMIAN: "优免",//优免 - 财务科目
    CWKM_SHISHOU: "实收", //实收 - 财务科目

    //退菜原因类型
    TUICAI_REASON_PU_TYPE: 0,  //普退
    TUICAI_REASON_SHANG_TYPE: 1, //上退
    TUICAI_REASON_GU_TYPE: 2, //临时估清退菜

    DCJ_DishCodeLength: 5,//点菜宝 菜品编码长度 默认 5，可配置

    //默认两位，将来可配置。
    MONEY_PRECISE: 2,

    GUQING_SAVE_TRUE: 1,
    GUQING_SAVE_FALSE: 0,
    SELFKOUWEI_CODE: "01", //自定义口味编码
    SELFZUOFA_CODE: "01", //自定义做法编码
    SELFZENGSONG_REASON_CODE: "01", //自定义赠送原因编码
    FANJIESUAN_NO: "0",
    FANJIESUAN_YES: "1",
    //匹配键盘的输入
    REG_NUMBERS: [
        {
            REG_TEXT: /^[1-9][0-9]?$/,
            IDS: "biliZhekou"
        },
        {
            REG_TEXT: /^([1-9]\d{0,5}|0)(\.|\.\d{1,2})?$/,
            IDS: "jineZhekou,orderCaipinNum,gqCaipinNum,tuicaiNum,zengsongNum,editCaiPinNum"
        },
        {
            REG_TEXT: /^([1-9]\d{0,5}|0)(\.|\.\d{1,2})?$/,
            IDS: "zhongliangqueren,selfzfPrice"
        },
        {
            REG_TEXT: /^[1-9][0-9]{0,2}$/,
            IDS: "orderRenshu,renshu"
        },
        {
            REG_TEXT: /^[0-9]{1,4}$/,
            IDS: "orderPaihao"
        }
    ],
    REG_NUMBER_TEXT: /^(\d*)(\.|\.\d{1,2})?$/,//验证 xxx.xx
    POS_REG_NUMBER_TEXT: /^[1-9][0-9]{0,2}$/, // 验证非称重菜品不能输入小数
    POS_REG_NUMBER_TEXT_ZERO: /^[0-9][0-9]{0,2}$/, // 验证需称重菜品条只数不能为小数（可为0）
    MASTER_SERVER_URL: "",
    REG_IP: /^((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))$/,
    //流水号占位
    LS_JIE_SUAN_DAN: "$JIESUANDAN_$",
    LS_BAN_CI: "$BANCI_$",
    SYNC: "$SYNC",
    SQL: "$SQL$",

    DATA_UPLOADED_YES: 1,
    DATA_UPLOADED_NO: 0,

    PEER_CONNECTION_STATU: true,//从机与主机的网络连接状态
    PEER_CONNECTION_FAILED: -1, //网络错误
    PEER_SYNC_SUCCESS: 200, //网络通，并且对方执行成功
    PEER_SYNC_FAILED: 201, //网络通，但是对方执行失败
    PEER_SYNC_NOMATCH: 404, //网络通，但是未找到对应的处理器，各程序版本不一致会引起

    CLOUDMSGCOUNT: 0,//云消息数量

    BANCI_WEI_JIE_BAN: "0",
    BANCI_YI_JIE_BAN: "1",
    TYPE_PAY: "PAY",
    TYPE_ZHEKOU: "ZK",  //折扣

    //会员结算RULE:
    MEMBER_RULE_CHONGZHI_PREFER: 1,
    MEMBER_RULE_ZONGSONG_PREFER: 2,
    MEMBER_RULE_BILI: 3,
    //交易类型
    MEMBER_TRANS_CHUNZHI: { code: "PD", desc: "储值消费" },
    MEMBER_TRANS_PRESENT: { code: "PT", desc: "赠送消费" },
    MEMBER_TRANS_CASH: { code: "CA", desc: "现金消费" },
    MEMBER_TRANS_JIFEN: { code: "JF", desc: "积分消费" },

    // #region 设置里的数据源项 
    POS_SYSTEM_CONFIG_MODULE: { shanghu: "shanghu", xiaopiao: "xiaopiao", gongneng: "gongneng", zhanghao: "zhanghao", guanyu: "guanyu", qiandandayin: "qiandandayin" },
    READCARD_TYPES: [{ name: "射频M1卡", value: CONSTANTS.HardWareConstants.M1CARD }, { name: "接触IC卡", value: CONSTANTS.HardWareConstants.IC_CARD }, { name: "磁条卡", value: CONSTANTS.HardWareConstants.CT_CARD }],//["接触IC卡", "射频M1卡", "磁条卡", "可视卡"],
    READCARD_PORTS: ["COM1", "COM2", "COM3", "COM4", "COM5", "COM6", "COM7", "COM8", "COM9"],
    READCARD_BOTELVS: ["1200", "2400", "4800", "9600", "19200", "57600", "115200"],
    KEXIAN_TYPES: ["LED", "VFD"],
    MOLING_TYPES: ["四舍五入", "不抹零", "去零"],

    GUQING_TIMES: [{ name: "当餐", code: "1" }, { name: "当天", code: "2" }],
    DAYIN_TYPES: [{ name: "网络打印", value: "网络打印" }, { name: "驱动打印", value: "驱动打印" }, { name: "USB/串口打印", value: "USB/串口打印" }],
    // #endregion

    PRINTINVOCECODE: {
        ZHIZUODAN: "R001", HUADAN: "R002", TUICAIDAN: "R003", HUANTAIDAN: "R004", TONGZHIDAN: "R005",
        JIEZHANGDAN: "001", KEYONGDAN: "002", DUIZHANGDAN: "003", JIEBANDAN: "004", FENDANCESHI: '005', PINXIANGDAN: '006', SHOUYINREPORT: '008',
        CHONGZHIDAN: '101', FAKADAN: '102', KAXAIOFEIDAN: '103', CHONGZHICHEXIAO: '104', JIFENCHEXIAO: '105', CHUZHICHEXIAO: '106', SALEREPORT: '107',
        WMPEISONGDAN: '009', BJMKCHONGZHIDAN: '108', BJMKTUIKADAN: '109', TUICAIHUIZONG: '010', NLJM: '013'
    },//打印方案code

    // #region 缓存内容

    //付款方式缓存
    ALLPMs: [],
    //折扣缓存
    ALLZKs: [],
    //会员价折扣模板对象
    HUIYUANJIAOBJ: null,
    //会员折扣模板对象
    HUIYUANZKOBJ: null,
    //做法缓存
    ALLZUOFA: [],
    //口味缓存
    ALLKOUWEI: [],
    ALLPRINTCAIPIN: [],//所有菜品-打印机关系
    ALLPRINTRECEIPT: [],//所有打印方案
    ALLPRINTTEMPLATE: [],//所有的打印模板
    ALLPRINTZHUOTAI: [],//所有桌台-打印机关系
    ALLPRINTAREA: [],//所有区域-打印机关系
    ALLWISDOMCONFIG: [],//所有智慧厨房配置（划单设备关联打印方案）

    MLVCONFIGINFO: [], //菜品毛率利配置信息

    // #endregion


    LOCALSTORAGE_INSTALLCONFIG: null,
    ZHUOTAI_REFRESH_TIMER: null,
    YETAI: 0,//业态-中餐0，快餐1
    WAIMAIQUENE: {},//外卖队列缓存

    PEISONGNAME: "配送费",
    WAIMAIPAKEAGENAME: "餐盒打包费",
    ZIDINGYIWAIMAI: "自定义外卖",
    TEMDISH: "临时菜",
    WAIMAINEEDDISH: null,
    CRM_DARK: true,
    SELECTPRINT: true,
    SELECTPRINT_CANTEEN:1,
    SELECT_PRINT_MODEL:"云餐收银", //区分是云餐厅的打印设置，还是云膳收银的设置
    USER_HAS_LOGIN: false   // 标记是否登录
};

//日志类型
BIZCONSTANT.LOGTYPE = {
    weiXinLog: "weiXinLog", //微信Log
    synLog: "synLog", //数据同步Log
    waiMaiLog: "waiMaiLog", //外卖Log
    mqtt: "aliMQTT", //阿里MQTT
    jieSuanLog: "jieSuanLog" //结算相关log
}

//added by peter. get payment method by codes
BIZCONSTANT.getPMbyCode = function (targetCode) {
    var _self = this;
    for (var idx in _self.ALLPMs) {
        if (_self.ALLPMs[idx].code == targetCode)
            return _self.ALLPMs[idx];
    }
    return null;
}

//通过付款类型查找支付方式
BIZCONSTANT.getPMbyFKLX = function (fklx) {
    var _self = this;
    for (var idx in _self.ALLPMs) {
        if (_self.ALLPMs[idx].fklx == fklx)
            return _self.ALLPMs[idx];
    }
    return null;
}

//现金支付方式
BIZCONSTANT.getXianJinPM = function () {
    var _self = this;
    for (var idx in _self.ALLPMs) {
        if (_self.ALLPMs[idx].code == BIZCONSTANT.PM_XIAN_JIN)
            return _self.ALLPMs[idx];
    }
    return null;
}

//饿了么红包
BIZCONSTANT.getEleHBPM = function () {
    var elePM = new PaymentMethod();
    elePM.pmId = "-2";
    elePM.code = "-2";
    elePM.name = "红包";
    elePM.isHyJf = "true";
    return elePM;
}

//外卖服务费
BIZCONSTANT.getWMServicePM = function () {
    var servicePM = new PaymentMethod();
    servicePM.pmId = "-3";
    servicePM.code = "-3";
    servicePM.name = "服务费";
    servicePM.isHyJf = "true";
    servicePM.caiWuShuXing = BIZCONSTANT.CWKM_YOUMIAN;
    return servicePM;
}

BIZCONSTANT.getZKbyCode = function (targetCode) {
    var _self = this;
    for (var idx in _self.ALLZKs) {
        if (_self.ALLZKs[idx].zheKouCode == targetCode)
            return _self.ALLZKs[idx];
    }
    return null;
}

//会员价折扣
BIZCONSTANT.getHYJZK = function () {
    var _self = this;
    for (var idx in _self.ALLZKs) {
        if (_self.ALLZKs[idx].zheKouCode == BIZCONSTANT.ZHE_KOU_HY_PRICE)
            return _self.ALLZKs[idx];
    }
    return null;
}


var MEMBERURL = {
    //根据卡号查询
    SEARCH_BY_CARD_NO: { name: '根据卡号查询', value: '/api/v1/crmCard/findByCode' },
    //根据手机号查询一批卡
    SEARCH_BY_PHONE: { name: '根据手机号查询', value: '/api/v1/crmCard/findByMobile' },
    //根据手机号查询
    SEARCH_BY_MOBILE: { name: '根据手机号查询', value: '/api/v1/crmMember/findByMobile' },
    //会员结算
    JIE_SUAN_MEMBER: { name: '会员结算', value: '/api/v1/cardTrade/memberConsume' },
    //卡等级
    FINDCARDLEVEL: { name: '卡等级', value: '/api/v1/cardlevel/findCardLevel' },
    //发卡
    CREATECARD: { name: '发卡', value: '/api/v1/crmCard/create' },
    //充值
    RECHARGE: { name: '充值', value: '/api/v1/crmCard/recharge' },
    //撤销列表
    CARDBANCITRADE: { name: '撤销使用的交易列表', value: '/api/v1/cardTrade/cardBanciTrade' },
    //撤销
    CANCELRECHARDTRADE: { name: '撤销交易', value: '/api/v1/cardTrade/cancelMemberConsume' },
    //根据班次获取会员储值信息
    BANCIPAYTYPETRADE: { name: '根据班次获取会员储值信息', value: '/api/v1/cardTrade/banciPayTypeTrade' },
    //会员卡储值消费撤销
    HUIYUANKACHUZHI: { name: "会员卡储值消费", value: "/api/v1/cardTrade/cancelMemberConsume?token=123&t=1" },
    //会员卡积分消费撤销
    HUIYUANKAJIFEN: { name: "会员卡积分消费", value: "/api/v1/cardTrade/cancelMemberConsume?token=123&t=1" },
    //根据凭据显示明细
    SHUOMINGXI: { name: "显示明细", value: "/api/v1/cardTrade/findbypjh?token=123&t=1" },
    //反结算撤销
    JIE_SUAN_UNDO: { name: "反结算撤销", value: "/api/v1/cardTrade/cancelMemberConsume?token=123&t=1" },
    //优惠券信息
    COUPONINFO: { name: "获取优惠券信息", value: "/api/v1/strategy/getCouponByCodeAndOrgId" },
    COUPONINFOBYPHONEORCODE: { name: "根据手机号或券号查询券信息", value: "/api/v1/strategy/member/coupon" },
    COUPONINFOBYCARD: { name: "根据卡号查询券信息", value: "/api/v1/strategy/card/coupon" },

    BANCITUIKATRADE: { name: "退卡金额统计", value: "/api/v1/cardTrade/banciTuiKatrade" },

    //查卡信息
    CARD_INFO: { name: "查卡信息", value: "/api/v1/crmCard/findByHy" },
    //查卡转账
    CARD_ZHUANZHANG: { name: "卡转账", value: "/api/v1/crmCard/transferAccount" },
    //查卡明细
    CARD_DETAIL: { name: "查卡交易明细", value: "/api/v1/cardtradedetail/findTradeDetailsByCardCode" },

    //改会员卡卡密码
    CARD_CHANGEPWD: { name: "改会员卡卡密码", value: "/api/v1/pos/card/changepass?token=123&t=1" }


}

var SETPSW = {
    CHANGEPSW: { name: "修改工号密码", value: "/api/v1/baseperson/changePsw" }
}

var INIT = {
    CONFIG: { desc: "配置信息", url: "/api/v1/org/findorgbypk_groupid", tableName: "pos_system_config" },
    AREA: { desc: "区域信息", url: "/api/v1/posarea/all", tableName: "pos_area" },
    ZHUOTAI: { desc: "桌台信息", url: "/api/v1/zhuotai/findByOrg", tableName: "pos_zhuotai" },
    DISH_TYPE: { desc: "菜品类型信息", url: "/api/v1/fastdishtype/finddishtype", tableName: "pos_caipin_type" },
    ZHUOFA: { desc: "做法信息", url: "/api/v1/poszuofa/all", tableName: "pos_zuofa" },
    ZHUOFA_TYPE: { desc: "做法类别信息", url: "/api/v1/poszuofatype/findbygroup", tableName: "pos_zuofa_type" },
    KOUWEI: { desc: "口味信息", url: "/api/v1/poskouwei/all", tableName: "pos_kouwei" },
    TUICAIREASON: { desc: "退菜原因信息", url: "/api/v1/postuicaireason/all", tableName: "pos_tuicai_reason" },
    RESENTREASON: { desc: "赠送原因信息", url: "/api/v1/pospresentreason/find", tableName: "pos_zengsong_reason" },
    ZHEKOU_TEMPLATE: { desc: "折扣模板信息", url: "/api/v1/poszhekoutemplate/all", tableName: "pos_zhekou" },
    CAIWUKEMU: { desc: "财务科目信息", url: "/api/v1/fastcaiwukemu/all", tableName: "pos_cai_wu_ke_mu" },
    CAIBIE: { desc: "餐别信息", url: "/api/v1/canbie/findCanbie", tableName: "pos_canbie" },
    PERSON: { desc: "人员信息", url: "/api/v1/baseperson/find_basepersobyorg_dept", tableName: "pos_person" },
    PERSON_ROLE: { desc: "人员角色信息", url: "/api/v1/authuserrole/find_personrole_list", tableName: "pos_person_role" },
    PERSON_FUNC_MISSIONS: { desc: "员工操作权限信息", url: "/api/v1/permissions/find/personlist_funcpermission", tableName: "pos_person_func_mission" },
    PERSON_POS_MISSIONS: { desc: "员工数据权限信息", url: "/api/v1/permissions/find/personlist_pospermission", tableName: "pos_person_pos_mission" },
    CAIPIN: { desc: "菜品信息", url: "/api/v1/caipin/findAllCaiPin", tableName: "pos_caipin" },
    PRINT: { desc: "打印配置信息", url: "/api/v1/print/findall", tableName: "" },
    SCOMB_CAIPIN: { desc: "套餐菜品信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "" },
    ORDER: { desc: "订单信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_order" },
    ORDER_CAIPIN: { desc: "订单-菜品信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_order_caipin" },
    ORDER_CAIPIN_KOUWEI: { desc: "订单-菜品-口味信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_order_caipin_kouwei" },
    ORDER_CAIPIN_ZUOFA: { desc: "订单-菜品-做法信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_order_caipin_zuofa" },
    ORDER_SCOMB_CAIPIN: { desc: "订单-套餐-信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_order_scomb_caipin" },
    BILLING: { desc: "账单信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_billing" },
    BILLING_DETAIL: { desc: "账单详细信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_billing_detail" },
    GUQING: { desc: "估清信息", url: "/api/v1/tc/findtcbysearchkey", tableName: "pos_caipin_guqing" },
    PRINT_TEMPLTE: { desc: "打印模板", url: "/api/v1/printTemplate/findAll", tableName: "pos_sys_print_receipt_template" },
    CONSUMPTION_TYPE: { desc: "消费类型", url: "/api/v1/PosConsumptionType/findAllTongbu", tableName: "pos_consumption_type" },
    CONSUMPTION_CP: { desc: "消费类型菜品", url: "/api/v1/PosConsumptionCaipin/findAllTongbu", tableName: "pos_consumption_caipin" },
    THIRDCOUPON: { desc: "抵用券", url: "/api/v1/posThirdCoupon/findAllTongbu", tableName: "pos_third_coupon" },
    THIRDCOUPONEXCLUDEDISH: { desc: "抵用券不可用菜品", url: "/api/v1/posThirdCouponNotUseCaipinTypeInfo/findAllTongbu", tableName: "pos_third_coupon_not_use_caipintype" },
    MLVCONFIGINFO: { desc: "菜品毛利率", url: "/api/v1/maolilvQuotient/findAll", tableName: "pos_dish_mlv" },
    CROSSBILLTP: { desc: "划单设备", url: "/api/v1/posCrossOutBillTemplate/findAllPosCrossOutBillTemplate", tableName: "pos_cossoutbill_template" },
    PKMEALDISPLAY: { desc: "取餐显示屏", url: "/api/v1/posPickUpMealDisplay/allPosPickUpMealDisplay", tableName: "pos_pickup_meal_display" }
}

var INSTALL_CONFIG = {
    GETMASTER: { url: "/api/v1/pos_terminal/master" },
    GETINSTALLCONFIG_WIN: { url: "/api/v1/pos_terminal/mac" },
    GETINSTALLCONFIG_UDID: { url: "/api/v1/pos_terminal/udid" },
    ADD_INSTALLCONFIG: { url: "/api/v1/pos_terminal/add" }
}



var WEB_SERVER = {
    PORT: 8888,
    SOCEKTPORT: 8889
}

var ORDERSOURCE = {
    DEFAULT: null,
    WEIXIN: "weixin",
    FAST: "fast",
    FAST_GUADAN: "fast_guadan",
    WAIMAI_ELEME: "waimai_eleme",
    WEIXIN_FAST_GUADAN:"weixin_fast_guadan" //微信快餐(结算之前的临时状态)
}

var TOKEN_HOST_TYPE = {
    POS: "pos",
    WEIXIN: "weixin"
};

var BUSINESS = {
    CURRENT_ZHUOTAI: null,
    CURRENT_ORDER: null
}

//所有系统配置信息的Name名称
var SystemConfigKeys = {
    StoreID: "MD_ID",
    StoreCode: "StoreCode",
    GroupID: "GroupID",
    GroupCode: "GroupCode",
    OrderPrefix: "OrderPrefix",
    HotelName: "HotelName",
    HotelAddress: "HotelAddress",
    HotelTel: "HotelTel"
}

var WEIXIN = {
    DEFAULT_ORDER_STATUS: 1,
    DEFAULT_ORDER_RENSHU: 1,
    DEFAULT_ORDER_COMMENTS: "",
    API_KEY: "IEaSy360KeY2014",
    API_PATH: "/api/v1/weixin/common/pos_order_cb",
    GET_WEIXIN_ORDER_URL: "/api/v1/wxorder/getorderformposqiantai?t=1&token=1", // 获取微信订单URL
    WEIXIN_ORDER_CALLBACK_URL: "/api/v1/wxpayresult/handleStoreOrderCallback?t=1&token=1", //获取微信订单之后，返回处理信息URL
    WEINXIN_ORDER_CONFIRM_URL: "/api/v1/wxorder/orderjsformqt?t=1&token=1", //微信订单结算后通知服务器修改状态URL
    WEINXIN_ORDER_MISSING_WCT_URL: "/api/v1/order-center-web/orders/list", //打开微餐厅，获取未接收到的异常订单
    WEIXIN_ORDER_UPDATEORDERBYSCANCODE: "/api/v1/wxorder/updateOrderbyScanCode", //微信扫码支付，订单更新URL
    WEIXIN_ORDER_LUODAN_URL: "/api/v1/wxorder/ordernopayformqt?t=1&token=1", // pos竖屏，微信扫码后，落单去通知微信
    KAFKA_SYN_URL: "/api/v1/weixinSyncData/sync",//kafka同步地址
    PILINGGUQING_URL: "/api/v1/dish/saleOut" //批量估清
};

var SCMURL = {
    purchaseplan: '/purchaseplan/toPurchaseplanList',//订货
    receipt: '/receipt/getOrderList'//收货
}

var NetworkOrderOperate = {
    id: "1-wldcy",
    code: "123612",
    name: "微信下单",
    groupCode: "",
    groupId: "",
    mdId: ""
}

var POS_API_URL = {
    CAIPIN_GUQING_URL: "/api/v1/weixin/addguqing",//估清ApiUrl
    PAY_URL: "/api/v1/pay", //第三方支付地址（支付宝及微信扫码支付）
    PAY_QUERY_URL: "/api/v1/query", //第三方支付异步查询地址（支付宝及微信扫码支付）
    UPLOUD_ORDERDATA_URL: '/api/v1/syncdata',//营业数据上传地址
    UPLOUD_TEMPLE_URL: '/api/v1/posdata/save',//现场数据上传地址（注销云账号时上传）
    UPLOUD_PRINTER_URL: '/api/v1/syncdata/printer',//打印机状态上传地址
    UPLOUD_ZHUOTAI_URL: '/api/v1/syncdata/zhuotai',//桌台状态上传地址
    KAFKA_POS_SYN_URL: '/api/v1/pos/sync',//kafka pos 同步地址
    KAFKA_BASE_SYN_URL: '/api/v1/sync',// kafka base 同步地址
    FIND_TEMPLE_URL: '/api/v1/posdata/find',//获取现场数据地址
    CAIPIN_SHOUQING_URL: "/api/v1/weixin/batchguqing"//售罄ApiUrl
}

var PingServerInterval = {
    IntervalTime: 1000 * 60 * 10 //每隔10分钟ping一次服务器
    //IntervalTime : 3000 //test
}

//门店功能设置
var MD_TABALE_SET = {
    MLCL: '抹零处理',
    LDDY: '落单打印小票',
    KTRS: '开台时不强制输入人数',
    JDXSDCY: '加单需输入点菜员',
    LYXS: '零元菜品可以销售',
    JZBDY: '结账完成时不打印结账单',
    XCZZJQRZL: '需称重菜品点菜时直接确认重量',
    QYBJMK: '启用不记名卡',
    QYWM: '启用外卖',
    QYWCT: '启用云餐厅',
    KYEBZBYXSY: '是否快速刷卡',
    NOTNEEDCARDWHENHYJ: '使用会员价不需读卡',//会员价无需读卡
    PRINTDISHSORT: 'PRINTDISHSORT',
    PRINT_NO_NumFORMAT: 'PRINT_NO_NumFORMAT',
    MORE_CLIENT_LOGINABLE: 'MORE_CLIENT_LOGINABLE',
    ISSELECTDIANCAIYUAN: 'ISSELECTDIANCAIYUAN', //是否选择点菜员
    ISACTSONGDANBUDAYING: 'ISACTSONGDANBUDAYING', //送单不打印不需要确认
    SAVEDAYS: 'SAVEDAYS',//
    YPYK: 'YPYK',//
    PrintBeep: 'PrintBeep',//
    PrintBeepCount: 'PrintBeepCount',//
    PrinterBeepLeep: 'PrinterBeepLeep',//
    MERGECAIPIN: 'MERGECAIPIN',//自动合并同名同单位菜品
    SAMECPHB: 'SAMECPHB',//相同菜品打印对账单是否合并
    MERGECAIPINS: 'MERGECAIPINS',//可变价菜是否需要确认价格
    PRINT_IGNOR_HY_XF: 'PRINT_IGNOR_HY_XF',
    PRINT_IGNOR_HY_CZ: 'PRINT_IGNOR_HY_CZ',
    nengliangcode: 'nengliangcode'
}

//抹零处理
var MLSET = {
    SSWR: '四舍五入',
    BML: '不抹零',
    QL: '去零'
}

//落单打印小票
var LDDYXPSET = {
    BDY: '不打印',
    DYBC: '打印本次落单菜品',
    DYZZ: '打印整桌菜品'
}

//功能参数 //登录时查表赋值
var CAT_PAR = {
    LOCAL: {},
    REMOTE: {}
}

//角色权限
var ROLE_POWER = {
    YC: 'zt-yc',         //移菜
    BYC: 'zt_yc',        //暂定移菜
    DC: 'cp_dc',         //点菜
    JS: 'zd_js',         //结算
    HT: 'zt_ht',         //换台
    QT: 'zt_qt',         //清台
    KYD: 'dj_kyd',       //打印客用单
    DZD: 'zd_dzd',       //对账单
    GQ: 'cp_gq',         //估清
    KT: 'zt_kt',          //开台
    KB: 'bc_kb',         //开班
    JB: 'bc_jbjz',       //结班

    SHXX: 'xt_sh',       //商户信息
    XPDYSZ: 'xt_xp',     //小票打印设置
    QDDYSZ: 'xt_qd',     //签单打印设置
    CFJKSZ: 'xt_cd',     //厨房监控设置
    GGSZ: 'xt_gn',       //功能设置
    ZHGL: 'xt_zh',       //账户管理
    WPSZ: 'xt_wp',       //外屏设置
    XXZX: 'xt-xxzx',     //消息中心
    XGMM: 'xt-xgmm',     //修改密码
    NLJM: 'xt_nljmd',     //能量解码

    CZ: 'hy_hyjm',       //卡充值查询
    KK: 'hy_hykk',       //卡开卡
    CX: 'hy_hycx',       //卡撤销
    HYXGMM: 'hy_hyxgmm', //会员修改密码
    HYKXX: 'hy_hykxx',   //会员卡信息
    HYTK: 'hy_tk',
    TC: 'zd_tc',         //退菜
    ZS: 'zd_zs',         //赠送
    DPDZ: 'zd_dpdz',     //单品打折
    ZZCZ: 'cp_zzcz',     //整桌操作

    JZ: 'zd_jz',         //结账
    DKQX: 'zd_dkqx',     //打开钱箱

    CXDD: 'zd_zdcx',     //重新打单
    FJS: 'zd_fjs',       //反结算
    FP: 'zd_fp',         //发票

    ZDCX: 'zd_zdcx',      //账单查询

    BFZHYC: 'zt-fzhyc',      //封账后移菜
    FZHYC: 'zt_fzhyc',      //封账后移菜
    FZHJD: 'zt_fzhjd',       //封账后加单

    DEZK: 'zd_dezk',            //定额折扣
    BLZK: 'zd_blzk',              //比例折扣
    UNDOPAYANDZK: 'fkfscxsq'   //撤销付款方式是否授权
    //数据同步
    //结账单




};

var RESVER = {
    GET_RESVER_INFO: "/api/v1/reserve/pos/allResList",//登录时候获取的预定信息
    GET_RESVER_ARRIVE: "/api/v1/reserve/pos/arrive",//抵达
    GET_RESVER_FINISH: "/api/v1/reserve/pos/finish"//结算

}

//升级日志
var UPGRADE_LOG = [];

//存储国际化json文件
var LANGUAGECACHE = null;

var KEYBOARDSELECT = null;

var networkorder = '{"cspt_ID":"5ce43ec578314acb879714269cfe74f4","groupId":"729f6c45-ce34-44ce-ba1f-78f29b820b5d","groupCode":null,"storeId":"31d556f5-9b24-4691-8a41-baf1cd3ce1af","totlePrice":0.02,"ZTCode":"1001","ZTName":"002","orderDishs":[{"dishId":"0a654f33-3a0b-435d-b6bc-2c0b06c306bc","dishCode":"1003","dishName":"韭菜鸡蛋","dishCount":1.0,"unitPrice":0.01,"hyPrice":null,"dishTypeId":"6ea0fe85-a7ab-4446-8bae-6b01e8d743d7","dishTypeCode":"undefined","dishTypeName":"热菜","unitId":"31d556f5-9b24-4691-8a41-baf1cd3ce1af-f","unitName":"份"},{"dishId":"12a105c6-1e02-4c1e-beac-0e9f53a747cc","dishCode":"1004","dishName":"酱油汤","dishCount":1.0,"unitPrice":0.01,"hyPrice":null,"dishTypeId":"6ea0fe85-a7ab-4446-8bae-6b01e8d743d7","dishTypeCode":"undefined","dishTypeName":"热菜","unitId":"31d556f5-9b24-4691-8a41-baf1cd3ce1af-f","unitName":"份"}]}';

//正念获取token参数
var ZN_TOKEN_PS = {
    "fd1e22c7-6bec-4a1d-99ec-46ca3bad0318": {//柠檬鱼
        username: "YSZHUserName",
        password: "ksfc5v78nhl",
        scope: "QCTCPosAPI",
        grant_type: "password",
        client_id: "YSZHClientID",
        client_secret: "ytrfvj765mm"
    },
    "dd055690-1677-493b-8182-96ef3ec98642": {//美华家园
        username: "MHJYUserName",
        password: "hjDf78f6d$",
        scope: "QCTCPosAPI",
        grant_type: "password",
        client_id: "MHJYClientID",
        client_secret: "Pkjd4K8#4"
    }
}

var WLK_TOKEN_PS = {
    "29696ae1-d58c-4e57-a106-7aa54e7b4918": {//测试用
        "mid": "100105100000305",
        "action": "action"
    },
    "abc70bb6-085f-45b0-9972-7a92371e303f": {//咖啡人
        "mid": "100105100000101",
        "action": "action"
    },
    "abc70bb6-085f-45b0-9972-7a92371e303f":{
        "mid":"100105100000511",
        "action":"action"
    },
    "02766407-dd8e-4701-952f-f922acc88f8f":{
        "mid":"100105100000910",
        "action":"action"
    }
}