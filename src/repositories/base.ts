import mongoose from "mongoose";

export default abstract class BaseRepository<T> {
  private _model: mongoose.Model<T>;
  constructor(model: mongoose.Model<T>) {
    this._model = model;
  }

  async findAll() {
    const res = await this._model.find();
    return res;
  }

  async findOne(query: T) {
    const res = await this._model.findOne(query);
    return res;
  }

  async create(newItem: T) {
    const res = await this._model.create(newItem);
    return res;
  }
}
