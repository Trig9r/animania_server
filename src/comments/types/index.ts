import { ApiProperty } from '@nestjs/swagger';

class Comment {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 5 })
  userId: number;

  @ApiProperty({ example: 'Trigger' })
  nickname: string;

  @ApiProperty({ example: 'Бездомный бог' })
  animeTitle: string;

  @ApiProperty({ example: 'Вау! Замечательное аниме, я в восторге!' })
  text: string;

  @ApiProperty({ example: '2023-07-13T13:27:38.975Z' })
  updatedAt: string;

  @ApiProperty({ example: '2023-07-13T13:27:38.975Z' })
  createdAt: string;
}

export class GetAllCommentByAnimeTitleResponse {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: Comment, isArray: true })
  rows: Comment;
}

export class AddNewCommentRequest {
  @ApiProperty({ example: 5 })
  userId: number;

  @ApiProperty({ example: 'Вау! Замечательное аниме, я в восторге!' })
  text: string;
}

export class AddNewCommentResponse extends Comment {}

export class CommentsQueryProps {
  limit: string;
  offset: string;
}
