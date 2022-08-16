import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next';
import {withLayout} from '../../layout/Layout';
import axios from 'axios';
import {MenuItem} from '../../interfaces/menu.interface';
import {TopPageModel} from '../../interfaces/page.interface';
import {ParsedUrlQuery} from 'querystring';
import {ProductModel} from '../../interfaces/product.interface';
import {TopPageComponent} from '../../page_components';
import {API} from '../../helpers/api';
import Head from 'next/head';
import {Error404} from '../404';

function TopPage({page, products}: TopPageProps): JSX.Element {
  if (!page || !products) {
    return <Error404 />;
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.metaDescription} />
        <meta property="og:title" content={page.metaTitle} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="article" />
      </Head>
      <TopPageComponent page={page} products={products} />
    </>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: 0,
  });
  paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${p.alias}`)));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  try {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: 0,
    });

    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const {data: page} = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias);

    const {data: products} = await axios.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10,
    });

    return {
      props: {
        menu,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: TopPageModel;
  products: ProductModel[];
}
