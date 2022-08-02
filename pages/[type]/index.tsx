import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from 'next';
import { withLayout } from '../../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interface';
import { firstLevelMenu } from '../../helpers/helpers';
import { ParsedUrlQuery } from 'node:querystring';

function Type({ firstCategory }: TypeProps): JSX.Element {

  return (
    <div>
      Type: {firstCategory}
    </div>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true
  };
};

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true
    };
  }

  const firstCategory = firstLevelMenu.find(item => item.route === params.type);

  if (!firstCategory) {
    return {
      notFound: true
    };
  }

  try {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstCategory.id
    });

    if (menu.length === 0) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        menu,
        firstCategory: firstCategory.id
      }
    };
  } catch {
    return {
      notFound: true
    };
  }
};

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[],
  firstCategory: number
}