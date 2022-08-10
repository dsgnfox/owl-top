import {H, P} from '../components';
import {withLayout} from '../layout/Layout';
import Link from "next/link";

export function Error404(): JSX.Element {
    return (
        <>
            <H tag='h1'>Ошибка 404</H>
            <P size='m'>Страницы не существует ;(</P>
            <Link href='/'>
                <a aria-label='Вернуться на главную страницу'>Вернуться на главную страницу</a>
            </Link>
        </>
    );
}

export default withLayout(Error404);