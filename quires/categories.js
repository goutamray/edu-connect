import { Category } from "@/models/category-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";

/**
 *
 * @returns
 */
export async function getAllCategories() {
  const allCategory = await Category.find({}).lean();

  return replaceMongoIdInArray(allCategory);
}

/**
 *
 * @param {*} categoryId
 * @returns
 */
export async function getCategoryById(categoryId) {
  try {
    const category = await Category.findById(categoryId).lean();

    return replaceMongoIdInObject(category);
  } catch (error) {
    throw new Error(error);
  }
}
