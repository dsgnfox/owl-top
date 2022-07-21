import cn from 'classnames';
import { ITag } from './Tag.props';
import styles from './Tag.module.css';

export const Tag = ({ size = 'm', children, color = 'ghost', href, target, className, ...props }: ITag): JSX.Element => {
  return (
    <div className={cn(styles.tag, className, {
      [styles.s]: size === 's',
      [styles.m]: size === 'm',
      [styles.ghost]: color === 'ghost',
      [styles.red]: color === 'red',
      [styles.gray]: color === 'gray',
      [styles.green]: color === 'green',
      [styles.primary]: color === 'primary',
    })}
      {...props}
    > {
        href
          ? target ? <a href={href} target={target}>{children}</a> : <a href={href}>{children}</a>
          : <>{children}</>
      }
    </div>
  );
};