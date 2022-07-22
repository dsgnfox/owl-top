import cn from 'classnames';
import { FooterProps } from './Footer.props';
import styles from './Header.module.css';

export const Footer = ({ ...props }: FooterProps): JSX.Element => {
  return (
    <footer {...props}>
      Footer
    </footer>
  );
};