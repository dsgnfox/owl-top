import cn from 'classnames';
import styles from './Menu.module.css';
import {useContext, KeyboardEvent, useState} from 'react';
import {AppContext} from '../../context/app.context';
import {PageItem} from '../../interfaces/menu.interface';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {motion, useReducedMotion} from 'framer-motion';

export const Menu = (): JSX.Element => {
    const {menu, setMenu} = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>(undefined);
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        visible: {
            height: 'auto',
            marginBottom: '20px',
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.05
            }
        },
        hidden: {
            height: 0,
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
            opacity: 1,
            x: 0
        },
        hidden: {
            opacity: shouldReduceMotion ? 1 : 0 ,
            x: '100%'
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

    const buildSecondLevel = (): JSX.Element => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map((secondLevelItem) => {
                    if (secondLevelItem.pages.map((i) => i.alias).includes(router.asPath.split('/')[1])) {
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
                                {buildThirdLevel(secondLevelItem.pages, secondLevelItem.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], isOpened: boolean): JSX.Element => {
        const {alias} = router.query;
        return (
            <>
                {pages.map((thirdLevel) => (
                    <motion.li key={thirdLevel._id} variants={variantsChildren}>
                        <Link href={`/${thirdLevel.alias}`}>
                            <a aria-current={thirdLevel.alias === alias ? 'page' : false}
                                tabIndex={isOpened ? 0 : -1} className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: thirdLevel.alias === alias
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
            {buildSecondLevel()}
        </nav>
    );
};