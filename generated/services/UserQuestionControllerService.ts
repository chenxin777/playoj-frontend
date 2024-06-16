/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_long_ } from '../models/BaseResponse_long_';
import type { BaseResponse_Page_UserQuestionVO_ } from '../models/BaseResponse_Page_UserQuestionVO_';
import type { QuestionSubmitQueryRequest } from '../models/QuestionSubmitQueryRequest';
import type { UserQuestionAddRequest } from '../models/UserQuestionAddRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserQuestionControllerService {
    /**
     * doUserQuestion
     * @param userQuestionAddRequest userQuestionAddRequest
     * @returns BaseResponse_long_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static doUserQuestionUsingPost(
        userQuestionAddRequest: UserQuestionAddRequest,
    ): CancelablePromise<BaseResponse_long_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_question/',
            body: userQuestionAddRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * listQuestionSubmitByPage
     * @param questionSubmitQueryRequest questionSubmitQueryRequest
     * @returns BaseResponse_Page_UserQuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitByPageUsingPost(
        questionSubmitQueryRequest: QuestionSubmitQueryRequest,
    ): CancelablePromise<BaseResponse_Page_UserQuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_question/list/page',
            body: questionSubmitQueryRequest,
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
