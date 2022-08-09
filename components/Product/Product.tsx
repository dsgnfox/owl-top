import cn from 'classnames';
import {ProductProps} from './Product.props';
import styles from './Product.module.css';
import {Card} from "../Card/Card";
import {Rating} from "../Rating/Rating";
import {Tag} from "../Tag/Tag";
import {Button} from "../Button/Button";
import {declOfNum, priceRu} from "../../helpers/helpers";
import {Divider} from "../Divider/Divider";
import Image from 'next/image';
import {ForwardedRef, forwardRef, Fragment, useRef, useState} from "react";
import {Review} from "../Review/Review";
import {ReviewForm} from "../ReviewForm/ReviewForm";
import {motion} from 'framer-motion';

export const Product = motion(forwardRef(({product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsPreviewOpened] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);

    const variants = {
        visible: {
            opacity: 1,
            height: 'auto',
            overflow: 'visible'
        },
        hidden: {
            opacity: 0,
            height: 0,
            overflow: 'hidden'
        }
    };

    const scrollToReview = () => {
        setIsPreviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    };

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}/>
                </div>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.price}>
                    <span className="visuallyHidden">Цена</span>
                    {priceRu(product.price)}
                    {product.oldPrice
                        && <Tag className={styles.oldPrice} color='green'>
                            <span className="visuallyHidden">Скидка</span>
                            {priceRu(product.price - product.oldPrice)}
                    </Tag>}
                </div>
                <div className={styles.credit}>
                    <span className="visuallyHidden">Кредит</span>
                    {priceRu(product.credit)} / <span className={styles.month}>мес</span>
                </div>
                <div className={styles.rating}>
                    <span className="visuallyHidden">{`Рейтинг ` + (product.reviewAvg ?? product.initialRating)}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating}/>
                </div>
                <div className={styles.tags}>
                    {product.categories.map((c) => <Tag key={c} color='ghost' className={styles.category}>{c}</Tag>)}
                </div>
                <div className={styles.priceTitle} aria-hidden={true}>цена</div>
                <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
                <div className={styles.ratingTitle}>
                    <a href="#ref" onClick={scrollToReview}>{product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a>
                </div>
                <Divider className={styles.hr}/>
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map((c) => (
                        <div key={c.name} className={styles.characteristics}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.advTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)}/>
                <div className={styles.actions}>
                    <Button apperance='primary'>Узнать подробнее</Button>
                    <Button
                        apperance='ghost'
                        arrow={isReviewOpened ? 'down' : 'right'}
                        className={styles.reviewButton}
                        onClick={() => setIsPreviewOpened(!isReviewOpened)}
                        aria-expanded={isReviewOpened}
                    >Читать отзывы</Button>
                </div>
            </Card>
            <motion.div
                variants={variants}
                initial={isReviewOpened ? 'visible' : 'hidden'}
                animate={isReviewOpened ? 'visible' : 'hidden'}
            >
                <Card color='blue' ref={reviewRef} className={cn(styles.reviews, {
                    [styles.opened]: isReviewOpened,
                    [styles.closed]: !isReviewOpened
                })}
                    tabIndex={isReviewOpened ? 0 : -1}>
                    {product.reviews.map((review) => (
                        <Fragment key={review._id}>
                            <Review review={review}/>
                            <Divider/>
                        </Fragment>
                    ))}
                    <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
                </Card>
            </motion.div>
        </div>
    );
}));