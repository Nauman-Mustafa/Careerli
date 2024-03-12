import { Document, Schema } from "mongoose";
export interface IUserDocument extends Document {
  email: string;
  password: string;
  avatar?: string;
  roles: Array<string>;
  about: string;
  firstName: string;
  lastName: string;
  isActive?: boolean;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  downloadAuthority: {
    cv: number;
    coverLetter: number;
  };
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },

    roles: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    emailVerified: {
      type: Boolean,
      default: true,
    },
    
    deletedAt: Date,
    downloadAuthority: {
      cv: { type: Number, default: 0 },
      coverLetter: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// UserSchema.pre('save', (next: any, done: any) => {
//     this.password = bcrypt.hashSync(signupDto.password, jwtConstants.salt)
//     return next();
// })
UserSchema.methods.toJSON = function () {
  var obj: any = this.toObject();
  delete obj.password;
  return obj;
};

export interface IForgetPasswordDocument extends Document {
  code: string;
  email: string;
  readonly createdAt: Date;
}

const ForgetPasswordSchema = new Schema({
  email: String,
  code: String,
  createdAt: { type: Date, default: Date.now },
});

export { UserSchema, ForgetPasswordSchema };
