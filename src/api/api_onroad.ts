import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    Order: {
        getOnWayOrderList: function (
            orderId: string,
            status: string,
            origin: string,
            destination: string,
            skip: number,
            count: number,
        ) {
            return Get("Order/getOnWayOrderList?orderid=" + orderId + "&status=" + status + "&origin=" + origin + "&destination=" + destination + "&skip=" + skip + "&count=" + count,{})
        },
        // getCspOrder: function (id) {
        //     return Get("CspOrder/getCspOrder/" + id,{})
        // },
        // addCspOrder: function (obj) {
        //     return Post("CspOrder/addCspOrder",obj)
        // },//attention
        // editCspOrder: function (id) {
        //     return Put("CspOrder/editCspOrder/" + id,{})
        // },
        // deleteCspOrder: function (id) {
        //     return Delete("CspOrder/deleteCspOrder/" + id,{})
        // },
        // getCspOrderCount:function(){
        //     return Get("CspOrder/GetCspOrderCount",{})
        // }
    },
}
