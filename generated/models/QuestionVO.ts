/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JudgeConfig } from './JudgeConfig';
import type { UserVO } from './UserVO';
export type QuestionVO = {
    acceptNum?: number;
    answer?: string;
    content?: string;
    favourNum?: number;
    id?: number;
    judgeConfig?: Array<JudgeConfig>;
    submitNum?: number;
    tags?: Array<string>;
    thumbNum?: number;
    title?: string;
    userId?: number;
    userVO?: UserVO;
};
