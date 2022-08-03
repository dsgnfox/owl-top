import cn from 'classnames';
import { RatingProps } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import {Fragment, useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef} from 'react';

export const Rating = forwardRef(({ isEditable, rating, setRating, error, ...props }: RatingProps, ref:ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r, i) => {
      return (
        <span key={i} className={cn(styles.rating__item)}
          onMouseEnter={() => isEditable && constructRating(i + 1)}
          onMouseLeave={() => isEditable && constructRating(rating)}>
          <StarIcon className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
            onClick={() => updateRating(i + 1)}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && handleKeyDown(e, i + 1)}
            tabIndex={isEditable ? 0 : -1}
          />
        </span>
      );
    });

    setRatingArray(updatedArray);
  };

  const handleKeyDown = (e: KeyboardEvent<SVGAElement>, i: number) => {
    if (!['Enter', ' '].includes(e.key)) {
      return;
    }
    updateRating(i);
  };

  const updateRating = (i: number) => {
    if (!isEditable || !setRating) {
      return;
    }
    setRating(i);
  };

  return (
    <div {...props} className={styles.ratingWrapper}>
      <div className={cn(styles.rating, {
        [styles.error]: error
      })}>
        {ratingArray.map((r, i) => <Fragment key={i}>{r}</Fragment>)}
      </div>
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
});