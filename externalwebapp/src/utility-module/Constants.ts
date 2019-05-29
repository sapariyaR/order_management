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
}
