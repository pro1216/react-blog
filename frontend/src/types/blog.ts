export type Blog = {
    id: number;
    title: string;
    mainText: string;
    create_time:Date;
    update_time:Date;
}
export interface FormData {
    _id?: string;
    name: string;
    email: string;
    message: string;
    create_time:Date;
    update_time:Date;
}