export type User = {

    id?: number,
    firstName: string,
    lastName: string,
    userName: string,
    gender: string,
    birthday: string,
    phoneNumber: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date

}

export type Video = {

    id?: number,
    title: string,
    description: string,
    createdAt?: Date,
    updatedAt?: Date,
    src: string,
    userId: number

}

export type Category = {
    id? :number,
    name: string
}