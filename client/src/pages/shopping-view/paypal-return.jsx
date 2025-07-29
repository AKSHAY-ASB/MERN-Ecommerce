import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/redux/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturnPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const PayerId = params.get('PayerID');

    useEffect(()=>{
        if(paymentId && PayerId){
            const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
            dispatch(capturePayment({paymentId,PayerId,orderId})).then(data => {
                if(data.payload.success){
                    sessionStorage.removeItem('currentOrderId');
                    window.location.href = "/shop/payment-success"
                }
            })
        }
    },[paymentId,PayerId,dispatch]);


    return(
        <Card>
            <CardHeader>
                <CardTitle>Processing payment ........please wait</CardTitle>
            </CardHeader>
        </Card>
    )
}

export default PaypalReturnPage;