import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  autor: string;

  @ValidateIf((e) => e.countView)
  countView: number;

  @ValidateIf((e) => e.cover)
  cover?: string;
}
