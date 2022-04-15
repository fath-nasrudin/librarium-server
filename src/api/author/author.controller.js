const Author = require('../../models/author');
const { Api500Error, Api400Error, Api404Error } = require('../../utils/error');

class AuthorController {
  static async getAuthors(req, res, next) {
    try {
      const authors = await Author.find();
      if (!authors) throw new Api500Error();
      res.status(200).send({ authors });
    } catch (error) {
      next();
    }
  }

  static async createAuthor(req, res, next) {
    try {
      let { name } = req.body;

      // validate
      if (!name) throw new Api400Error('All required fields need to be filled');
      name = name.toLowerCase();

      const createdAuthor = await Author.create({ name });

      if (!createdAuthor) throw new Api500Error();

      res.status(201).send({ author: createdAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async updateAuthor(req, res, next) {
    const { id } = req.query;
    let { name } = req.body;

    try {
      // validate
      if (!name) throw new Api400Error('All required fields need to be filled');
      if (!id) throw new Api400Error('missed "id" field in query');

      name = name.toLowerCase();

      const updatedAuthor = await Author.findByIdAndUpdate(id, { name }, { returnDocument: 'after' });

      if (!updatedAuthor) throw new Api404Error('Author not found');

      res.send({ author: updatedAuthor });
    } catch (error) {
      next(error);
    }
  }

  static async deleteAuthor(req, res, next) {
    const { id } = req.query;

    try {
      // validate
      if (!id) throw new Api400Error('missed "id" field in query');

      await Author.findByIdAndDelete(id);
      res.send({ id });
    } catch (error) {
      next();
    }
  }
}

module.exports = AuthorController;
