import axios from "axios";
import { UIStore } from "./store";

axios.defaults.baseURL = 'https://lms.software-demo.in/admin/api/v1/'

export const getMessageType = () => {
    const messageTypeAPI = 'web/contact/get-enquiry-types';
    axios.get(messageTypeAPI).then((res) => {
        const enqTypes = res.data.data.enquiryTypes;
        UIStore.update(s => {
            s.enquiryTypes = enqTypes;
        })
    })
}

export const getAddress = () => {
    const addressAPI = 'web/contact/get-address';
    axios.get(addressAPI).then((res) => {
        const address = res.data.data.contact;
        UIStore.update((s) => {
            s.contactAddress = address;
        })
    })
}


export const sendMessage = (data) => {
    const sendMessageAPI = 'web/contact/save-enquiry';
    return axios.post(sendMessageAPI, {data}).then((res) => {
        console.log('errorRes', res)
        return res.status;
    }).catch((er) => { console.log('error', er) })
}