import { environment } from "environments/environment";

export class RouteConstants {
    public static LOGIN_ROUTE = 'home/login';
    public static INDEX_ROUTE = 'home/index';
    //public static REGISTER_ROUTE = 'home/register';
    public static DASHBOARD_ROUTE = "admin/dashboard";
    public static USER_PROFILE_ROUTE = "admin/user-profile";
    public static PAGE_NOT_FOUND = '404';
}

export class AppConstant{
    public static TOKEN = 'authorizationToken';
    public static USER = "user";
    public static ENCRYPTION_TOKEN = '';
    public static SNACKBAR_TIMEOUT = 4000;
}

export class APIConstant{
    public static LOGIN = environment.urlPrefix+'/oauth/token';
    public static CREATE_USER = environment.urlPrefix+'/api/user/create';
    public static VALIDATE_TOKEN = environment.urlPrefix+'/api/user/token/validate';
    public static GET_ALL_USER = environment.urlPrefix+'/api/user/all';
    public static DELETE_USER = environment.urlPrefix+'/api/user/';
    public static RESET_PASSWORD = environment.urlPrefix+'/api/user/resetpassword';
    public static SEND_INVITATION = environment.urlPrefix+'/api/user/sendinvitation';

    public static CREATE_CLIENT = environment.urlPrefix+'/api/client/create';
    public static CLIENT_COUNT_DETAILS = environment.urlPrefix+'/api/client/count';
    public static GET_ALL_CLIENT = environment.urlPrefix+'/api/client/all';
    public static DELETE_CLIENT = environment.urlPrefix+'/api/client/';
    public static GET_ALL_CLIENT_BY_NAME = environment.urlPrefix+'/api/client/all/name';

    public static CREATE_ORDER = environment.urlPrefix+'/api/order/create';
    public static GET_ALL_ORDER = environment.urlPrefix+'/api/order/all';
    public static UPDATE_ORDER_STATUS = environment.urlPrefix+'/api/order/updatestatus';
    public static GET_CLIENT_ORDER_COUNT_DETAILS = environment.urlPrefix+'/api/order/client/orderdetails';
    public static GET_ORDER_BY_ID = environment.urlPrefix+'/api/order/order';
    public static DELETE_ORDER = environment.urlPrefix+'/api/order/';
    public static GET_ORDER_TIMELINE = environment.urlPrefix+'/api/order/timeline';
    public static GET_ALL_ORDER_HISTORY = environment.urlPrefix+'/api/order/all/history';
}
