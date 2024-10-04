import test from 'ava';

import { CORRECT } from './correctResult';
import { Category, getCategories } from './mockedApi';
import { categoryTree } from './task';

test('categoryTree should return data from currentResult.ts', async (t) => {
  const data = await getCategories();
  const result = await categoryTree(data.data);
  t.deepEqual(result, CORRECT);
});

test('categoryTree should return array', async (t) => {
  const result = await categoryTree({} as Category[]);
  t.deepEqual(result, []);
});

test('categoryTree should set showOnHome to true for all elements if array length is less than or equal to 5', async (t) => {
  const data: Category[] = [
    {
      id: 1,
      Title: '1#',
      children: [],
      MetaTagDescription: '',
      name: 'Test 1',
      hasChildren: false,
      url: '',
    },
    {
      id: 2,
      Title: '2#',
      children: [],
      MetaTagDescription: '',
      name: 'Test 2',
      hasChildren: false,
      url: '',
    },
    {
      id: 3,
      Title: '3#',
      children: [],
      MetaTagDescription: '',
      name: 'Test 3',
      hasChildren: false,
      url: '',
    },
    {
      id: 4,
      Title: '4#',
      children: [],
      MetaTagDescription: '',
      name: 'Test 4',
      hasChildren: false,
      url: '',
    },
    {
      id: 5,
      Title: '5#',
      children: [],
      MetaTagDescription: '',
      name: 'Test 5',
      hasChildren: false,
      url: '',
    },
  ];
  const result = await categoryTree(data);
  t.false(result.map((a) => a.showOnHome).includes(false));
});

test('categoryTree should set showOnHome to true for all elements with Title with hash', async (t) => {
  const data: Category[] = [
    {
      id: 1,
      Title: '1',
      children: [],
      MetaTagDescription: '',
      name: 'Test 1',
      hasChildren: false,
      url: '',
    },
    {
      id: 2,
      Title: '2',
      children: [],
      MetaTagDescription: '',
      name: 'Test 2',
      hasChildren: false,
      url: '',
    },
    {
      id: 3,
      Title: '3',
      children: [],
      MetaTagDescription: '',
      name: 'Test 3',
      hasChildren: false,
      url: '',
    },
    {
      id: 4,
      Title: '4',
      children: [],
      MetaTagDescription: '',
      name: 'Test 4',
      hasChildren: false,
      url: '',
    },
    {
      id: 5,
      Title: '5',
      children: [],
      MetaTagDescription: '',
      name: 'Test 5',
      hasChildren: false,
      url: '',
    },
    {
      id: 6,
      Title: '6#',
      children: [],
      MetaTagDescription: '',
      name: 'Test 6',
      hasChildren: false,
      url: '',
    },
  ];
  const result = await categoryTree(data);
  t.true(result.map((a) => a.showOnHome).includes(false));
  t.true(result.find((x) => x.id === 6).showOnHome);
  t.true(result.filter((a) => a.showOnHome).length === 1);
});

test('categoryTree should set showOnHome to true for idex less than 3', async (t) => {
  const data: Category[] = [
    {
      id: 1,
      Title: '1',
      children: [],
      MetaTagDescription: '',
      name: 'Test 1',
      hasChildren: false,
      url: '',
    },
    {
      id: 2,
      Title: '2',
      children: [],
      MetaTagDescription: '',
      name: 'Test 2',
      hasChildren: false,
      url: '',
    },
    {
      id: 3,
      Title: '3',
      children: [],
      MetaTagDescription: '',
      name: 'Test 3',
      hasChildren: false,
      url: '',
    },
    {
      id: 4,
      Title: '4',
      children: [],
      MetaTagDescription: '',
      name: 'Test 4',
      hasChildren: false,
      url: '',
    },
    {
      id: 5,
      Title: '5',
      children: [],
      MetaTagDescription: '',
      name: 'Test 5',
      hasChildren: false,
      url: '',
    },
    {
      id: 6,
      Title: '6',
      children: [],
      MetaTagDescription: '',
      name: 'Test 6',
      hasChildren: false,
      url: '',
    },
  ];
  const result = await categoryTree(data);
  t.true(result.map((a) => a.showOnHome).includes(false));
  t.false(
    result
      .filter((_, index) => index < 3)
      .map((a) => a.showOnHome)
      .includes(false)
  );
  t.true(
    result
      .filter((_, index) => index >= 3)
      .map((a) => a.showOnHome)
      .includes(false)
  );
  t.true(result[0].showOnHome);
  t.true(result[1].showOnHome);
  t.true(result[2].showOnHome);
  t.false(result[3].showOnHome);
});

test('categoryTree should set showOnHome only to level 1 of elements', async (t) => {
  const data: Category[] = [
    {
      id: 1,
      Title: '1',
      children: [
        {
          id: 11,
          Title: '11#',
          children: [],
          MetaTagDescription: '',
          name: 'Test 11',
          hasChildren: false,
          url: '',
        },
      ],
      MetaTagDescription: '',
      name: 'Test 1',
      hasChildren: false,
      url: '',
    },
    {
      id: 2,
      Title: '2',
      children: [],
      MetaTagDescription: '',
      name: 'Test 2',
      hasChildren: false,
      url: '',
    },
    {
      id: 3,
      Title: '3',
      children: [],
      MetaTagDescription: '',
      name: 'Test 3',
      hasChildren: false,
      url: '',
    },
    {
      id: 4,
      Title: '4',
      children: [],
      MetaTagDescription: '',
      name: 'Test 4',
      hasChildren: false,
      url: '',
    },
    {
      id: 5,
      Title: '5',
      children: [],
      MetaTagDescription: '',
      name: 'Test 5',
      hasChildren: false,
      url: '',
    },
    {
      id: 6,
      Title: '6',
      children: [],
      MetaTagDescription: '',
      name: 'Test 6',
      hasChildren: false,
      url: '',
    },
  ];
  const result = await categoryTree(data);
  t.true(result.map((a) => a.showOnHome).includes(false));
  t.false(
    result
      .filter((_, index) => index < 3)
      .map((a) => a.showOnHome)
      .includes(false)
  );
  t.true(
    result
      .filter((_, index) => index >= 3)
      .map((a) => a.showOnHome)
      .includes(false)
  );
  t.true(result[0].showOnHome);
  t.true(result[1].showOnHome);
  t.true(result[2].showOnHome);
  t.false(result[3].showOnHome);
});
