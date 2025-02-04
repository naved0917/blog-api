import { Injectable } from '@nestjs/common';
import { Auth, LooseObject } from './auth.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel("Auth")
        private readonly model: Model<Auth>,
        private jwtService: JwtService,

    ) { }

    async signIn(payload: any) {
        console.log('payload', payload);
        const queryResult = await this.model.findOne({ email: payload.username }).exec();
        if (queryResult?.email !== payload?.username) {
            console.log();

            return {
                code: 400,
                status: 'error',
                message: "Invalid Credentials.",
                data: {},
            };
        }

        if (!queryResult) {
            return {
                code: 400,
                status: 'error',
                message: "User Not Found.",
                data: {},
            };
        } else {
            if (queryResult?.password == payload.password) {
                const payload = {
                    _id: queryResult?._id,
                    firstName: queryResult?.firstName,
                    lastName: queryResult?.lastName,
                    email: queryResult?.email,
                    phone: queryResult?.phone,
                    userType: queryResult?.userType,
                    password: queryResult?.password
                };
                return {
                    code: 200,
                    status: 'success',
                    message: "User Sign In Successfully.",
                    data: {
                        jwt: this.jwtService.sign(payload),
                        ...payload,
                    }
                }
            } else {
                return {
                    code: 400,
                    status: 'error',
                    message: "Invalid Password.",
                    data: {}
                };
            }
        }
    }

}