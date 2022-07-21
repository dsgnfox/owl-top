import cn from 'classnames';
import { IRating } from './Rating.props';
import styles from './Rating.module.css';
import StarIcon from './star.svg';
import { Fragment, useEffect, useState, KeyboardEvent } from 'react';

export const Rating = ({ isEditable, rating, setRating, ...props }: IRating): JSX.Element => {
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
    <div {...props} className={styles.rating}>
      {ratingArray.map((r, i) => <Fragment key={i}>{r}</Fragment>)}
    </div>
  );
};