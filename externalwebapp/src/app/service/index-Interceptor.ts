import { InterceptedHttp } from './InterceptedHttp';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

/** Http interceptor providers in outside-in order */
export const HttpInterceptors = [
  {provide: HTTP_INTERCEPTORS, useClass: InterceptedHttp, multi: true}
];
