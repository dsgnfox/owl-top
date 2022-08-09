import cn from 'classnames';
import styles from './Menu.module.css';
import {useContext, KeyboardEvent, useState} from 'react';
import {AppContext} from '../../context/app.context';
import {FirstLevelMenuItem, PageItem} from '../../interfaces/menu.interface';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {firstLevelMenu} from '../../helpers/helpers';
import {motion, useReducedMotion} from 'framer-motion';

export const Menu = (): JSX.Element => {
    const {menu, firstCategory, setMenu} = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
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
            opacity: shouldReduceMotion ? 1 : 0,
            height: 0
        }
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map((i) => {
            if (i._id.secondCategory === secondCategory) {
                setAnnounce(i.isOpened ? 'closed' : 'opened');
                i.isOpened = !i.isOpened;
            }
            return i;
        }));
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const buildFirstLevel = (): JSX.Element => {
        return (
            <ul className={styles.firstLevelList}>
                {firstLevelMenu.map((firstLevelItem) => (
                    <li key={firstLevelItem.route}>
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
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (firstLevelItem: FirstLevelMenuItem): JSX.Element => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map((secondLevelItem) => {
                    if (secondLevelItem.pages.map((i) => i.alias).includes(router.asPath.split('/')[2])) {
                        secondLevelItem.isOpened = true;
                    }
                    return (
                        <li key={secondLevelItem._id.secondCategory}>
                            <button className={styles.secondLevel}
                                    onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, secondLevelItem._id.secondCategory)}
                                    onClick={() => openSecondLevel(secondLevelItem._id.secondCategory)}
                                    aria-expanded={secondLevelItem.isOpened}>
                                {secondLevelItem._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={secondLevelItem.isOpened ? 'visible' : 'hidden'}
                                animate={secondLevelItem.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(secondLevelItem.pages, firstLevelItem.route, secondLevelItem.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean): JSX.Element => {
        const {type, alias} = router.query;
        return (
            <>
                {pages.map((thirdLevel) => (
                    <motion.li key={thirdLevel._id} variants={variantsChildren}>
                        <Link href={`/${route}/${thirdLevel.alias}`}>
                            <a aria-current={route === type && thirdLevel.alias === alias ? 'page' : false}
                                tabIndex={isOpened ? 0 : -1} className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: route === type && thirdLevel.alias === alias
                            })}>
                                {thirdLevel.category}
                            </a>
                        </Link>
                    </motion.li>
                ))}
            </>
        );
    };

    return (
        <nav className={cn(styles.menu)} role="navigation">
            {announce && <span role='log' className='visuallyHidden'>{announce === 'opened' ? 'Развернуто' : 'Свернуто'}</span>}
            {buildFirstLevel()}
        </nav>
    );
};