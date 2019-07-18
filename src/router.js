import Vue from 'vue'
import Router from 'vue-router'
import AboutUs from '@/pages/aboutUs/aboutUs'
import Agreement from '@/pages/agreement/agreement'
import AideGenre from '@/pages/aideGenre/aideGenre'
import AideList from '@/pages/aideList/aideList'
import AideOrder from '@/pages/aideOrder/aideOrder'
import ApplyAide from '@/pages/applyAide/applyAide'
import BindPhone from '@/pages/bindPhone/bindPhone'
import BookAide from '@/pages/bookAide/bookAide'
import CabinetDetail from '@/pages/cabinetDetail/cabinetDetail'
import ChangePassword from '@/pages/changePassword/changePassword'
import ChatOnline from '@/pages/chatOnline/chatOnline'
import ChatOnline2 from '@/pages/chatOnline2/chatOnline2'
import ChoiceDepartment from '@/pages/choiceDepartment/choiceDepartment'
import CommodityDetail from '@/pages/commodityDetail/commodityDetail'
import DeviceList from '@/pages/deviceList/deviceList'
import DeviceProbing from '@/pages/deviceProbing/deviceProbing'
import Directory from '@/pages/directory/directory'
import DrugDetail from '@/pages/drugDetail/drugDetail'
import Evaluate from '@/pages/evaluate/evaluate'
import FaultRepair from '@/pages/faultRepair/faultRepair'
import FaultRepair2 from '@/pages/faultRepair2/faultRepair2'
import FinalOrder from '@/pages/finalOrder/finalOrder'
import GiftDrug from '@/pages/giftDrug/giftDrug'
import Login from '@/pages/login/login'
import MyOrder from '@/pages/myOrder/myOrder'
import Nearby from '@/pages/nearby/nearby'
import OptSales from '@/pages/optSales/optSales'
import OrderAideDetail from '@/pages/orderAideDetail/orderAideDetail'
import OrderDetail from '@/pages/orderDetail/orderDetail'
import PersonalCenter from '@/pages/personalCenter/personalCenter'
import Prescription from '@/pages/prescription/prescription'
import Register from '@/pages/register/register'
import ReplacePhone from '@/pages/replacePhone/replacePhone'
import Replenishment from '@/pages/replenishment/replenishment'
import ShoppingCar from '@/pages/shoppingCar/shoppingCar'
import Signatory from '@/pages/signatory/signatory'

