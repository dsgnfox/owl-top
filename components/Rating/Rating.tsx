import cn from 'classnames';
import {RatingProps} from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import {Fragment, useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef, useRef} from 'react';

const Rating = forwardRef(({
                               isEditable,
                               rating,
                               setRating,
                               error,
                               tabIndex,
                               ...props
                           }: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (rating: number, index: number): number => {
        if (!isEditable) {
            return -1;
        }
        if (!rating && index === 0) {
            return tabIndex ?? 0;
        }
        if (rating === index + 1) {
            return tabIndex ?? 0;
        }
        return -1;
    };

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r, i) => {
            return (
                <span key={i} className={cn(styles.rating__item)}
                      onMouseEnter={() => isEditable && constructRating(i + 1)}
                      onMouseLeave={() => isEditable && constructRating(rating)}
                      onClick={() => updateRating(i + 1)}
                      onKeyDown={handleKey}
                      tabIndex={computeFocus(rating, i)}
                      ref={r => ratingArrayRef.current?.push(r)}
                      role={isEditable ? 'slider' : ''}
                      aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг ' + rating)}
                      aria-valuenow={rating}
                      aria-valuemax={5}
                      aria-valuemin={1}
                      aria-invalid={!!error}>
                    <StarIcon className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}/>
                </span>
            );
        });

        setRatingArray(updatedArray);
    };

    const handleKey = (e: KeyboardEvent) => {
        if (!isEditable || !setRating) {
            return;
        }
        if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
            if (!rating) {
                setRating(1);
            } else {
                e.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        }
        if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
            e.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
            ratingArrayRef.current[rating - 2]?.focus();
        }
    };

    const updateRating = (i: number) => {
        if (!isEditable || !setRating) {
            return;
        }
        setRating(i);
    };

    return (
        <div {...props} ref={ref} className={styles.ratingWrapper}>
            <div className={cn(styles.rating, {
                [styles.error]: error
            })}>
                {ratingArray.map((r, i) => <Fragment key={i}>{r}</Fragment>)}
            </div>
            {error && <span role='alert' className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});

Rating.displayName = 'Rating';

export {Rating};