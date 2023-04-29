import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class EditNewsDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((e) => e.title)
  title: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((e) => e.description)
  description: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((e) => e.autor)
  autor: string;

  @IsNumber()
  @IsNotEmpty()
  @ValidateIf((e) => e.countView)
  countView: number;

  @ValidateIf((e) => e.cover)
  cover?: string;
}
