import {
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export enum DocumentType {
  PASSPORT = "passport",
  DRIVING_LICENSE = "driving-license",
  NATIONAL_ID_CARD = "national-id-card",
  SOCIAL_SECURITY_NUMBER = "social-security-number",
}

export class EditUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastName: string;

  @IsOptional()
  file: any;
}

export class updatePaymentMethodDTO {
  @IsString()
  setup_intent: String;

  @IsString()
  status: String;
}

export class muatateSubscriptiondDTO {
  @IsString()
  priceID: String;
}
