import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import {
  AddNewCommentRequest,
  AddNewCommentResponse,
  GetAllCommentByAnimeTitleResponse,
} from './types';

@Controller('comments')
@ApiTags('Comments 💬')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOkResponse({ type: GetAllCommentByAnimeTitleResponse })
  @Get(':animeTitle')
  getAll(@Param('animeTitle') animeTitle: string, @Query() query) {
    return this.commentsService.paginateAndFilter(animeTitle, query);
  }

  @ApiBody({ type: AddNewCommentRequest })
  @ApiOkResponse({ type: AddNewCommentResponse })
  @UseGuards(AuthenticatedGuard)
  @Post('/add/:animeTitle')
  addNewComment(
    @Body() { userId, text }: { userId: number; text: string },
    @Param('animeTitle') animeTitle: string,
  ) {
    return this.commentsService.addNewCommentForAnimeTitle(
      animeTitle,
      userId,
      text,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/one/:commentId')
  removeOne(@Param('commentId') commentId: string) {
    return this.commentsService.deleteOne(commentId);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/all/:userId')
  removeAll(@Param('userId') userId: string) {
    return this.commentsService.deleteAll(userId);
  }
}
