import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth.guard';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Post('/add')
    @UseGuards(JwtAuthGuard)
    async addBlog(
        @Body() payload: {},
    ) {
        return await this.blogService.addBlog(payload);
    }

    @Get('/get-list')
    // @UseGuards(JwtAuthGuard)
    async getBlogList() {
        return await this.blogService.getBlogList();
    }

    @Get('/get/:_id')
    @UseGuards(JwtAuthGuard)
    async getBlogById(@Param('_id') _id: string) {
        return await this.blogService.getBlogById(_id);
    }

    @Post('/update')
    @UseGuards(JwtAuthGuard)
    async updateBlog(
        @Body() payload: {},
    ) {
        return await this.blogService.updateBlog(payload);
    }

    @Delete('/delete/:_id')
    @UseGuards(JwtAuthGuard)
    async deleteBlog(@Param('_id') _id: string) {
        return await this.blogService.deleteBlog(_id);
    }
}
