import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './blog.schema';

@Injectable()
export class BlogService {
    constructor(
        @InjectModel('Blog')
        private readonly model: Model<Blog>,
    ) { }

    async create(payload) {
        const Blog = new this.model(payload);
        const queryResult = await Blog.save();
        return {
            code: 200,
            status: 'success',
            message: 'Blog Added Successfully.',
            data: queryResult,
        };
    }

    async getBlogList() {
        const queryResult = await this.model.find().exec();
        return {
            code: queryResult ? 200 : 400,
            status: queryResult ? 'success' : 'error',
            message: queryResult?.length > 0 ? 'Blogs list get Successfully.' : 'No records found!',
            data: queryResult ? queryResult : [],
        };
    }

    async getBlogById(_id) {
        const queryResult = await this.model.findOne({ "_id": _id })
        return {
            code: queryResult ? 200 : 400,
            status: queryResult ? 'success' : 'error',
            message: queryResult ? 'Blog get Successfully.' : 'Blog  Not Found .',
            data: queryResult ? queryResult : {},
        };
    }

    async updateBlog(payload: any) {
        const queryResult = await this.model.updateOne({ _id: payload._id }, payload);
        return {
            code: queryResult ? 200 : 400,
            status: queryResult ? 'success' : 'error',
            message: queryResult ? 'Blog Updated Successfully.' : 'Blog Not Updated .',
            data: queryResult ? queryResult : {},
        };
    }

    async deleteBlog(_id: any) {
        const queryResult = await this.model.deleteOne({ _id: _id });
        const isDeleted = queryResult.deletedCount !== 0;
        return {
            code: queryResult ? 200 : 400,
            status: queryResult ? 'success' : 'error',
            message: isDeleted ? 'Blog Deleted Successfully.' : 'Blog Not Deleted .',
            data: queryResult ? queryResult : {},
        };
    }
}
