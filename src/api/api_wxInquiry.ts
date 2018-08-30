import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    CspInquiry: {
        getCspInquiryList: function (
            CspInquiryCode: string,
            CspInquiryChildCode: string,
            status: string,
            startTime: string,
            endTime: string,
            startAddress: string,
            endAddress: string,
            skip: number,
            count: number
        ) {
            return Get( "CspInquiry/getCspInquiryList?cspinquirycode=" + CspInquiryCode + "&cspInquirychildcode=" + CspInquiryChildCode + '&status=' + status + '&startTime=' + startTime + '&endTime=' + endTime + '&startAddress=' + startAddress + '&endAddress=' + endAddress + '&skip=' + skip + '&count=' + count,{})
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
    Inquiry:{
        getInquiryList: function (
            inquiryId: string,
            inquiryChildId: string,
            Origin: string,
            Destination: string,
            status: string,
            begin: string,
            end: string,
            skip: number,
            count: number
        ) {
            return Get( "Inquiry/getInquiryList?inquiryid=" + inquiryId + "&inquirychildid=" + inquiryChildId + "&Origin=" + Origin + "&Destination=" + Destination + "&status=" + status + "&begin=" + begin + "&end=" + end + "&skip=" + skip + "&count=" + count,{})
        },
    } 
}
