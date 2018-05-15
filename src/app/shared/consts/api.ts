import { environment } from '../../../environments/environment';

const baseUrl = environment.host + '/' + environment.version;
const uploadBaseUrl = environment.uploadHost + '/' + environment.version;

export const API: any = {
  url: {
    base: baseUrl,
    signUp: baseUrl + '/signUp',
    signIn: baseUrl + '/signIn',
    resetPassword: baseUrl + '/resetPassword',
    getUserDetails: baseUrl + '/getUserDetails',
    getCloudFolder: baseUrl + '/getCloudFolder',
    getCloudPhotos: baseUrl + '/getCloudPhotos',
    deleteCloudPhoto: baseUrl + '/deleteCloudPhoto',
    deleteAllCloudPhotos: baseUrl + '/deleteAllCloudPhotos',
    uploadCloud: environment.uploadHost + '/uploadCloud.php',
    uploadPDF: environment.uploadHost + '/uploadpdf_v2.php',
    setUserDetails: baseUrl + '/setUserDetails',
    getSubscriptionList: baseUrl + '/getSubscriptionList',
    setSubscriptionUser: baseUrl + '/setSubscriptionUser',
    checkPayment: baseUrl + '/checkPayment',
    setUpload: uploadBaseUrl + '/setUpload',
    getNotification: baseUrl + '/getNotification',
    checkSignUpGift: baseUrl + '/checkSignUpGift',
    signUpGift: baseUrl + '/signUpGift',
    addGift: baseUrl + '/addGift',
    addCopies: baseUrl + '/addCopies',
    uploadComplete: baseUrl + '/uploadComplete',
    getAddressInfo: baseUrl + '/getAddressInfo',
    rotateCloudPhoto: uploadBaseUrl + '/rotateCloudPhoto',
    getUploads: baseUrl + '/getUploads',
    imageScaleUrl: environment.imageScaleUrl
  }
}
