import mongoose, { Schema } from "mongoose";
import { usertype } from "src/types/user.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema<usertype>({
    profile_info: {
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            select: false
        },
        profile_img: {
            url: {
                type: String,
            },
            publicId: {
                type: String
            }
        },
        cover_img: {
            url: {
                type: String,
            },
            publicId: {
                type: String
            }
        },
        bio: {
            type: String,
            trim: true
        }
    },
    account_info: {
        total_posts: {
            type: Number,
            default: 0
        },
        total_reads: {
            type: Number,
            default: 0
        },
        total_likes: {
            type: Number,
            default: 0
        }
    },
    social_links: {
        instagram: {
            type: String,
            default: "",
            trim: true
        },
        youtube: {
            type: String,
            default: "",
            trim: true
        },
        facebook: {
            type: String,
            default: "",
            trim: true
        },
        twitter: {
            type: String,
            default: "",
            trim: true
        },
        github: {
            type: String,
            default: "",
            trim: true
        },
        website: {
            type: String,
            default: "",
            trim: true
        }
    },
    bookmarks: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "posts"
        }],
        default: []
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    verification_code: {
        type: Number,
    },
    verification_code_expiry: {
        type: Date,
        default: null
    },
    posts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "posts"
        }],
        default: []
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("profile_info.password")) {
        return next()
    }
    this.profile_info.password = await bcrypt.hash(this.profile_info.password, 12);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.profile_info.password)
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.profile_img.email,
            username: this.profile_img.username,
        },
        process.env.ACCES_TOKEN_SECRET!,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.profile_img.email,
            username: this.profile_img.username,
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const Users = mongoose.model("Users", userSchema);