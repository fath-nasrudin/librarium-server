const Category = require('../../models/category');
const { Api500Error, Api400Error, Api404Error } = require('../../utils/error');

class CategoryController {
  static async getCategories(req, res, next) {
    try {
      const categories = await Category.find();
      if (!categories) throw new Api500Error();
      res.status(200).send({ categories });
    } catch (error) {
      next();
    }
  }

  static async createCategory(req, res, next) {
    let { name } = req.body;

    try {
      // validate
      if (!name) throw new Api400Error('All required fields need to be filled');
      name = name.toLowerCase();

      const createdCategory = await Category.create({ name });

      if (!createdCategory) throw new Api500Error();

      res.status(201).send({ category: createdCategory });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    const { id } = req.query;
    let { name } = req.body;

    try {
      // validate
      if (!name) throw new Api400Error('All required fields need to be filled');
      if (!id) throw new Api400Error('missed "id" field in query');

      name = name.toLowerCase();

      const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { returnDocument: 'after' });

      if (!updatedCategory) throw new Api404Error('Category not found');

      res.send({ category: updatedCategory });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    const { id } = req.query;

    try {
      // validate
      if (!id) throw new Api400Error('missed "id" field in query');

      await Category.findByIdAndDelete(id);
      res.send({ id });
    } catch (error) {
      next();
    }
  }
}

module.exports = CategoryController;
