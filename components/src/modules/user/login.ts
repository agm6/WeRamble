import{Resolver, Mutation, Arg, Ctx} from 'type-graphql';
import bycrypt from "bcryptjs";
import {User} from "../../entity/User";
import{appContext} from "../../types/appContext";

@Resolver()
export class LoginResolver {
    @Mutation(() => User, {nullable: true})
    aysnc login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: appContext
    ):  Promise<User | null> {

        const user = await User.findOne({where: {email}});

        if(!user) {
            return null;
        }

        const valid = await bycrypt.compare(password, user.password);
        
        if(!valid) {

            return null;
        }

        if(!user.confirmed) {

            return null;
        }

        ctx.req.session!.userId = user.id;

        return user;
    }
}
