import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    create(@Body() payload: any) {
        return this.blogService.create(payload);
    }

    @Get('/getById/:id')
    @UseGuards(AuthGuard('jwt'))
    getBlog(@Param('id') id: number) {
        return this.blogService.getBlogById(id);
    }

    @Get('/get')
    getBlogList() {
        return this.blogService.getBlogList();
    }

    @Post('/update')
    @UseGuards(AuthGuard('jwt'))
    update(@Body() payload: any) {
        return this.blogService.updateBlog(payload);
    }

    @Get('/delete/:id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id') id: number) {
        return this.blogService.deleteBlog(id);
    }
}