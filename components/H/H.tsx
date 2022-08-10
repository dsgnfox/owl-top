import { HProps } from './H.props';
import styles from './H.module.css';

export const H = ({ tag, children, ...props }: HProps): JSX.Element => {
  switch (tag) {
    case 'h1':
      return <h1 className={styles.h1} {...props}>{children}</h1>;
    case 'h2':
      return <h2 className={styles.h2} {...props}>{children}</h2>;
    case 'h3':
      return <h3 className={styles.h3} {...props}>{children}</h3>;
    default:
      return <></>;
  }
};