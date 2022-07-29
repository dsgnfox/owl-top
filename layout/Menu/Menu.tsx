import cn from 'classnames';
import styles from './Menu.module.css';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import CoursesIcon from './icons/courses.svg';
import ServicesIcon from './icons/services.svg';
import BooksIcon from './icons/books.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';
import Link from 'next/link';
import { useRouter } from 'next/router';

const firstLevelMenu: FirstLevelMenuItem[] = [
  { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses, },
  { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services, },
  { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books, },
  { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopLevelCategory.Products, },
];

export const Menu = (): JSX.Element => {
  const { menu, firstCategory, setMenu } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map((i) => {
      if (i._id.secondCategory === secondCategory) {
        i.isOpened = !i.isOpened;
      }
      return i;
    }));
  };

  const buildFirstLevel = (): JSX.Element => {
    return (
      <>
        {firstLevelMenu.map((firstLevelItem) => (
          <div key={firstLevelItem.route}>
            <Link href={`/${firstLevelItem.route}`}>
              <a>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: firstLevelItem.id === firstCategory
                })}>
                  {firstLevelItem.icon}
                  <span>{firstLevelItem.name}</span>
                </div>
              </a>
            </Link>
            {firstLevelItem.id === firstCategory && buildSecondLevel(firstLevelItem)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (firstLevelItem: FirstLevelMenuItem): JSX.Element => {
    return (
      <div className={cn(styles.secondBlock)}>
        {menu.map((secondLevelItem) => {
          if (secondLevelItem.pages.map((i) => i.alias).includes(router.asPath.split('/')[2])) {
            secondLevelItem.isOpened = true;
          }
          return (
            <div key={secondLevelItem._id.secondCategory}>
              <div className={styles.secondLevel} onClick={() => openSecondLevel(secondLevelItem._id.secondCategory)}>{secondLevelItem._id.secondCategory}</div>
              <div className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpened]: secondLevelItem.isOpened
              })}>
                {buildThirdLevel(secondLevelItem.pages, firstLevelItem.route)}
              </div>
            </div>
          )
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element => {
    return (
      <>
        {pages.map((thirdLevel) => (
          <Link key={thirdLevel._id} href={`/${route}/${thirdLevel.alias}`}>
            <a className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${thirdLevel.alias}` === router.asPath
            })}>
              {thirdLevel.category}
            </a>
          </Link>
        ))}
      </>
    );
  };

  return (
    <div className={cn(styles.menu)}>
      {buildFirstLevel()}
    </div>
  );
};