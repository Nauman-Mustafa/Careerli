import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';

export class CreateOrganizationDto {
    @MinLength(3)
    @MaxLength(40)
    name: string;
}

export class ChangeUserStatusDto {
    @IsNotEmpty()
    userID: string;

    @IsNotEmpty()
    status: string;
}

export class SearchOrganizationDto {
    @IsOptional()
    name = '';

    @IsOptional()
    status = 'published';

    @IsOptional()
    @IsNumberString()
    @Min(1)
    page = 1;

    @IsOptional()
    @IsNumberString()
    @Min(1)
    limit = 10;

    // sort=createAt
}
export class AddUserDTO {
    @IsEmail()
    email: string;

    @IsString()
    orgID: string;

    @IsOptional()
    @IsString()
    type: string;
}

export class GetMembersDTO {
    @IsOptional()
    @Min(1)
    page: string;

    @IsOptional()
    @Min(1)
    limit: string;

    @IsOptional()
    @IsBoolean()
    ascending: boolean;
}
