import axios, { AxiosError } from "axios";
import { CategoryApi } from "./CategoryApi";
import { ContentApi } from "./ContentApi";
import { DiaryApi } from "./DiaryApi";
import { MemberApi } from "./MemberApi";
import { Authentication } from "../Authentication";

const accessToken = localStorage.getItem('accessToken');
const baseAxios = axios.create({
    withCredentials: true
});

export const categoryApi = new CategoryApi();
export const contentApi = new ContentApi();
export const diaryApi = new DiaryApi();
export const memberApi = new MemberApi();
const auth = new Authentication();

export async function GET(url:string, data:any){
    try {
        const res = await baseAxios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: data,
        });
        const result = res.data;
        return result;
    } catch (error) {
        if ((error as AxiosError).isAxiosError && (error as AxiosError).message === 'Network Error') {
        auth.login();
        }
        throw error;
    }
}


export async function POST(url:string, data:any,){
    try {
        const response = await baseAxios.post(url, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data; // POST 요청의 결과 값을 반환
    } catch (error) {
        if ((error as AxiosError).isAxiosError && (error as AxiosError).message === 'Network Error') {
            auth.login();
        }
        throw error; // 에러를 다시 던져서 상위 코드에서 처리할 수 있도록 함
    }
}

export async function PUT(url:string, data:any){
    try {await baseAxios.put(url, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        data:data
    }).then((res)=>{
        const result = res.data;
        return result;
    })} catch (error) {
        if ((error as AxiosError).isAxiosError && (error as AxiosError).message === 'Network Error') {
            auth.login();
        }
        throw error;
    }
}

export async function DELETE(url:string, data:any){
    try { await baseAxios.delete(url, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
      data:data
  }).then((res)=>{
      const result = res.data;
      return result;
  })} catch (error) {
        if ((error as AxiosError).isAxiosError && (error as AxiosError).message === 'Network Error') {
            auth.login();
        }
        throw error;
    }
}