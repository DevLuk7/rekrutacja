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

  const toShowOnHome: number[] = data.reduce((acc, category) => {
    if (category.Title && category.Title.includes('#')) {
      acc.push(category.id);
    }
    return acc;
  }, [] as number[]);

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

  const result = convertCategories(data);

  if (result.length <= 5) {
    result.forEach((a) => (a.showOnHome = true));
  } else if (toShowOnHome.length > 0) {
    result.forEach((x) => (x.showOnHome = toShowOnHome.includes(x.id)));
  } else {
    result.forEach((x, index) => (x.showOnHome = index < 3));
  }

  return result;
};
