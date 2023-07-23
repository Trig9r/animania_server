import { Injectable } from '@nestjs/common';
import { Comment } from './comments.model';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CommentsQueryProps } from './types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
    private readonly usersService: UsersService,
  ) {}

  async paginateAndFilter(
    animeTitle: string,
    query: CommentsQueryProps,
  ): Promise<{ count: number; rows: Comment[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;

    return this.commentModel.findAndCountAll({
      limit,
      offset,
      where: { animeTitle },
    });
  }

  async addNewCommentForAnimeTitle(
    animeTitle: string,
    nickname: string | number,
    text: string,
  ): Promise<Comment> {
    const comment = new Comment();

    const user = await this.usersService.findOne({ where: { id: nickname } });

    comment.userId = user.id;
    comment.nickname = user.nickname;
    comment.animeTitle = animeTitle;
    comment.text = text;

    return comment.save();
  }

  async deleteOne(commentId: number | string): Promise<void> {
    const comment = await this.commentModel.findOne({
      where: { id: commentId },
    });

    await comment.destroy();
  }

  async deleteAll(userId: number | string): Promise<void> {
    await this.commentModel.destroy({ where: { userId } });
  }
}
