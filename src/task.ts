import { Category } from './mockedApi';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

export const categoryTree = async (
  data: Category[]
): Promise<CategoryListElement[]> => {
  if (!Array.isArray(data)) {
    return [];
  }

  const sortByOrder = (a: CategoryListElement, b: CategoryListElement) =>
    a.order - b.order;

  const extractOrderFromTitle = (category: Category): number => {
    const match = category.Title.match(/^\d+/);
    return match ? parseInt(match[0], 10) : category.id;
  };

  const convertCategories = (input: Category[]): CategoryListElement[] => {
    return input
      .map((item) => ({
        id: item.id,
        name: item.name,
        order: extractOrderFromTitle(item),
        image: item.MetaTagDescription || '',
        showOnHome: false,
        children: convertCategories(item.children),
      }))
      .sort(sortByOrder);
  };

  const setShowOnHome = (
    categories: CategoryListElement[],
    toShowOnHome: number[]
  ): void => {
    if (categories.length <= 5) {
      categories.forEach((category) => (category.showOnHome = true));
    } else if (toShowOnHome.length > 0) {
      categories.forEach(
        (category) => (category.showOnHome = toShowOnHome.includes(category.id))
      );
    } else {
      categories.forEach(
        (category, index) => (category.showOnHome = index < 3)
      );
    }
  };

  const toShowOnHome: number[] = data.reduce((acc, category) => {
    if (category.Title && category.Title.includes('#')) {
      acc.push(category.id);
    }
    return acc;
  }, [] as number[]);

  const result = convertCategories(data);

  setShowOnHome(result, toShowOnHome);

  return result;
};
