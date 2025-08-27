import { Category } from "@/models/category-model";
import { replaceMongoIdInArray } from "@/lib/convertData";

export async function getAllCategories() {
  const allCategory = await Category.find({}).lean();

  return replaceMongoIdInArray(allCategory);
}
