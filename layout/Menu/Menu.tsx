import cn from 'classnames';
import styles from './Menu.module.css';
import {useContext} from 'react';
import {AppContext} from '../../context/app.context';
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firstLevelMenu} from '../../helpers/helpers';
import {motion} from 'framer-motion';

export const Menu = (): JSX.Element => {
    const {menu, firstCategory, setMenu} = useContext(AppContext);
    const router = useRouter();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
           opacity: 1,
            height: 29
        },
        hidden: {
            opacity: 0,
            height: 0
        }
    };

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
                            <div className={styles.secondLevel}
                                 onClick={() => openSecondLevel(secondLevelItem._id.secondCategory)}>{secondLevelItem._id.secondCategory}</div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={secondLevelItem.isOpened ? 'visible' : 'hidden'}
                                animate={secondLevelItem.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(secondLevelItem.pages, firstLevelItem.route)}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string): JSX.Element => {
        return (
            <>
                {pages.map((thirdLevel) => (
                    <motion.div key={thirdLevel._id} variants={variantsChildren}>
                        <Link href={`/${route}/${thirdLevel.alias}`}>
                            <a className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${thirdLevel.alias}` === router.asPath
                            })}>
                                {thirdLevel.category}
                            </a>
                        </Link>
                    </motion.div>
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