export class User {
  constructor(
    public _id?: String,
    public url?: String,
    public images?: [],
    public title?: String,
    public title_english?: String,
    public title_japanese?: String,
    public type?: String,
    public chapters?: Number,
    public volumes?: Number,
    public status?: String,
    public synopsis?: String,
    public littleText?: String, // background - texto representativo
    public published?: [],
    public score?: String,
    public characters?: [],
    public genres?: [],
    public authors?: [],
  ) {}
}
