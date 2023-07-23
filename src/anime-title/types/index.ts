import { ApiProperty } from '@nestjs/swagger';

class AnimeTitle {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Бездомный бог' })
  name: string;

  @ApiProperty({
    example: 'Ято бродячий японский бог, недавно лишившийся абсолютно всего...',
  })
  description: string;

  @ApiProperty({
    example:
      '["Комедия", "Приключения", "Сверхъестественное", "Сёнэн", "Экшен"]',
  })
  genre: string;

  @ApiProperty({ example: 8.9 })
  rating: number;

  @ApiProperty({ example: 'Bones' })
  studio: string;

  @ApiProperty({ example: 'Завершён' })
  status: string;

  @ApiProperty({ example: 12 })
  episodes: number;

  @ApiProperty({ example: '05/01/2014' })
  dateRelease: string;

  @ApiProperty({ example: '05/01/2014' })
  originalName: string;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: 100 })
  popularity: number;

  @ApiProperty({ example: '["https://clck.ru/34x8z3"]' })
  images: string;

  @ApiProperty({ example: '2023-07-11T11:29:28.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-07-11T11:29:28.000Z' })
  updatedAt: string;
}

class AnimeTitleEpisodes {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Домашний кот, бездомный бог и хвостик' })
  name: string;

  @ApiProperty({ example: 1 })
  episode: number;

  @ApiProperty({
    example: '//kodik.info/seria/736697/a20ffe7211a5f68176fb8fdd533b75d1/720p',
  })
  url: string;

  @ApiProperty({ example: 'Reanimedia' })
  voiceover: string;

  @ApiProperty({ example: 'Бездомный бог' })
  anime: string;

  @ApiProperty({ example: '05/01/2014' })
  dateRelease: string;
}

export class GetAllAnimeTitlesResponce {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: AnimeTitle, isArray: true })
  rows: AnimeTitle;
}

class NewAnimeTitles extends AnimeTitle {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewAnimeTitlesResponce {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: NewAnimeTitles, isArray: true })
  rows: NewAnimeTitles;
}

export class GetAnimeTitlesBySearchRequet {
  @ApiProperty({ example: 'бог' })
  search: string;
}

export class GetAnimeTitlesBySearchResponse extends AnimeTitle {}

export class GetOneTitleRequest {
  @ApiProperty({ example: 'Бездомный бог' })
  name: string;
}

export class GetOneTitleResponse extends AnimeTitle {}

export class GetOneTitleWithEpisodesRequest {
  @ApiProperty({ example: 'Бездомный бог' })
  name: string;
}

class AnimeTitleEpisodesWithCount {
  @ApiProperty({ example: 1 })
  count: number;

  @ApiProperty({ type: AnimeTitleEpisodes, isArray: true })
  rows: AnimeTitleEpisodes;
}

export class GetOneTitleWithEpisodesResponse {
  @ApiProperty({ type: AnimeTitle })
  anime: AnimeTitle;

  @ApiProperty({ type: AnimeTitleEpisodesWithCount })
  episodes: AnimeTitleEpisodesWithCount;
}
