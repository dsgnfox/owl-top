import {TopPageComponentProps} from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import {Advantages, Divider, H, HhData, Product, Sort, Tag} from '../../components';
import {SortEnum} from '../../components/Sort/Sort.props';
import {useEffect, useReducer} from 'react';
import {sortReducer} from './sort.reducer';
import {useReducedMotion} from 'framer-motion';
import {ProductModel} from '../../interfaces/product.interface';

export const TopPageComponent = ({page, products}: TopPageComponentProps): JSX.Element => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    dispatchSort({
      type: 'reset',
      initialState: products,
    });
  }, [products]);

  const setSort = (sort: SortEnum) => {
    dispatchSort({type: sort});
  };

  const renderProducts = (products: ProductModel[]): JSX.Element => {
    if (!products.length) {
      return (
        <>
          <H tag="h2">Курсы не найдены 🧐</H>
          <Divider />
        </>
      );
    }

    return (
      <div role="list">
        {products.map(product => (
          <Product
            layout={!shouldReduceMotion}
            key={product._id}
            product={product}
            role="listitem"
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <H className={styles.title} tag="h1">
          {page.title}
        </H>
        {products.length ? <Sort className={styles.sort} sort={sort} setSort={setSort} /> : <></>}
      </div>
      {renderProducts(sortedProducts)}
      <div className={styles.hhTitle}>
        <H tag="h2">Вакансии - {page.category}</H>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <H tag="h2">Преимущества</H>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />
      )}
      {page.tags && (
        <>
          <H tag="h2">Получаемые навыки</H>
          {page.tags.map(tag => (
            <Tag key={tag} color="primary">
              {tag}
            </Tag>
          ))}
        </>
      )}
    </div>
  );
};
