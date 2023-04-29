import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class EditCommentDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((e) => e.message)
  message: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((e) => e.author)
  author: string;
}
