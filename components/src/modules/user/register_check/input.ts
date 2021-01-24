import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { email_exist } from "./email_exist";

@InputType()
export class input {

    @Field()
    @Length(1, 255) 
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @email_exist({message: "that email is already in use"})
    email: string;

    @Field()
    password: string;
}