import Receive from '@/pages/ryTest/receive'
import Send from '@/pages/ryTest/send'
import Repairman from '@/pages/repairman/repairman'
import StartStore from '@/pages/startStore/startStore'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',//目录页 用作查看已做的页面
      name: 'directory',
      component: Directory,
      meta: {
        title: '用作查看已做的页面'
      }
    },
    {
      path: '/bindPhone',//绑定手机
      name: 'bindPhone',
      component: BindPhone,
      meta: {
        title: '绑定手机'
      }
    },
    {
      path: '/optSales/',//选择售货机
      name: 'optSales',
      component: OptSales,
      meta: {
        title: '选择售货机'
      }
    },
    {
      path: '/drugDetail/',//药柜详情
      name: 'drugDetail',
      component: DrugDetail,
      meta: {
        title: '药柜详情'
      }
    },
    {
      path: '/commodityDetail/',//商品详情
      name: 'commodityDetail',
      component: CommodityDetail,
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/personalCenter',//个人中心
      name: 'personalCenter',
      component: PersonalCenter,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/orderDetail/',//订单详情
      name: 'orderDetail',
      component: OrderDetail,
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/shoppingCar/',//购物车
      name: 'shoppingCar',
      component: ShoppingCar,
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/finalOrder/',//确认订单
      name: 'finalOrder',
      component: FinalOrder,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/myOrder',//我的订单
      name: 'myOrder',
      component: MyOrder,
      meta: {
        title: '我的订单'
      }
    },
    {
      path: '/cabinetDetail',//柜子详情
      name: 'cabinetDetail',
      component: CabinetDetail,
      meta: {
        title: '柜子详情'
      }
    },
    {
      path: '/prescription',//处方单
      name: 'prescription',
      component: Prescription,
      meta: {
        title: '处方单'
      }
    },
    {
      path: '/nearby',//地图 查询附近机器
      name: 'nearby',
      component: Nearby,
      meta: {
        title: '查询附近机器'
      }
    },
    {
      path: '/agreement',//使用协议
      name: 'agreement',
      component: Agreement,
      meta: {
        title: '使用协议'
      }
    },
    {
      path: '/replacePhone/',//手机换绑
      name: 'replacePhone',
      component: ReplacePhone,
      meta: {
        title: '手机换绑'
      }
    },
    {
      path: '/faultRepair',//故障报修
      name: 'faultRepair',
      component: FaultRepair,
      meta: {
        title: '故障报修'
      }
    },
    {
      path: '/faultRepair2',//故障报修
      name: 'faultRepair2',
      component: FaultRepair2,
      meta: {
        title: '故障报修2'
      }
    },
    {
      path: '/aboutUs',//关于我们
      name: 'aboutUs',
      component: AboutUs,
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/replenishment',//补货员登录
      name: 'replenishment',
      component: Replenishment,
      meta: {
        title: '补货员登录'
      }
    },
    {
      path: '/chatOnline',//在线聊天
      name: 'chatOnline',
      component: ChatOnline,
      meta: {
        title: '在线聊天'
      }
    },
    {
      path: '/chatOnline2',//在线聊天
      name: 'chatOnline2',
      component: ChatOnline2,
      meta: {
        title: '在线聊天'
      }
    },
    {
      path: '/signatory', //签字
      name: 'signatory',
      component: Signatory,
      meta: {
        title: '签字'
      }
    },
    {
      path: '/applyAide', //申请护工
      name: 'applyAide',
      component: ApplyAide,
      meta: {
        title: '申请护工'
      }
    },
    {
      path: '/bookAide', //预约护工
      name: 'bookAide',
      component: BookAide,
      meta: {
        title: '预约护工'
      }
    },
    {
      path: '/choiceDepartment', //选择科室
      name: 'choiceDepartment',
      component: ChoiceDepartment,
      meta: {
        title: '选择科室'
      }
    },
    {
      path: '/aideGenre', //请选择护工分类
      name: 'aideGenre',
      component: AideGenre,
      meta: {
        title: '请选择护工分类'
      }
    },
    {
      path: '/aideOrder', //护工下单
      name: 'aideOrder',
      component: AideOrder,
      meta: {
        title: '下单'
      }
    },
    {
      path: '/deviceProbing', //设备检测
      name: 'deviceProbing',
      component: DeviceProbing,
      meta: {
        title: '设备检测'
      }
    },
    {
      path: '/evaluate', //评价
      name: 'evaluate',
      component: Evaluate,
      meta: {
        title: '评价'
      }
    },
    {
      path: '/aideList', //护工订单
      name: 'aideList',
      component: AideList,
      meta: {
        title: '护工订单'
      }
    },
    {
      path: '/orderAideDetail', //护工订单详情
      name: 'orderAideDetail',
      component: OrderAideDetail,
      meta: {
        title: '护工订单详情'
      }
    },
    {
      path: '/giftDrug', //赠药列表
      name: 'giftDrug',
      component: GiftDrug,
      meta: {
        title: '赠药列表'
      }
    },
    {
      path: '/deviceList', //设备列表
      name: 'deviceList',
      component: DeviceList,
      meta: {
        title: '设备列表'
      }
    },
    {
      path: '/send', //发送
      name: 'send',
      component: Send,
      meta: {
        title: '发送'
      }
    },
    {
      path: '/receive', //接收
      name: 'receive',
      component: Receive,
      meta: {
        title: '接收'
      }
    },
    {
      path: '/repairman', //维修员
      name: 'repairman',
      component: Repairman,
      meta: {
        title: '维修员'
      }
    },
    {
      path: '/startStore', //激活设备
      name: 'startStore',
      component: StartStore,
      meta: {
        title: '激活设备'
      }
    },
    {
      path: '/login', //登录
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register', //注册
      name: 'register',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/changePassword', //修改密码
      name: 'changePassword',
      component: ChangePassword,
      meta: {
        title: '修改密码'
      }
    }
  ]
})
